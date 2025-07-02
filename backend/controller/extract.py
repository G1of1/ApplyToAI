import fitz
import textract
from werkzeug.utils import secure_filename
import tempfile
import logging
from flask import request, jsonify
import os
import pytesseract
from PIL import Image
import traceback
import pytesseract
from backend.controller import auth


def extract_text():
    user = auth.verify_supabase_token()
    if not user:
        return jsonify({"error" : "Unauthorized"}), 401
    
    if 'file' not in request.files:
        return jsonify({"error": "Please include your document"}), 400

    try:
        file = request.files['file']
        filename = secure_filename(file.filename) # type: ignore

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
                    text += page.get_text() # type: ignore
            if not text.strip():
                # Fallback to OCR
                for page_num in range(len(doc)):
                    pix = doc[page_num].get_pixmap() # type: ignore
                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples) # type: ignore
                    text += pytesseract.image_to_string(img)

        os.remove(tmp_path)
        logging.info(f"[extract_text] Request from {request.remote_addr} | {request.user_agent}")
        return jsonify({"text": text}), 200

    except Exception as e:
        logging.error(f"Exception: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": f"Error extracting resume: {str(e)}"}), 500