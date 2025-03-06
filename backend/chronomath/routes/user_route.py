from configs.firebase import db
from flask import Blueprint, request

user_bp = Blueprint("user", __name__)

@user_bp.route('/test')
def test():
    print(db.collection("Users").document("dummyuser123").get().to_dict())
    return "test"