from flask import Blueprint

from backend.controller import resume

res_routes = Blueprint('res_routes', __name__)


res_routes.route('/api/resfeedback', methods=["POST"])(resume.getResumeFeedback)