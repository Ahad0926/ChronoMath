from configs.firebase_setup import db
from flask import Blueprint, jsonify, request

lesson_bp = Blueprint("lesson", __name__)

@lesson_bp.route('/<string:course_id>/getall', methods=["POST"])  # changed from GET to POST
def get_all_lessons(course_id):
    try:
        data = request.get_json()
        uuid = data["uuid"]

        user_ref = db.collection("Users").document(uuid)
        lessons = user_ref.collection("Courses").document(course_id).collection("Lessons").get()
        lesson_list = [lesson.to_dict() for lesson in lessons]

        return jsonify(lesson_list), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400

    
@lesson_bp.route('/<string:course_id>/<string:lesson_id>', methods=["GET"])
def get_lesson(course_id, lesson_id):
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]

        user_ref = db.collection("Users").document(uuid)
        lesson = user_ref.collection("Courses").document(course_id).collection("Lessons").document(lesson_id).get()

        return jsonify(lesson.to_dict()), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
@lesson_bp.route('/<string:course_id>/<string:lesson_id>/update', methods=["POST"])
def update_lesson_status(course_id, lesson_id):
    try:
        # Get uuid from request data
        data = request.get_json()
        uuid = data["uuid"]

        user_ref = db.collection("Users").document(uuid)
        data = request.get_json()

        # Add points to the user if the lesson was completed
        if data['Completed']:
            new_points = user_ref.get().to_dict()["points"] + 50
            user_ref.update({"points": new_points})
        else:
            new_points = user_ref.get().to_dict()["points"] - 50
            user_ref.update({"points": new_points})

        # Update lesson status
        lesson_ref = user_ref.collection("Courses").document(course_id).collection("Lessons").document(lesson_id)
        lesson_ref.update({"Completed": data['Completed']})

        return jsonify({"Success": "Lesson status updated"}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 400