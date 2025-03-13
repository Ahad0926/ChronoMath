from configs.firebase_setup import db
from flask import Blueprint, jsonify, session
from google.cloud import firestore

leaderboard_bp = Blueprint("leaderboard", __name__)

@leaderboard_bp.route('', methods=["GET"])
def get_leaderboard():
    try:
        users = db.collection("Users")
        users = users.order_by("points", direction=firestore.Query.DESCENDING).stream()
        
        leaderboard = []
        for user in users:
            user_data = user.to_dict()
            leaderboard.append({
                "name": user_data["name"],
                "points": user_data["points"]
            })

        return jsonify(leaderboard), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400