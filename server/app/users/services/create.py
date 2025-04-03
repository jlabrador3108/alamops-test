from app.users.models.user import User
from app.utils.responses import response

def add_google_user(data):
    if not data.get("name") or not data.get("email") or not data.get("picture") or not data.get("google_id"):
        return response(400, message="Name, email, picture and google_id are required")
    
    existing_user = User.objects(email=data["email"]).first()
    if existing_user:
        return response(200, data=existing_user.to_dict())
    
    user = User(name=data["name"], email=data["email"], picture=data["picture"], google_id=data["google_id"])
    user.save()
    return response(201, data=user.to_dict())