from app.templates.models.template import Template
from app.utils.responses import response

def create_template(data):
    if not data.get("title") or not data.get("description") or not data.get("created_by"):
        return response(400, message="Title, description and created_by are required")
    
    template = Template(title=data["title"], description=data["description"], created_by=data["created_by"])
    template.save()
    return response(201, data=template.to_dict())