from flask import Blueprint
from backend.controller import feedback

fb_routes = Blueprint('fb_routes', __name__)

fb_routes.route('/api/feedback', methods=['POST'])(feedback.save_feedback)
fb_routes.route('/api/feedback', methods=['GET'])(feedback.get_feedback)
fb_routes.route('/api/feedback', methods=['DELETE'])(feedback.delete_feedback)
