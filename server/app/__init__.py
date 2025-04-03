import os
from flask import Flask
from dotenv import load_dotenv
from mongoengine import connect
from app.users.routes.index import bp as user_bp
from app.templates.routes.index import bp as template_bp

load_dotenv()

def create_app():
    app = Flask(__name__)

    connect(
    db='test',
    host='mongodb://test_user:test_pass@localhost:27017/test?authSource=admin'
)
    
    # Register Blueprints
    app.register_blueprint(user_bp)
    app.register_blueprint(template_bp)
    
    return app
