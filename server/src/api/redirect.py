from flask import Blueprint, redirect, url_for
from flask_restx import Api, Resource, fields

from src import db
from src.api.models import Url

redirect_blueprint = Blueprint("redirect", __name__)
api = Api(redirect_blueprint)


class Redirect(Resource):    
    def get(self, code):
        link = Url.query.filter_by(short_code=code).first().__dict__
        if link:
            response = redirect(link["url"], code=301)
            response.headers["location"] = link["url"]
            return response


api.add_resource(Redirect, "/<string:code>")
