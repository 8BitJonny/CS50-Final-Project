from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

@app.route("/index")
def index():
    with sqlite3.connect("company.db") as con:
        cursor = con.cursor()
        cursor.execute("SELECT * FROM employees")
        db_employees = cursor.fetchall()
    return jsonify(db_employees)

@app.route("/add", methods=["POST"])
def add():
    with sqlite3.connect("company.db") as con:
        cursor = con.cursor()    
        cursor.execute("INSERT INTO employees (firstname, lastname, birthdate, age, sex, workload_per_week, work_group) VALUES (?,?,?,?,?,?,?)",
            (request.args.get("firstName", ""),
            request.args.get("lastName", ""),
            request.args.get("birthdate", ""),
            request.args.get("age", ""),
            request.args.get("gender", ""),
            int(request.args.get("workload", "")),
            request.args.get("department", "")))
    return "200"

@app.route("/delete", methods=["POST"])
def delete():
    if request.args.get("uid", ""):
        with sqlite3.connect("company.db") as con:
            cursor = con.cursor()
            cursor.execute("DELETE FROM employees WHERE id = (?)", (request.args.get("uid",""),))
        return "200"
    
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)