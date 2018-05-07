from flask import Flask, flash, redirect, render_template, request, session
import sqlite3
import datetime

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

@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        print(len(request.form))
        print(request.form["year"],request.form["month"],request.form["day"])    
        with sqlite3.connect("company.db") as con:
            birthdate = datetime.date(int(request.form["year"]),int(request.form["month"]),int(request.form["day"])).isoformat()
            cursor = con.cursor()
            cursor.execute("INSERT INTO employees (firstname, lastname, birthdate, age, sex, workload_per_week, work_group) VALUES (?,?,?,?,?,?,?)",
                (request.form.get("firstName"),
                request.form.get("lastName"),
                birthdate,
                datetime.datetime.now().year - int(request.form.get("year")),
                request.form.get("gender"),
                int(request.form.get("workload")),
                request.form.get("department")))
        return redirect("/")
    return render_template("add.html")

@app.route("/search")
def search():
    return render_template("search.html")

@app.route("/delete", methods=["GET", "POST"])
def delete():
    if request.method == "POST":
        with sqlite3.connect("company.db") as con:
            cursor = con.cursor()
            cursor.execute("DELETE FROM employees WHERE id = (?)", (request.form["uid"]))
    return redirect("/")