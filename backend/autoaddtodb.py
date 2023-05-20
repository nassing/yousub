import sqlite3
import random
import string

connection = sqlite3.connect("yousub.db")
cursor = connection.cursor()

videos = [
    ['car-on-fire.mp4','There is so many things wrong with this car the AC does not turn on the mirror fell off and I just do not like it anymore','https://www.youtube.com/watch?v=lMfP16h1QvE'],
    ['google-symptoms.mp4','I feel awful I think I am getting sick okay but just do not google your symptoms because they always make it sound worse it says i have got the black blague you do not have the black plague', 'https://www.youtube.com/watch?v=Kl62WciB__I'],
    ['knife-making.mp4','I am Chelsea Miller I am a knife maker and today I have been challenged to make a knife in six levels of increasing complexity','https://www.youtube.com/watch?v=bDep5KnrKOI'],
    ['mkbd.mp4','And that is actually something I enjoy like just as much as the rest of the videos because if you do not change things up a little bit if you do not stay on you toes a little you might find yourself in cruise control','https://www.youtube.com/watch?v=I1qsF0WQy8c'],
    ['mrbeast.mp4','I recreated Willy Wonkas chocolate factory in real life and one of these ten people is going to walk away with this chocolate factory','https://www.youtube.com/watch?v=Hwybp38GnZw']
]
for i in range(len(videos)):
    cursor.execute("""
    INSERT INTO videos (link, subtitles, source)
    VALUES (?, ?, ?)
    """, (videos[i][0],videos[i][1],videos[i][2]))

connection.commit()
cursor.close()
connection.close()