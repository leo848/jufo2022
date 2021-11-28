import hashlib
import json
import secrets
from typing import Tuple, Dict

from flask import Flask, request
from flask_cors import CORS

USERS_FILE = "users.json"


def generate_session() -> str:
    return secrets.token_urlsafe(32)


def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)


def load_users() -> dict:
    with open(USERS_FILE, "r") as f:
        return json.load(f)


def add_new_user(users: dict, new_user: str, user_hash: str):
    users[new_user] = user_hash
    save_users(users)


def to_response(content, status_code: int = 200) -> Tuple[Dict[str, str], int]:
    return {"response": content}, status_code


users = load_users()

app: Flask = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

data: list = []


@app.route("/get")
def get():
    return to_response(data or ["[empty]"])


@app.route("/post")
def post():
    data.append(request.args.get('body'))
    return '', 201


@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password_hash = hashlib \
        .sha256(request.json["password"].encode()) \
        .hexdigest()
    print(username, password_hash)
    if username not in users.keys():
        return to_response(f'The user {username} doesn\'t exist (yet)', 404)
    if not users.get(username) == password_hash:
        return to_response(f'Wrong password', 401)
    return to_response(f'Successfully logged in as {username}')


@app.route("/register", methods=["POST"])
def register():
    username = request.json["username"]
    password_hash = hashlib \
        .sha256(request.json["password"].encode()) \
        .hexdigest()
    if username.__len__() < 3:
        return to_response(f'Too short, minimum length is 3', 403)
    if username.__len__() > 15:
        return to_response(f'Too long, maximum length is 15', 403)
    if username in users.keys():
        return to_response(f'The user {username} already exists.', 401)
    add_new_user(users, username, password_hash)
    return to_response(f'Successfully created user {username}!')


if __name__ == "__main__":
    app.run(debug=True)
