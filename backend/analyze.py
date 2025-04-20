import fitz
from google import genai
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
from dotenv import load_dotenv


load_dotenv()  # Load variables from .env into environment
api_key = os.getenv("apiKey")

client = genai.Client(api_key=api_key)

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/extract', methods=['POST'])
def extractPDF():
    if 'file' not in request.files:
       return jsonify({"error": "Please include your resume"}), 400
    try:
        file = request.files['file']
        document = fitz.open(stream=file.read(), filetype="pdf")
        text = ""
        for page in document:
            text += page.get_text()
        return jsonify({"text": text}), 200
    
    except Exception as e:
        return jsonify({"error": f'Error extracting the resume: {str(e)}'}), 500


@app.route('/feedback', methods=['POST'])
def getFeedback():
    resume = request.form.get('resume')
    targetrole = request.form.get('targetrole')
    
    if not resume or not targetrole:
            return jsonify({"error": "Missing resume or target role"}), 400


    try:
        prompt = f"""Youre a resume coach. Analyze the resume below for someone applying to a {targetrole} job.
        Resume:
        {resume}

        Provide:
        1. A professional summary.
        2. Key strengths.
        3. Weak areas or missing keywords for the role.
        4. Suggestions for improvement.
        """
        response = client.models.generate_content(model = "gemini-2.0-flash", contents=prompt)
        return jsonify({"feedback": response.text}), 200
    
    except Exception as e:
        return jsonify({"error": f"Error getting feedback: {str(e)}"}), 500



if __name__ == "__main__":
    app.run(debug=True)
'''if __name__ == "__main__":
    pdf_path = input("Enter path to resume PDF: ")
    resume_text = extractPDF(pdf_path)

    target_role = input("Enter target job role (e.g. 'Data Analyst'): ")
    feedback = getFeedback(resume_text, target_role)

    print("\n===== AI Feedback =====")
    print(feedback)'''