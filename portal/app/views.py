# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django.core.exceptions import ObjectDoesNotExist
from django.core.files.storage import FileSystemStorage
from django.db import IntegrityError
from django.http import HttpResponse, StreamingHttpResponse, JsonResponse
from django.middleware.csrf import get_token
import os
import mimetypes
from wsgiref.util import FileWrapper
from django.contrib.auth import login, logout, authenticate
from app.models import File
from django.db.models import Q
from uploader import settings
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth.models import User


class UploaderEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, File):
            return {
                'id': obj.id,
                'name': obj.name,
                'unique_name': obj.unique_name,
                'private': obj.private,
                'owner': obj.owner.username,
                'create': obj.create,
            }
        return super().default(obj)


def register_view(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body.get('username', '').strip().lower()
        password = body.get('password', '').strip()

        if len(username) == 0 or len(password) == 0:
            return JsonResponse({'error': "Please provide username and password"}, status=400)

        try:
            User.objects.create_user(
                username=username,
                password=password
            )
        except IntegrityError:
            return JsonResponse({'error': "You already have an account, please login instead."}, status=400)

        return JsonResponse({'message': "You have successful registered, please login."})


def login_view(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body.get('username').strip().lower()
        password = body.get('password').strip()

        if len(username) == 0 or len(password) == 0:
            return JsonResponse({'error': "Please provide username and password"}, status=400)

        user = authenticate(username=username, password=password)

        if user is not None and user.is_active:
            login(request, user)
            return JsonResponse({'username': request.user.username})
        else:
            return JsonResponse({'error': "Login failed"}, status=400)


def logout_view(request):
    logout(request)
    return JsonResponse({'username': None})


def current_session_view(request):
    get_token(request)
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username})
    else:
        return JsonResponse({'username': None})


def file_view(request, filename=None):
    if request.method == 'GET':
        if request.user.is_authenticated:
            files = File.objects.filter(
                Q(owner=request.user) | Q(private=False)
            )
        else:
            files = File.objects.filter(private=False)

        if 'search' in request.GET:
            files = files.filter(name__icontains=request.GET['search'])
        if filename:
            try:
                file = files.get(unique_name=filename)
            except ObjectDoesNotExist:
                file = None
            file_full_path = os.path.join(settings.MEDIA_ROOT, filename)
            if file and os.path.isfile(file_full_path):
                response = StreamingHttpResponse((line for line in open(file_full_path, 'rb')))
                response['Content-Disposition'] = "attachment; filename={0}".format(file.name)
                response['Content-Length'] = os.path.getsize(file_full_path)
                return response
            else:
                return JsonResponse({'error': 'The file is not found or is deleted.'})
        else:
            files = files.order_by('-create')
            return JsonResponse(list(files), encoder=UploaderEncoder, safe=False)

    elif request.method == 'POST':
        if 'file' not in request.FILES or 'private' not in request.POST:
            return JsonResponse({'error': "Please provide the file and whether it should be private."}, status=400)

        file = request.FILES['file']
        is_private = json.loads(request.POST['private'])

        fs = FileSystemStorage(location=settings.MEDIA_ROOT)
        filename = fs.save(file.name, file)
        f = File(owner=request.user, name=file.name, private=is_private, unique_name=filename)
        f.save()
        return JsonResponse(f, encoder=UploaderEncoder, safe=False)
