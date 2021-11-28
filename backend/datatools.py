import json

USERS_FILE = "users.json"


def save_users(users) -> None:
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)


def load_users() -> dict:
    with open(USERS_FILE, "r") as f:
        return json.load(f)


def add_new_user(users: dict, new_user: str, user_hash: str) -> None:
    users[new_user] = user_hash
    save_users(users)
