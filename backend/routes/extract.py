from flask import Blueprint

from controller import extract

ex_routes = Blueprint('ex_routes', __name__)


ex_routes.route('/api/extract', methods=["POST"])(extract.extract_text)