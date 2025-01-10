from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Sample questions for the mock test
mockTestQuestions = [
    {"subject": "Mathematics", "question": "What is 2 + 2?", "options": ["2", "3", "4", "5"], "answer": "4"},
    {"subject": "Science", "question": "What is the chemical symbol for water?", "options": ["H2O", "O2", "CO2", "N2"], "answer": "H2O"},
    {"subject": "English", "question": "What is the synonym of 'fast'?", "options": ["slow", "quick", "big", "small"], "answer": "quick"}
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit_details", methods=["POST"])
def submit_details():
    student_name = request.form["name"]
    student_email = request.form["email"]
    student_phone = request.form["phone"]
    
    return jsonify({
        "message": "Details submitted successfully!",
        "student_name": student_name,
        "student_email": student_email,
        "student_phone": student_phone
    })

@app.route("/mock_test", methods=["POST"])
def mock_test():
    # Randomly select 5 questions for the mock test
    selected_questions = random.sample(mockTestQuestions, k=3)
    return jsonify(selected_questions)

@app.route("/conceptual_test", methods=["POST"])
def conceptual_test():
    subject = request.json.get("subject")
    chapter = request.json.get("chapter")
    # Return a simple mock response (You can add more complex logic here)
    return jsonify({
        "subject": subject,
        "chapter": chapter,
        "questions": [{"question": f"What is the {chapter} of {subject}?"}]
    })

if __name__ == "__main__":
    app.run(debug=False)
