import os

from flask import Flask, jsonify
from flask_restx import Resource, Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

api = Api(app)

app_settings = os.getenv('APP_SETTINGS')
app.config.from_object(app_settings)

db = SQLAlchemy(app)

class Ping(Resource):
    def get(self):
        return {
            'status' : 'success',
            'message': 'pong!'
        }


api.add_resource(Ping, '/ping')