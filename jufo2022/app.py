import secrets

from flask import Flask


def generate_session() -> str:
	return secrets.token_urlsafe(32)


app = Flask(__name__)


@app.route("/", methods=["GET"])
def test() -> str:
	return generate_session()


@app.route("/access/<token>")
def access(token: str):
	return "token take it or leave it"


if __name__ == "__main__":
	app.run()
