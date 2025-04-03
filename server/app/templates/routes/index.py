from flask import Blueprint, request
from app.templates.services.index import get_templates
from app.templates.services.create import create_template

bp = Blueprint("templates", __name__, url_prefix="/templates")

@bp.route("", methods=["POST"])
def add_template():
    data = request.json
    return create_template(data)

@bp.route("", methods=["GET"])
def list_templates():
    return get_templates()

