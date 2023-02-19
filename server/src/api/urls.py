from flask import Blueprint, request
from flask_restx import Resource, Api, fields

from src import db
from src.api.models import Url

urls_blueprint = Blueprint('urls', __name__)
api = Api(urls_blueprint)

url = api.model('Url', {
    'id': fields.Integer(readOnly=True),
    'url' : fields.String(required=True),
    'shortcode': fields.String(readOnly=True),
    'active': fields.Boolean,
    'created_date': fields.DateTime,
})

class UrlsList(Resource):

    @api.expect(url, validate=True)
    def post(self):
        payload = request.get_json()
        url = payload.get('url')
        
        url_exists = Url.query.filter_by(url=url).first()
        if url_exists:
            return 400

        db.session.add(Url(url=url, shortcode='abcde'))
        db.session.commit()

        return 201

    @api.marshal_with(url)
    def get(self):
        return Url.query.all(), 200

api.add_resource(UrlsList, '/shortener')


