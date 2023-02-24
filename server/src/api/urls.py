from flask import Blueprint, jsonify, request
from flask_restx import Api, Resource, fields

from src import db
from src.api.models import Url
from src.utils.encoder import generate_short_code

urls_blueprint = Blueprint("urls", __name__)
api = Api(urls_blueprint)

url = api.model(
    "Url",
    {
        "id": fields.Integer(readOnly=True),
        "url": fields.String(required=True),
        "short_code": fields.String(readOnly=True),
        "active": fields.Boolean,
        "created_at": fields.String(readOnly=True),
    },
)

urls = api.model(
    "Urls",
    {
        "items": fields.List(fields.Nested(url)),
        "page": fields.Integer,
        "pages": fields.Integer,
        "per_page": fields.Integer,
        "total": fields.Integer,
    },
)


class UrlsList(Resource):
    @api.expect(url, validate=True)
    def post(self):
        payload = request.get_json()
        url = payload.get("url")
        response_object = {}

        url_exists = Url.query.filter_by(url=url).first()
        if url_exists:
            response_object["message"] = f"The shortened url for {url} already exisits"
            return response_object, 400

        short_code = generate_short_code(url).decode()
        new_url = Url(url=url, short_code=short_code)
        db.session.add(new_url)
        db.session.flush()

        response_object = {
            "id": new_url.id,
            "url": url,
            "short_code": str(short_code),
            "created_at": str(new_url.created_at),
        }

        db.session.commit()
        return response_object, 201

    @api.marshal_with(urls)
    def get(self):
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 1, type=int)
        response_object = {}

        urls = Url.query.order_by(Url.created_at.desc()).paginate(
            page=page, per_page=per_page
        )

        items = []

        for url in urls.items:
            items.append(
                {
                    "id": url.id,
                    "url": url.url,
                    "active": url.active,
                    "short_code": url.short_code,
                    "created_at": url.created_at.strftime("%b %d, %Y"),
                }
            )

        response_object["items"] = items
        response_object["page"] = urls.page
        response_object["pages"] = urls.pages
        response_object["total"] = urls.total
        response_object["per_page"] = urls.per_page

        return response_object, 200

    def delete(self, id):
        url = Url.query.filter_by(id=id).first()
        db.session.delete(url)
        db.session.commit()


api.add_resource(UrlsList, "/shortener")
api.add_resource(UrlsList, "/shortener/<int:id>")
