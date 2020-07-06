import sqlite3

conn = sqlite3.connect('database.db')
print ("Opened database successfully")

conn.execute('CREATE TABLE Users (First_name TEXT, Last_name TEXT, username TEXT, gmail TEXT, password TEXT)')
print ("Table created successfully")
conn.close()

