from flask import Blueprint, jsonify, request, session
from configs.firebase import db, auth
from google.cloud.firestore_v1 import FieldFilter

auth_bp = Blueprint("auth", __name__)

# Copies a document and all its subcollections
def copy_document(source, destination):
    docs = source.get()

    for doc in docs:
        # Copy document
        doc_data = doc.to_dict()
        destination_doc_ref = destination.document(doc.id)
        destination_doc_ref.set(doc_data)

        # Copy subcollections
        subcollections = source.document(doc.id).collections()
        for subcollection in subcollections:
            copy_document(subcollection, destination_doc_ref.collection(subcollection.id))

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
        user_data = users_ref.document(user["localId"])
        user_data.set({
            "email": email,
            "name": name,
            "points": 0 
        })
        
        # Add Collections from template to user
        template = db.collection("Era")
        user_lesson_collection = user_data.collection("Era")
        copy_document(template, user_lesson_collection)

        # Create session
        session['token'] = user['idToken']
        session['uuid'] = user["localId"]
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

@auth_bp.route('/isloggedin', methods=["GET"])
def is_logged_in():
    if 'token' in session:
        print("Yes")
        return jsonify({"logged_in": True, "email": session['email']}), 200
    else:
        print("No")
        return jsonify({"logged_in": False}), 200