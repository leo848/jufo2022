import hashlib
import secrets
from typing import Tuple, Dict

from flask import Flask, request
from flask_cors import CORS

from backend.datatools import *

DATA_FILE = "data.json"


def generate_session() -> str:
    return secrets.token_urlsafe(32)


def get_ip() -> str:
    return request.remote_addr


def to_response(content, status_code: int = 200) -> Tuple[Dict[str, str], int]:
    return {"response": content}, status_code


users = load_data("users.json")
sessions = {}

app: Flask = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})


@app.route("/get")
def get():
    username = sessions[get_ip()]["username"]
    return to_response(get_user_data(username) or ["[empty]"])


@app.route("/post")
def post():
    username = sessions[get_ip()]["username"]
    add_user_data(username, request.args.get("body"))
    return '', 201


@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password_hash = hashlib \
        .sha256(request.json["password"].encode()) \
        .hexdigest()
    print(username, password_hash)

    users = load_data("users.json")
    if username not in users.keys():
        return to_response(f"The user {username} doesn't exist (yet)", 404)
    if not users.get(username) == password_hash:
        return to_response(f'Wrong password for user {username}', 401)

    sid = generate_session()
    ip = get_ip()
    sessions[ip] = {"username": username, "sid": sid}
    return to_response({"sid": sid, "username": username})


@app.route("/logout", methods=["POST"])
def logout():
    sid = request.json.get("sid", "")
    ip = get_ip()
    if ip not in sessions.keys():
        return to_response("You are not logged in", 401)
    if not sessions[ip]["sid"] == sid:
        return to_response("Your session id isn't equal to the one affiliated to your IP", 401)

    del sessions[ip]
    return to_response("You have successfully logged out")


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
    add_new_user(username, password_hash)
    data = load_data(DATA_FILE)
    data[username] = []
    save_data(data, DATA_FILE)
    return to_response(f'Successfully created user {username}!')


if __name__ == "__main__":
    app.run(debug=True)
