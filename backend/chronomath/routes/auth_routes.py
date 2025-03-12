from flask import Blueprint, jsonify, request, session
from configs.firebase import db, auth
from google.cloud.firestore_v1 import FieldFilter

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/register', methods=["POST"])
def register():
    try:
        # Get request data
        data = request.get_json()
        email = data["email"]
        password = data["password"]
        name = data["name"]

        # Check if user already exists
        users_ref = db.collection("Users")
        query = users_ref.where(filter=FieldFilter("email", "==", email)).get()
        if len(query) > 0:
            return jsonify({"Error": "User already exists"}), 400
        
        # Create user
        user = auth.create_user_with_email_and_password(email, password)

        # Add user to database
        users_ref.document(user["localId"]).set({
            "email": email,
            "name": name
        })

        # Create session
        session['token'] = user['idToken']
        session['email'] = email

        return jsonify({"Success": "User created"}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
@auth_bp.route('/login', methods=["POST"])
def login():
    try:
        # Get request data
        data = request.get_json()
        email = data["email"]
        password = data["password"]

        # Authenticate user
        user = auth.sign_in_with_email_and_password(email, password)
        if not user:
            return jsonify({"Error": "Invalid credentials"}), 400

        # Create session
        session['token'] = user['idToken']
        session['email'] = email

        return jsonify({"Success": "User logged in"}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
@auth_bp.route('/logout', methods=["POST"])
def logout():
    try:
        # Clear session
        session.clear()
        return jsonify({"Success": "User logged out"}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
@auth_bp.route('/forgot-password', methods=["POST"])
def forgot_password():
    try:
        # Get request data
        data = request.get_json()
        email = data["email"]

        # Send password reset email
        auth.send_password_reset_email(email)
        return jsonify({"Success": "Password reset email sent"}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
