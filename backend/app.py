from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import random
import sqlite3

app = Flask(__name__)
CORS(app)

def format_string(string):
    allowed_characters = "abcdefghijklmnopqrstuvwxyz'"
    formated_string = ""
    for letter in string.lower():
        if letter in allowed_characters:
            formated_string += letter
    return formated_string

def compare_answers(user_input, correct_answer):
    user_input = format_string(user_input)
    correct_answer = format_string(correct_answer)
    match_len = 0
    for i in range(min(len(user_input), len(correct_answer))):
        if user_input[i] != correct_answer[i]:
            break
        match_len += 1
    return user_input[:match_len], user_input[match_len:]


@app.route('/', methods=['POST'])
def index():
    connection = sqlite3.connect("yousub.db")
    cursor = connection.cursor()
    username = request.json.get("username")
    cursor.execute(f"SELECT l1.link, l1.source FROM videos l1 LEFT JOIN (SELECT link FROM users_videos WHERE username = '{username}' AND solved = 1) l2 ON l1.link = l2.link WHERE l2.link IS NULL")
    links = cursor.fetchall()

    if not links:
        return jsonify({"link" : "no more links"})

    temp = random.choice(links)
    link = temp[0]
    source = temp[1]
    cursor.execute("INSERT INTO users_videos (username, link) VALUES (?, ?)", (username, link))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"link": link, "source": source})

@app.route('/', methods=['GET'])
def index_get():
    return "you need to be connected"

@app.route('/input', methods=['POST'])
def input():
    try:
        connection = sqlite3.connect("yousub.db")
        cursor = connection.cursor()
        username = request.json.get("username")
        link = request.json.get("link")
        userInput = request.json.get("userInput")
        print(username)
        print(link)
        print(userInput)
        cursor.execute(f"SELECT correct_answer FROM videos WHERE link = '{link}'")
        correct_answer = cursor.fetchone()[0]
        match, remaining = compare_answers(userInput, correct_answer)
        if remaining == "":
            cursor.execute("UPDATE users_videos SET solved = 1 WHERE username = ? AND link = ?", (username, link))
            connection.commit()
        cursor.execute(f"INSERT INTO tries (username, link, userInput) VALUES ('{username}', '{link}', '{userInput}')")
        cursor.close()
        connection.close()
        return "0"
    except:
        return "1"

@app.route('/register', methods=['POST'])
def register_post():
    try:
        username = request.json.get('username')
        password = request.json.get('password')
        print(username)
        print(password)
        conn = sqlite3.connect('yousub.db')
        cur = conn.cursor()
        cur.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        conn.close()
        return "0" #No error
    except:
        return "1" #Error

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    conn = sqlite3.connect('yousub.db')
    cur = conn.cursor()
    cur.execute("SELECT password FROM users WHERE username=?", (username,))
    result = cur.fetchone()
    if result and result[0] == password:
        return "0" #No error
    else:
        return "1" #Error

    
if __name__ == '__main__':
    app.run()