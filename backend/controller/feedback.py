from flask import request, jsonify
from backend.models.feedback import Feedback
from backend.extensions import db
from backend.controller.auth import verify_supabase_token
# Save feedback

import os
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import cast


load_dotenv()


url : str = cast(str, os.getenv("PROJECT_URL"))
key: str = cast(str,os.getenv("SUPABASE_API_KEY"))

supabase: Client = create_client(url, key)
def save_feedback():
    user = verify_supabase_token()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    try:
        data = request.get_json()
        payload = {
        "user_id": user["id"],
        "type": data.get("type"),
        "content": data.get("content"),
        "feedback": data.get("feedback"),
        }
        print(user["id"])  
        response = supabase.table("feedbacks").insert(payload).execute()
        inserted = response.data[0]
        return jsonify({"message": "Feedback saved", "id": inserted["id"]}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get all saved feedback for user
def get_feedback():
    user = verify_supabase_token()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    try:
        response = supabase.table("feedbacks").select("*").eq("user_id", user["id"]).order("created_at", desc=True).execute()
        return jsonify({"feedbacks": response.data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete a specific feedback
def delete_feedback():
    user = verify_supabase_token()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        data = request.get_json()
        feedback_id = data.get("id")
        response = supabase.table("feedbacks").delete().eq("id", feedback_id).execute()
        return jsonify({"message": "Feedback deleted", "response": response.data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

