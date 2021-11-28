import json

from typing import List

USERS_FILE = "users.json"
DATA_FILE = "data.json"


def save_data(users, filename) -> dict:
    if type(users) != dict:
        raise TypeError(f"Save Data was not called on a dict, but {type(users)}: {users}")
    with open(filename, 'w') as f:
        json.dump(users, f, indent=4)
    return load_data(filename)


def load_data(filename) -> dict:
    with open(filename, 'r') as f:
        return json.load(f)


def add_new_user(new_user: str, user_hash: str) -> None:
    users = load_data(USERS_FILE)
    users[new_user] = user_hash
    save_data(users, USERS_FILE)


def get_user_data(username: str):
    return load_data(DATA_FILE)[username]


def modify_user_data(username: str, new_data: List[str]):
    data = load_data(DATA_FILE)
    data[username] = new_data
    save_data(data, DATA_FILE)


def add_user_data(username: str, new_elem: str):
    modify_user_data(username, get_user_data(username) + [new_elem])
