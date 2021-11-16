# import datetime
# import os
import mariadb
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import secrets


def generate_session():
    return secrets.token_urlsafe(32)


app = Flask(__name__)

# CORS(app, resources={r'/*': {'origins': '*'}}) # falls Kommunikation mit JS-Frontend


# app.static_folger = 'static'

# @app.teardown_appcontext
# def close_connection(exception):
#    db = g.get("database", None)
#    if db is not None:
#        db.close()
#
# def getDB():
#    db = g.get("database", None)
#    if db is None:
#        db = g.database = mariadb.connect(host="localhost", user="uberspace-user", password="uberspace-datenbankpw", database="uberspace-db-name")
#    return db

# def BEISPIEL-DARENBANKZUGRIFF():
#    db = getDB()
#    cursor = db.cursor()
#    cursor.execute("""SELECT Name, Vorname FROM Tabelle""");   
#    for (name, vorname) in cursor:
#        print(name, vorname)

account = "admin"
password = "sesam"
# sessions = {}
easysessions = []


@app.route("/", methods=["GET"])
def test():
    return "Test ok1"


@app.route("/login/<name>/<pw>", methods=["GET"])
def login(name, pw):
    if name == account and pw == password:
        sid = generate_session()
        easysessions.append(sid)
        return "Willkommen. sid: " + sid
    else:
        return "Benutzer oder Passwort falsch."


@app.route("/logout/<sid>", methods=["GET"])
def logout(sid):
    if sid in easysessions:
        easysessions.remove(sid)
        return "Abgemeldet."
    else:
        return "Keine gültige Session."


# @app.route("/login/<name>/<pw>", methods=["GET"])
# def login(name, pw):
#    if name == account and pw == password:
#        ip = request.remote_addr
#        if ip not in sessions:
#            sessions[ip] = generate_session()
#            return "Willkommen %s (sid: %s)"%(str(ip), sessions[ip])
#        else:
#            return "Du bist bereits angemeldet (sid: %s)"%sessions[ip]
#    else:
#        return "Falscher Benutzer oder Passwort"

# @app.route("/logout/<sid>", methods=["GET"])
# def logout(sid):
#    ip = request.remote_addr
#    if ip in sessions:
#        if sid == sessions[ip]:
#            del sessions[ip]
#            return "Abgemeldet!"
#    return "Du bist nicht angemeldet!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=62001)
