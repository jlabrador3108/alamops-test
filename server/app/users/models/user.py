from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class User(Document):
    google_id = StringField(required=True)
    name = StringField(required=True)
    email = StringField(required=True, unique=True)   
    picture = StringField(required=True) 
    created_at = DateTimeField(default=datetime.utcnow) 
    
    
    def to_dict(self):
        return {"google_id": self.google_id, "name": self.name, "email": self.email, "picture": self.picture, "created_at": self.created_at.isoformat() if self.created_at else None}