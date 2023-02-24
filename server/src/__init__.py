import os
import sys

from flask import Flask, jsonify
from flask_cors import CORS
from flask_restx import Api, Resource
from flask_sqlalchemy import SQLAlchemy

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

db = SQLAlchemy()


def create_app(script_info=None):

    # instantiate the app
    app = Flask(__name__)
    cors = CORS(app, resources={"/shortener/*": {"origins": "http://localhost:3005"}})

    # set config
    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    # set up rate limiter
    limiter = Limiter(get_remote_address, app=app, storage_uri="memory://", default_limits=["100 per minute"])
    
    # set up extensions
    db.init_app(app)

    # register blueprints
    from src.api.ping import ping_blueprint

    app.register_blueprint(ping_blueprint)

    from src.api.urls import urls_blueprint

    app.register_blueprint(urls_blueprint)

    from src.api.redirect import redirect_blueprint

    app.register_blueprint(redirect_blueprint)

    return app
