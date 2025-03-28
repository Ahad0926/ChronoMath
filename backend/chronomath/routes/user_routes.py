from configs.firebase_setup import db
from flask import Blueprint, jsonify, request

user_bp = Blueprint("user", __name__)

@user_bp.route('/points', methods=["GET"])
def get_points():
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]

        user = db.collection("Users").document(uuid).get()
        points = user.to_dict()["points"]
        return jsonify({"points": points}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400

@user_bp.route('/theme', methods=["GET"])
def get_theme():
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]

        user = db.collection("Users").document(uuid).get()
        theme = user.to_dict()["theme"]
        return jsonify({"theme": theme}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
@user_bp.route('/name', methods=["GET"])
def get_name():
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]
        
        user = db.collection("Users").document(uuid).get()
        name = user.to_dict()["name"]
        return jsonify({"name": name}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400