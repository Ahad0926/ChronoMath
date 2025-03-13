from configs.firebase import db
from flask import Blueprint, jsonify, session

user_bp = Blueprint("user", __name__)

@user_bp.route('/points', methods=["GET"])
def get_points():
    try:
        uuid = session.get("uuid")
        user = db.collection("Users").document(uuid).get()
        points = user.to_dict()["points"]
        return jsonify({"points": points}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400

@user_bp.route('/theme', methods=["GET"])
def get_theme():
    try:
        uuid = session.get("uuid")
        user = db.collection("Users").document(uuid).get()
        theme = user.to_dict()["theme"]
        return jsonify({"theme": theme}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400