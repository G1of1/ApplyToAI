from extensions import db
from datetime import datetime

class Feedback(db.Model):
    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)  # "resume", "cover_letter", "generated_cl"
    content = db.Column(db.Text, nullable=False)  # Original input
    feedback = db.Column(db.Text, nullable=False)  # AI response or generated letter
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    def __init__(self, user_id, content, feedback, type):
        self.user_id = user_id
        self.content = content
        self.feedback = feedback
        self.type = type

    def to_dict(self):
        return {
            "type": self.type,
            "content": self.content,
            "feedback": self.feedback,
            "created_at": self.created_at.isoformat()
        }