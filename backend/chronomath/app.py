from flask import Flask
from dotenv import load_dotenv
import os
import pyrebase
from flask_migrate import Migrate
from models.database import db

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("SQLITE_DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy database
db.init_app(app)
migrate = Migrate(app, db)

# Initialize Firebase authentication
config = {
  "apiKey": os.getenv("FIREBASE_API_KEY"),
  "authDomain": os.getenv("FIREBASE_AUTH_DOMAIN"),
  "projectId": os.getenv("FIREBASE_PROJECT_ID"),
  "storageBucket": os.getenv("FIREBASE_STORAGE_BUCKET"),
  "messagingSenderId": os.getenv("FIREBASE_MESSAGING_SENDER_ID"),
  "appId": os.getenv("FIREBASE_APP_ID"),
  "measurementId": os.getenv("FIREBASE_MEASUREMENT_ID"),
  "databaseURL": '' # Not required for authentication
}
auth = pyrebase.initialize_app(config).auth()

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)