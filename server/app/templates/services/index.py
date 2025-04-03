from app.templates.models.template import Template
from app.utils.responses import response

def get_templates():
    return response(200, data=[template.to_dict() for template in Template.objects.all().order_by('-created_at')])
