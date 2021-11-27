import hashlib
import secrets

from flask import Flask, request
from flask_cors import CORS


def generate_session() -> str:
    return secrets.token_urlsafe(32)


users = {
    "leo": "d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1"
}

app: Flask = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

data: list = []


@app.route("/get")
def get():
    return {"response": data or ["[empty]"]}, 200


@app.route("/post")
def post():
    data.append(request.args.get('body'))
    return '', 201


@app.route("/login", methods=["POST"])
def login():
    print(request.json)
    username = request.json["username"]
    password_hash = hashlib\
        .sha256(request.json["password"].encode())\
        .hexdigest()
    print(username, password_hash)
    if username not in users.keys():
        return {"response": f'The user {username} doesn\'t exist (yet)'}, 404
    if not users.get(username) == password_hash:
        return {"response": f'Wrong password'}, 401
    return {"response": f'Successfully logged in as {username}'}, 200


if __name__ == "__main__":
    app.run(debug=True)
