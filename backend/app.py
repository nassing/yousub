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

def findOriginalIndex(originalText, formattedText, formattedIndex):
    originalIndex = 0
    for i in range(len(originalText)):
        if formattedText[formattedIndex] == originalText[i]:
            originalIndex = i
            break
    return originalIndex

def compareAnswers(userInput, correctAnswer):
    formatedUserInput = formatString(userInput)
    correctAnswer = formatString(correctAnswer)
    formatedMatchLength = 0
    for i in range(min(len(formatedUserInput), len(correctAnswer))):
        if formatedUserInput[i] != correctAnswer[i]:
            break
        formatedMatchLength += 1
    matchLength = findOriginalIndex(userInput, formatedUserInput, formatedMatchLength)
    return userInput[:matchLength], userInput[matchLength:]


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
        link = request.json.get("videoLink")
        userInput = request.json.get("userInput")
        print(username)
        print(link)
        print(userInput)
        cursor.execute(f"SELECT correct_answer FROM videos WHERE link = '{link}'")
        correct_answer = cursor.fetchone()[0]
        match, remaining = compareAnswers(userInput, correct_answer)
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

@app.route('/getHistory', methods=['POST'])
def getHistory():
    username = request.json.get('username')
    videoLink = request.json.get('videoLink')
    conn = sqlite3.connect('yousub.db')
    cur = conn.cursor()
    cur.execute("SELECT id FROM users_videos WHERE username=? AND link=?", (username, videoLink))
    try:
        videoID = cur.fetchall()
        userVideoID = videoID[0][0]
        cur.execute("SELECT try_text FROM tries WHERE userVideoID=? ORDER BY try_number ASC", (userVideoID,))
        result = cur.fetchall()
        conn.close()
        return jsonify(result)
    except:
        conn.close()
        return jsonify([])
    
if __name__ == '__main__':
    app.run()