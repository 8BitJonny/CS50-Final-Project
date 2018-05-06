from flask import Flask, flash, redirect, render_template, request, session
import sqlite3

app = Flask(__name__)

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def index():
    with sqlite3.connect("company.db") as con:
        cursor = con.cursor()
        cursor.execute("SELECT * FROM employees")
        db_employees = cursor.fetchall()
    return render_template("index.html", db_employees=db_employees)

@app.route("/add")
def add():
    return render_template("add.html")

@app.route("/search")
def search():
    return render_template("search.html")