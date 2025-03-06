# Initialize Firebase authentication
import os
import firebase_admin
from firebase_admin import credentials, firestore
import pyrebase

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

# Initialize Firestore database
if not firebase_admin._apps:
  cred = credentials.Certificate("backend/chronomath/configs/firestore_creds.json")
  firebase_admin.initialize_app(cred)

db = firestore.client()
