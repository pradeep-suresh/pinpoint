from flask import Blueprint, redirect, url_for
from flask_restx import Api, Resource, fields, Namespace

from src import db
from src.api.models import Url

redirect_namespace = Namespace("redirect")


class Redirect(Resource):    
    def get(self, code):
        link = Url.query.filter_by(short_code=code).first().__dict__
        if link:
            response = redirect(link["url"], code=301)
            response.headers["location"] = link["url"]
            return response


redirect_namespace.add_resource(Redirect, "<string:code>")
