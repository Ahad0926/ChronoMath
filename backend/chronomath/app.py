from flask import Flask
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Import routes
from routes.auth_routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

# from backend.chronomath.routes.unit_routes import unit_bp
# app.register_blueprint(unit_bp, url_prefix="/units")

from routes.user_route import user_bp
app.register_blueprint(user_bp, url_prefix="/user")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4769, debug=True)