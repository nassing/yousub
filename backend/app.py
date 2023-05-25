from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import random
import sqlite3

app = Flask(__name__)
CORS(app)

def formatString(string):
    allowedCharacters = "abcdefghijklmnopqrstuvwxyz"
    formatedString = ""
    for letter in string.lower():
        if letter in allowedCharacters:
            formatedString += letter
    return formatedString

def findOriginalIndex(string, index):
    allowedCharacters = "abcdefghijklmnopqrstuvwxyz"
    count = 0
    for i in range(len(string)):
        if string[i] in allowedCharacters:
            count += 1
        if count == index:
            return i + 1
    return len(string)



def compareAnswers(userInput, correctAnswer):
    formatedUserInput = formatString(userInput)
    correctAnswer = formatString(correctAnswer)
    match_index = 0
    for i in range(min(len(formatedUserInput), len(correctAnswer))):
        if formatedUserInput[i] != correctAnswer[i]:
            if i == 0:
                return "", userInput
            match_index = i - 1
            break
        elif i == min(len(formatedUserInput), len(correctAnswer)) - 1:
            match_index = i + 1
    match_index = findOriginalIndex(userInput, match_index)
    if userInput[match_index:] == "" and len(formatedUserInput) < len(correctAnswer):
        return userInput[:match_index], " ..."
    return userInput[:match_index], userInput[match_index:]


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
        username = request.json.get("username")
        link = request.json.get("videoLink")
        userInput = request.json.get("userInput")
        
        connection = sqlite3.connect("yousub.db")
        cursor = connection.cursor()
        cursor.execute("INSERT INTO users_videos (username, link) SELECT ?, ? WHERE NOT EXISTS (SELECT username, link FROM users_videos WHERE username = ? AND link = ?)", (username, link, username, link))
        connection.commit()
        correctAnswer = cursor.execute(f"SELECT subtitles FROM videos WHERE link = '{link}'").fetchone()[0]
        match, remaining = compareAnswers(userInput, correctAnswer)
        userVideoID = cursor.execute(f"SELECT id FROM users_videos WHERE username = '{username}' AND link = '{link}'").fetchone()[0]
        tryNumber = (cursor.execute(f"SELECT MAX(try_number) FROM tries WHERE user_video_id = '{userVideoID}'").fetchone()[0] or 0) + 1
        if remaining == "":
            cursor.execute("UPDATE users_videos SET solved = 1 WHERE id = ?", (userVideoID,))
            connection.commit()
        cursor.execute(f"INSERT INTO tries (user_video_id, try_number, try_text) VALUES ('{userVideoID}', '{tryNumber}', '{userInput}')")
        connection.commit()
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

@app.route('/getTryHistory', methods=['POST'])
def getTryHistory():
    username = request.json.get('username')
    videoLink = request.json.get('videoLink')
    conn = sqlite3.connect('yousub.db')
    cur = conn.cursor()
    cur.execute("SELECT id FROM users_videos WHERE username=? AND link=?", (username, videoLink))
    try:
        userVideoID = cur.fetchone()[0]
        if userVideoID:
            correctAnswer = cur.execute(f"SELECT subtitles FROM videos WHERE link = '{videoLink}'").fetchone()[0]
            tries = cur.execute("SELECT try_text FROM tries WHERE user_video_id=? ORDER BY try_number ASC", (userVideoID,)).fetchall()
            correctHistory, incorrectHistory = zip(*[compareAnswers(userAnswer[0], correctAnswer) for userAnswer in tries])
            conn.close()
            return jsonify({"correctHistory": correctHistory, "incorrectHistory": incorrectHistory})
        else:
            conn.close()
            return jsonify({"correctHistory": [], "incorrectHistory": []})
    except:
        conn.close()
        return jsonify({"correctHistory": [], "incorrectHistory": []})
    
if __name__ == '__main__':
    app.run()