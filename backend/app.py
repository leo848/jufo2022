import secrets

from flask import Flask
from flask import request


def generate_session() -> str:
	return secrets.token_urlsafe(32)


app = Flask(__name__)


@app.route("/", methods=["GET"])
def home() -> str:
	return generate_session()


@app.route("/access")
def access():
	token = request.args.get('token')
	
	return f'token: {token} take it or leave it'


if __name__ == "__main__":
	app.run(debug=True)
