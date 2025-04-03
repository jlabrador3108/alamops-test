from app.users.models.user import User
from app.utils.responses import response

def get_users():
    return response(200, data=[user.to_dict() for user in User.objects])


