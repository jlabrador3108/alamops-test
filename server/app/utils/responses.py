from flask import jsonify

def response(status_code, message=None, data=None, errors=None):
    payload = {
        'status': 'success' if 200 <= status_code < 300 else 'error',
        'message': message,
        'data': data,
        'errors': errors
    }
    return jsonify(payload), status_code