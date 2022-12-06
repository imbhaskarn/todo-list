from flask import Flask
app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "*"}})

from app import views