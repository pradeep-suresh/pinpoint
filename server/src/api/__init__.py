# src/api/__init__.py


from flask_restx import Api
from src.api.ping import ping_namespace
from src.api.urls import urls_namespace
from src.api.redirect import redirect_namespace

api = Api(version="1.0", title="URL shortener API", doc="/doc")

api.add_namespace(ping_namespace, path="/ping")
api.add_namespace(urls_namespace, path="/shortener")
api.add_namespace(redirect_namespace, path="/")

