from django.urls import path, include, reverse
from django.shortcuts import redirect

urlpatterns = [
    path("docs/", include('server.api.docs.urls')),
    path('auth/', include('authentication.urls')),
    path('', lambda _: redirect(reverse('swagger-ui'))),
]
