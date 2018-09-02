# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

import datetime
from django.test import TestCase

from app.models import File
from unittest import mock
from django.contrib.auth.models import User
import pytz


class TestRegister(TestCase):
    def setUp(self):
        pass

    def test_should_register_new_user(self):
        response = self.client.post(
            '/api/v1/register/',
            json.dumps({'username': 'Terry', 'password': 'password'}),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {'message': 'You have successful registered, please login.'}
        )

    def test_should_fail_when_register_with_empty_username(self):
        response = self.client.post(
            '/api/v1/register/',
            json.dumps({'username': '', 'password': 'password'}),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {'error': 'Please provide username and password'}
        )

    def test_should_fail_when_register_with_empty_password(self):
        response = self.client.post(
            '/api/v1/register/',
            json.dumps({'username': 'Terry', 'password': ''}),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {'error': 'Please provide username and password'}
        )


def mock_now():
    return datetime.datetime(2009, 1, 2, 3, 4, 5, 123456, tzinfo=pytz.UTC)


class TestGetFileList(TestCase):
    def setUp(self):
        pass

    @mock.patch('django.utils.timezone.now', mock_now)
    def test_should_get_file_which_is_not_private(self):
        self.user = User.objects.create_user(username='Terry', password='password')
        File.objects.create(
            name="Python is awesome", unique_name="Python is awesome", owner=self.user, private=False
        )
        response = self.client.get('/api/v1/file/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            [{
                'id': 1,
                'create': '2009-01-02T03:04:05.123Z',
                'name': 'Python is awesome',
                'unique_name': 'Python is awesome',
                'private': False,
                'owner': 'Terry',
            }]
        )

    def test_should_not_get_file_which_is_private(self):
        self.user = User.objects.create_user(username='Terry', password='password')
        File.objects.create(
            name="Python is awesome", unique_name="Python is awesome", owner=self.user, private=True
        )
        response = self.client.get('/api/v1/file/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            []
        )
