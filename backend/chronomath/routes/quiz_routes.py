from configs.firebase_setup import db
from flask import Blueprint, jsonify, request

quiz_bp = Blueprint("quiz", __name__)

@quiz_bp.route('/<string:course_id>/getall', methods=["GET"])
def get_all_quizzes(course_id):
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]

        user_ref = db.collection("Users").document(uuid)
        quizzes = user_ref.collection("Courses").document(course_id).collection("Questions").get()
        quiz_list = []
        for quiz in quizzes:
            quiz_list.append(quiz.to_dict())

        return jsonify(quiz_list), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    

@quiz_bp.route('/<string:course_id>/<string:quiz_id>', methods=["GET"])
def get_quiz(course_id, quiz_id):
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]

        user_ref = db.collection("Users").document(uuid)
        quiz = user_ref.collection("Courses").document(course_id).collection("Questions").document(quiz_id).get()

        return jsonify(quiz.to_dict()), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
@quiz_bp.route('/<string:course_id>/<string:quiz_id>/update', methods=["POST"])
def update_quiz_status(course_id, quiz_id):
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]

        user_ref = db.collection("Users").document(uuid)
        data = request.get_json()

        # Add points to the user if the quiz was completed
        if data['Completed']:
            new_points = user_ref.get().to_dict()["points"] + 100
            user_ref.update({"points": new_points})
        else:
            new_points = user_ref.get().to_dict()["points"] - 100
            user_ref.update({"points": new_points})

        # Update quiz status
        quiz_ref = user_ref.collection("Courses").document(course_id).collection("Questions").document(quiz_id)
        quiz_ref.update({"Completed": data['Completed']})

        return jsonify({"Success": "Quiz status updated"}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400