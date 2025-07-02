from google import genai
import logging
from flask import request, jsonify
import os
from dotenv import load_dotenv
import traceback
import re
from controller import auth

load_dotenv()  # Load variables from .env into environment
api_key = os.getenv("apiKey")
client = genai.Client(api_key=api_key)

def getResumeFeedback():
    user = auth.verify_supabase_token()
    if not user:
        return jsonify({"error" : "Unauthorized"}), 401
    
    
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
    



def saveResumeFeedback():
     pass


def clean_feedback_text(raw_text):
    # Remove markdown bold **text**
    cleaned = re.sub(r'\*\*(.*?)\*\*', r'\1', raw_text)

    # Remove single asterisk bullets * text
    cleaned = re.sub(r'^\s*[\*•\-]\s+', '', cleaned, flags=re.MULTILINE)

    # Replace multiple newlines with 2 newlines max
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)

    # Strip excessive spaces
    return cleaned.strip()