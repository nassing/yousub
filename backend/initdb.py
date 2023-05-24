import sqlite3

def create_db():
    connection = sqlite3.connect("yousub.db")
    cursor = connection.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        username TEXT NOT NULL UNIQUE PRIMARY KEY,
        password TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS videos (
        link TEXT NOT NULL PRIMARY KEY UNIQUE,
        subtitles TEXT NOT NULL,
        source TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users_videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        solved INTEGER NOT NULL DEFAULT 0,
        username TEXT NOT NULL,
        link TEXT NOT NULL,
        FOREIGN KEY (username) REFERENCES users (username),
        FOREIGN KEY (link) REFERENCES videos (link)
    )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_video_id INT NOT NULL,
            try_number INT NOT NULL,
            try_text STRING NOT NULL,
            FOREIGN KEY (user_video_id) REFERENCES users_videos (id)
        )
        """)

    connection.commit()
    cursor.close()
    connection.close()

create_db()