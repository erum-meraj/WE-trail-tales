from flask import Flask, render_template, request, redirect, url_for, session, flash
import firebase_admin
from firebase_admin import credentials, auth, firestore
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Generate a random secret key for security

# Initialize Firebase
cred = credentials.Certificate("we-trail-tales-firebase-adminsdk-fbsvc-947585acc1.json")  # ✅ Replace with actual path
firebase_admin.initialize_app(cred)

# Connect to Firestore
db = firestore.client()
users_collection = db.collection("users")


# Home Page
@app.route('/')
def home():
    if "user_id" in session:
        try:
            user = auth.get_user(session["user_id"])  # ✅ Validate session with Firebase Auth
            user_doc = users_collection.document(user.uid).get()
            if user_doc.exists:
                user_data = user_doc.to_dict()
                return render_template("home.html", username=user_data.get("username", "User"))
        except Exception:
            session.clear()
            return redirect(url_for("login"))

    return redirect(url_for("login"))


# User Sign Up
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        username = request.form['username']
        phone = request.form['phone']
        password = request.form['password']

        try:
            # Create user in Firebase Authentication
            user = auth.create_user(email=email, password=password, display_name=username)

            # Store additional user data in Firestore
            users_collection.document(user.uid).set({
                "email": email,
                "username": username,
                "phone": phone
            })

            flash("Account created successfully! Please log in.", "success")
            return redirect(url_for("login"))

        except firebase_admin.auth.EmailAlreadyExistsError:
            flash("Email already exists! Please log in.", "danger")
        except Exception as e:
            flash(f"Error creating account: {e}", "danger")

    return render_template("signup.html")


# User Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        try:
            # Sign in using Firebase Auth
            user = auth.get_user_by_email(email)

            # Simulate Firebase Authentication using Firestore
            user_doc = users_collection.document(user.uid).get()
            if user_doc.exists:
                session["user_id"] = user.uid  # ✅ Store Firebase UID in session
                print("Login successful!")
                flash("Login successful!", "success")
                return redirect(url_for("home"))

        except firebase_admin.auth.UserNotFoundError:
            flash("Invalid email or password!", "danger")
        except Exception as e:
            flash(f"Error logging in: {e}", "danger")

    return render_template("login.html")


# Logout
@app.route('/logout')
def logout():
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for("login"))


if __name__ == '__main__':
    app.run(debug=True)
