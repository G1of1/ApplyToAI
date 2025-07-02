from flask import Blueprint

from controller import coverletter

cl_routes = Blueprint('cl_routes', __name__)


cl_routes.route('/api/clfeedback', methods=["POST"])(coverletter.getCoverLetterFeedback)
cl_routes.route('/api/generateCL', methods=["POST"])(coverletter.generateCoverLetter)