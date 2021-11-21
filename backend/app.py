import secrets

from flask import Flask, request
from flask_cors import CORS


def generate_session() -> str:
	return secrets.token_urlsafe(32)


app: Flask = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

data: list = []


@app.route("/get")
def get():
	return {"response": str(data)}


@app.route("/post")
def post():
	data.append(request.args.get('body'))
	return {"response": "success"}


if __name__ == "__main__":
	app.run(debug=True)
