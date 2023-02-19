from sqlalchemy.sql import func

from src import db


class Url(db.Model):

    __tablename__ = 'urls'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url = db.Column(db.String(256), nullable=False)
    shortcode = db.Column(db.String(128), nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)
    created_date = db.Column(db.DateTime, default=func.now(), nullable=False)

    def __init__(self, url, shortcode):
        self.url = url
        self.shortcode = shortcode