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
    
@user_bp.route('/addrecent', methods=["POST"])
def add_recent():
    try:
        # Get uuid and recent from request data
        data = request.get_json()
        uuid = data["uuid"]
        lesson_id = data["lesson_id"]

        user = db.collection("Users").document(uuid).get()

        # Add to recents
        recents = user.to_dict()["recents"]

        if lesson_id not in recents:
            recents.append(lesson_id)
            if len(recents) > 3:
                recents.pop(0)
            db.collection("Users").document(uuid).update({"recents": recents})

        return jsonify({"recents": recents}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
@user_bp.route('/addfavorite', methods=["POST"])
def add_favorite():
    try:
        # Get uuid and favorite from request data
        data = request.get_json()
        uuid = data["uuid"]
        lesson_id = data["lesson_id"]

        user = db.collection("Users").document(uuid).get()

        # Add to favorites
        favorites = user.to_dict()["favorites"]

        if lesson_id not in favorites:
            favorites.append(lesson_id)
            db.collection("Users").document(uuid).update({"favorites": favorites})

        return jsonify({"favorites": favorites}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400

@user_bp.route('/getrecents', methods=["GET"])
def get_recents():
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]

        user = db.collection("Users").document(uuid).get()
        recents = user.to_dict()["recents"]
        return jsonify({"recents": recents}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
@user_bp.route('/getfavorites', methods=["GET"])
def get_favorites():
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]

        user = db.collection("Users").document(uuid).get()
        favorites = user.to_dict()["favorites"]
        return jsonify({"favorites": favorites}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
@user_bp.route('/deletefavorite', methods=["POST"])
def delete_favorite():
    try:
        # Get uuid and favorite from request data
        data = request.get_json()
        uuid = data["uuid"]
        lesson_id = data["lesson_id"]

        user = db.collection("Users").document(uuid).get()

        # Remove from favorites
        favorites = user.to_dict()["favorites"]

        if lesson_id in favorites:
            favorites.remove(lesson_id)
            db.collection("Users").document(uuid).update({"favorites": favorites})

        return jsonify({"favorites": favorites}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400