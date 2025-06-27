from bs4 import BeautifulSoup
import fitz
import textract
from werkzeug.utils import secure_filename
import tempfile
from google import genai
import logging
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import os
from dotenv import load_dotenv
import pytesseract
from PIL import Image
import requests
import traceback
import re
import pytesseract
load_dotenv()  # Load variables from .env into environment
api_key = os.getenv("apiKey")
client = genai.Client(api_key=api_key)

frontend_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'frontend', 'dist')

app = Flask(__name__, static_folder=frontend_folder, static_url_path='')

CORS(app)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/<path:path>')
def static_proxy(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    

@app.route('/debug/check-index')
def check_index():
    index_path = os.path.join(app.static_folder, 'index.html')
    if os.path.exists(index_path):
        return f"index.html FOUND at {index_path}"
    else:
        return f"index.html NOT FOUND at {index_path}", 404

@app.route('/api/extract', methods=['POST'])
def extract_text():
    if 'file' not in request.files:
        return jsonify({"error": "Please include your document"}), 400

    try:
        file = request.files['file']
        filename = secure_filename(file.filename)

        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(filename)[1]) as tmp:
            file.save(tmp.name)
            tmp_path = tmp.name
        try:
            # Try textract first
            text = textract.process(tmp_path).decode('utf-8')
            if not text.strip():
                raise ValueError("Empty text from textract.")
        except Exception:
            # Fallback to PyMuPDF
            text = ""
            with fitz.open(tmp_path) as doc:
                for page in doc:
                    text += page.get_text()
            if not text.strip():
                # Fallback to OCR
                for page_num in range(len(doc)):
                    pix = doc[page_num].get_pixmap()
                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                    text += pytesseract.image_to_string(img)

        os.remove(tmp_path)
        logging.info(f"[extract_text] Request from {request.remote_addr} | {request.user_agent}")
        return jsonify({"text": text}), 200

    except Exception as e:
        logging.error(f"Exception: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": f"Error extracting resume: {str(e)}"}), 500

    
@app.route('/api/resfeedback', methods=['POST'])
def getResumeFeedback():
    print(f"[getResumeFeedback] Accessed via {request.user_agent.platform} on {request.user_agent.browser}")
    resume = request.form.get('resume')
    targetrole = request.form.get('targetrole')
    
    if not resume or not targetrole:
            return jsonify({"error": "Missing resume or target role."}), 400


    try:
        prompt = f"""Youre a resume coach. Analyze my resume below for applying to a {targetrole} job.
        Resume:
        {resume}

        Provide:
        1. A professional summary.
        2. Key strengths.
        3. Weak areas or missing keywords for the role.
        4. Highlights weak areas with suggestions to improve.
        5. Give an overall  resume score from 1 to 10 explaining your reasoning behind the score.
        """
        response = client.models.generate_content(model = "gemini-2.0-flash", contents=prompt)
        cleanedText = clean_feedback_text(response.text)
        return jsonify({"feedback": cleanedText}), 200
    
    except Exception as e:
        logging.error(f"Exception: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": f"Error getting feedback: {str(e)}"}), 500
    
    
    


@app.route('/api/clfeedback', methods=['POST'])
def getCoverLetterFeedback():
    print(f"[getCoverLetterFeedback] Accessed via {request.user_agent.platform} on {request.user_agent.browser}")
    letter = request.form.get('letter')
    role = request.form.get('role')

    if not letter or not role:
        return jsonify({"error": "Missing cover letter or target role."}), 400
    
    try:
        prompt = f'''You are an experienced recruiter and career coach. 
        Analyze the following cover letter in the context of the specified job title and provide actionable feedback. 
        Focus on the following areas:
        1. How well does the cover letter align with the role of {role}?
        2. Does the applicant demonstrate relevant skills, experiences, and enthusiasm for the position and company?
        3. Is the tone appropriate for a professional cover letter—engaging, confident, and tailored?
        4. Are there any grammar, spelling, or formatting issues?
        5. Suggest concrete ways to improve clarity, structure, and impact.
        6. Provide smart word choice alternatives for stronger impact
        7. Finally, give an overall rating from 1 to 10 and explain your score.

        Job Title: {role}
        Cover Letter:

        {letter}'''
        
        response = client.models.generate_content(model = "gemini-2.0-flash", contents=prompt)
        cleanedText = clean_feedback_text(response.text) 
        return jsonify({"feedback": cleanedText}), 200
    except Exception as e:
        return jsonify({"error": f"Error getting feedback: {str(e)}"}), 500
    

@app.route('/api/generateCL', methods=['POST'])
def generateCoverLetter():
    resume = request.form.get('resume')
    job = request.form.get('job')
    company = request.form.get('company')
    role = request.form.get('role')
    name = request.form.get('username')

    if not resume or not role:
        return jsonify({"error": "Missing resume or role"}), 400
    
    if not company or not job:
        return jsonify({"error": "Missing company name or job description"}), 400
    
    try:
        prompt = f'''You are an expert career coach and professional cover letter writer.

        Given the following:
        - Resume text: {resume}
        - Job Description: {job}
        - Candidate Name: {name}
        - Company: {company}
        - Position Title: {role}

        Write a concise and compelling cover letter tailored to this role. Follow these rules:
        1. Address it to the hiring manager or leave it general if not known.
        2. Highlight the candidate’s most relevant skills and experience.
        3. Be professional and enthusiastic.
        4. Keep it under 400 words.
        5. End with a clear closing and call to action.

        Return only the completed cover letter text, no headers or notes.
        '''
        response = client.models.generate_content(model = "gemini-2.0-flash", contents=prompt)

        cleanedText = clean_feedback_text(response.text)

        return jsonify({"coverLetter": cleanedText}), 200
    except Exception as e:
        return jsonify({"error": f"Error getting feedback: {str(e)}"}), 500


def clean_feedback_text(raw_text):
    # Remove markdown bold **text**
    cleaned = re.sub(r'\*\*(.*?)\*\*', r'\1', raw_text)

    # Remove single asterisk bullets * text
    cleaned = re.sub(r'^\s*[\*•\-]\s+', '', cleaned, flags=re.MULTILINE)

    # Replace multiple newlines with 2 newlines max
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)

    # Strip excessive spaces
    return cleaned.strip()





if __name__ == "__main__":
    app.run(debug=True)
    


