from flask import Blueprint, request
from app.users.services.index import get_users
from app.users.services.create import add_google_user

bp = Blueprint("users", __name__, url_prefix="/users")

@bp.route("/google", methods=["POST"])
def google_auth():
    data = request.json
    return add_google_user(data)

@bp.route("", methods=["GET"])
def list_users():
    return get_users()