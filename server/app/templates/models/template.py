from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class Template(Document):
    title = StringField(required=True)
    description = StringField(required=True)
    created_by = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow) 
    
    def to_dict(self):
        return {"id": str(self.id),"title": self.title, "description": self.description, "created_by": self.created_by, "created_at": self.created_at.isoformat() if self.created_at else None}
