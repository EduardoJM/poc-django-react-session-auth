from django.urls import path, reverse
from django.shortcuts import redirect
from drf_spectacular import views

schema_view = views.SpectacularAPIView.as_view()
swagger_view = views.SpectacularSwaggerView.as_view(url_name="schema")
redoc_view = views.SpectacularRedocView.as_view(url_name="schema")

urlpatterns = [
    path("schema/", schema_view, name="schema"),
    path("swagger-ui/", swagger_view, name="swagger-ui"),
    path("redoc/", redoc_view, name="redoc"),
    path('', lambda _: redirect(reverse('swagger-ui'))),
]
