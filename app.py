from flask import Flask, render_template, jsonify, request
import random
app = Flask(__name__)

words = [
	{
		"inputs": 5,
		"category": "Sports",
		"word": "chess",
	},
	{
		"inputs": 5,
		"category": "Intrument",
		"word": "piano",
	},
];

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get-template")
def get_template():
    return jsonify({
        "status": "success",
        "word": random.choice(words)
    })
    

if __name__ == "__main__":
    app.run(debug=True)
