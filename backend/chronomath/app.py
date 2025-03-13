from flask import Flask
from flask_cors import CORS
from configs.database_import import populate_database
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Populate database
populate_database()

# Import routes
from routes.auth_routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

from routes.user_routes import user_bp
app.register_blueprint(user_bp, url_prefix="/user")

from routes.quiz_routes import quiz_bp
app.register_blueprint(quiz_bp, url_prefix="/quiz")

from routes.lesson_routes import lesson_bp
app.register_blueprint(lesson_bp, url_prefix="/lesson")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4769, debug=True)