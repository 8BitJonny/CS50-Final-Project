from flask import Flask, flash, redirect, render_template, request, session

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add")
def add():
    return render_template("add.html")

@app.route("/search")
def search():
    return render_template("search.html")