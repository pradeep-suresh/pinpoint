import os
import sys


from flask import Flask, jsonify
from flask_restx import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app(script_info=None):

    # instantiate the app
    app = Flask(__name__)
    cors = CORS(app, resources = {
        '/shortener/*' : {
            'origins' : 'http://localhost:3007'
        }
    })

    # set config
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)

    print(app.config, file=sys.stderr)
    
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