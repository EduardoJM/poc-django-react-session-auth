from django.contrib import admin
from django.urls import path, include, reverse
from django.shortcuts import redirect

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include('server.api.urls')),
    path('', lambda _: redirect(reverse('swagger-ui'))),
]
