from google import genai
from flask import  request, jsonify
import os
from dotenv import load_dotenv
import re
from backend.controller import auth

load_dotenv()  # Load variables from .env into environment
api_key = os.getenv("apiKey")
client = genai.Client(api_key=api_key)

def getCoverLetterFeedback():
    user = auth.verify_supabase_token()
    if not user:
        return jsonify({"error" : "Unauthorized"}), 401
    

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
    

def generateCoverLetter():
    user = auth.verify_supabase_token()
    if not user:
        return jsonify({"error" : "Unauthorized"}), 401
    
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