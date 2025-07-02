from flask import request, jsonify
from backend.models.feedback import Feedback
from backend.extensions import db
from backend.controller.auth import verify_supabase_token

# Save feedback
def save_feedback():
    user = verify_supabase_token()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    try:
        data = request.get_json()
        feedback = Feedback(
            user_id=user["id"],
            type=data.get("type"),
            content=data.get("content"),
            feedback=data.get("feedback"),
        )
        db.session.add(feedback)
        db.session.commit()
        return jsonify({"message": "Feedback saved", "id": feedback.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get all saved feedback for user
def get_feedback():
    user = verify_supabase_token()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    try:
        results = Feedback.query.filter_by(user_id=user["id"]).order_by(Feedback.created_at.desc()).all()
        return jsonify({"feedbacks": [item.to_dict() for item in results]}), 200
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
        feedback = Feedback.query.filter_by(id=feedback_id, user_id=user["id"]).first()
        if not feedback:
            return jsonify({"error": "Not found"}), 404

        db.session.delete(feedback)
        db.session.commit()
        return jsonify({"message": "Feedback deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

