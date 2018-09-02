# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import models


class File(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=1024)
    unique_name = models.CharField(max_length=1024)
    private = models.BooleanField(null=False, default=True)
    create = models.DateTimeField(auto_now_add=True)
