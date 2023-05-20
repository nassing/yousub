import sqlite3
import random
import string

def generate_dummy_data(num_users, num_videos, num_user_videos):
    connection = sqlite3.connect("yousub.db")
    cursor = connection.cursor()

    # Generate dummy users data
    usernames = ['user' + str(i) for i in range(num_users)]
    passwords = [''.join(random.choices(string.ascii_letters + string.digits, k=10)) for i in range(num_users)]
    for i in range(num_users):
        cursor.execute("""
        INSERT INTO users (username, password)
        VALUES (?, ?)
        """, (usernames[i], passwords[i]))

    # Generate dummy videos data
    videos = ['link' + str(i) for i in range(num_videos)]
    for i in range(num_videos):
        cursor.execute("""
        INSERT INTO videos (link, subtitles)
        VALUES (?, ?)
        """, (videos[i],"prout"))

    # Generate dummy user-videos data
    for i in range(num_user_videos):
        user_id = random.randint(0, num_users-1)
        link_id = random.randint(0, num_videos-1)
        cursor.execute("""
        INSERT INTO users_videos (username, link)
        VALUES (?, ?)
        """, (usernames[user_id], videos[link_id]))

    connection.commit()
    cursor.close()
    connection.close()

generate_dummy_data(5, 10, 5)