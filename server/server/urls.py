from django.contrib import admin
from django.urls import path, include, reverse
from django.shortcuts import redirect
from drf_spectacular import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/docs/schema/", views.SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/swagger-ui/",
        views.SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("api/docs/redoc/", views.SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path('api/auth/', include('authentication.urls')),
    path('api/', lambda _: redirect(reverse('swagger-ui'))),
    path('api/docs/', lambda _: redirect(reverse('swagger-ui'))),
    path('', lambda _: redirect(reverse('swagger-ui'))),
]
