from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Fetch variables
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")
SECRET_KEY = os.getenv('SECRET_KEY')


class Config:
    SQLALCHEMY_DATABASE_URI = f"postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


