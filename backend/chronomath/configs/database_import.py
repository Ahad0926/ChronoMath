from configs.firebase_setup import db
import json

def populate_database():
    # Open the JSON file
    with open("backend/chronomath/configs/database_content.json", encoding="utf-8") as file:
        data = json.load(file)

    docs = db.collection("Courses").stream()
    for doc in docs:
        doc.reference.delete()

    # Iterate through all categories
    for category, content in data.items():
        category_ref = db.collection("Courses").document(category)  # Firestore document reference

        # Add Description
        category_ref.set({"Description": content["Description"]})

        # Add Lessons
        if "Lessons" in content:
            lessons_ref = category_ref.collection("Lessons")
            for lesson_id, lesson_data in content["Lessons"].items():
                lessons_ref.document(lesson_id).set(lesson_data)

        # Add Questions
        if "Questions" in content:
            questions_ref = category_ref.collection("Questions")
            for question_id, question_data in content["Questions"].items():
                questions_ref.document(question_id).set(question_data)