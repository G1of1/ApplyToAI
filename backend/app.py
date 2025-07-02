
from google import genai

from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import os
from dotenv import load_dotenv
import pytesseract
from config.config import Config
from controller import resume, coverletter, extract
from flask_sqlalchemy import SQLAlchemy
from routes import coverletter, resume, extract, feedback
from extensions import db 



load_dotenv()  # Load variables from .env into environment
api_key = os.getenv("apiKey")
client = genai.Client(api_key=api_key)

frontend_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'frontend', 'dist')

app = Flask(__name__, static_folder=frontend_folder, static_url_path='')
CORS(app)

app.config.from_object(Config)
database_url = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

db.init_app(app)

# Now register blueprints
app.register_blueprint(coverletter.cl_routes)
app.register_blueprint(extract.ex_routes)
app.register_blueprint(resume.res_routes)
app.register_blueprint(feedback.fb_routes)



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    print(f"[Flask] Catch-all route hit: /{path}")
    full_path = os.path.join(app.static_folder, path)  # type: ignore
    
    # Serve the file if it exists (e.g., JS, CSS, assets)
    if path != "" and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path) # type: ignore
    
    # Otherwise, serve React's index.html
    return send_from_directory(app.static_folder, 'index.html')# type: ignore


@app.route('/debug/check-index')
def check_index():

    index_path = os.path.join(app.static_folder, 'index.html') # type: ignore
    if os.path.exists(index_path):
        return f"index.html FOUND at {index_path}"
    else:
        return f"index.html NOT FOUND at {index_path}", 404

@app.errorhandler(404)
def handleError(e):
    return send_from_directory(app.static_folder, 'index.html')# type: ignore


if __name__ == "__main__":
    app.run(debug=True)
    


