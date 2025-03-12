from flask import Flask
import os

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Import routes
from routes.auth_routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

from routes.user_route import user_bp
app.register_blueprint(user_bp, url_prefix="/user")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)