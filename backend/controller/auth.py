from flask import request
import requests
import os
from dotenv import load_dotenv

load_dotenv()


url = os.getenv("PROJECT_URL")
apiKey = os.getenv("SUPABASE_API_KEY")
def verify_supabase_token():
    auth_header = request.headers.get('Authorization', '')
    if not auth_header or not auth_header.startswith("Bearer "):
        return None

    token = auth_header.replace("Bearer ", "").strip()

    headers = {
        "Authorization": f"Bearer {token}",
        "apikey": apiKey
    }

    response = requests.get(
        "https://brvvvlmmqfqshabbnbzp.supabase.co/auth/v1/user",
        headers=headers
    )

    if response.status_code == 200:
        return response.json()  # Contains user info like id, email
    else:
        print(f"[verify_supabase_token] Failed: {response.status_code} - {response.text}")
        return None