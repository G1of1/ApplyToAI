import fitz
import textract
from werkzeug.utils import secure_filename
import tempfile
from google import genai
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from dotenv import load_dotenv


load_dotenv()  # Load variables from .env into environment
api_key = os.getenv("apiKey")

client = genai.Client(api_key=api_key)

app = Flask(__name__, static_folder="frontend\dist", static_url_path="")
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

@app.route('/extract', methods=['POST'])
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
        return jsonify({"text": text}), 200

    except Exception as e:
        return jsonify({"error": f"Error extracting the document: {str(e)}"}), 500
    
    
@app.route('/resfeedback', methods=['POST'])
def getResumeFeedback():
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
        return jsonify({"feedback": response.text}), 200
    
    except Exception as e:
        return jsonify({"error": f"Error getting feedback: {str(e)}"}), 500


@app.route('/clfeedback', methods=['POST'])
def getCoverLetterFeedback():
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
        return jsonify({"feedback": response.text}), 200
    except Exception as e:
        return jsonify({"error": f"Error getting feedback: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
    

'''if __name__ == "__main__":
    pdf_path = input("Enter path to resume PDF: ")
    text = extractPDF(pdf_path)

    target_role = input("Enter target job role (e.g. 'Data Analyst'): ")
    feedback = getCoverLetterFeedback(text, target_role)

    print("\n===== AI Feedback =====")
    print(feedback)'''


