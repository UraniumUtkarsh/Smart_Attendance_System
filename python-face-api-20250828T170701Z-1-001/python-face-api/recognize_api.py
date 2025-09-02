# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import cv2
# import numpy as np
# import os
# import base64

# app = Flask(__name__)
# # Let the Flask-CORS extension handle all preflight and CORS headers.
# CORS(app, resources={r"/*": {"origins": [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173"
# ]}}, supports_credentials=True)




# # Store student data (usn and image path only)
# student_data = {}

# # Ensure the 'faces' directory exists
# if not os.path.exists("faces"):
#     os.makedirs("faces")

# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "Flask server is running"}), 200

# # Enroll a new student (usn, face image)
# @app.route("/enroll", methods=["POST"])
# def enroll():
#     try:
#         data = request.get_json()
#         if not data or "usn" not in data or "image" not in data:
#             return jsonify({"error": "Invalid request payload"}), 400

#         usn = data["usn"]
#         image_data = data["image"].split(",")[1]
#         image_bytes = base64.b64decode(image_data)
#         np_arr = np.frombuffer(image_bytes, np.uint8)
#         face_img = cv2.imdecode(np_arr, cv2.IMREAD_GRAYSCALE)

#         if face_img is None:
#             return jsonify({"error": "Failed to decode image"}), 400

#         student_folder = os.path.join("faces", usn)
#         os.makedirs(student_folder, exist_ok=True)
#         img_count = len(os.listdir(student_folder))
#         img_name = f"{img_count + 1}.jpg"
#         img_path = os.path.join(student_folder, img_name)
#         cv2.imwrite(img_path, face_img)

#         student_data[usn] = {"image_path": img_path}
        
#         return jsonify({"message": f"Student {usn} enrolled successfully!"}), 201
#     except Exception as e:
#         print(f"Enrollment Error: {str(e)}")
#         return jsonify({"error": f"An error occurred during enrollment: {str(e)}"}), 500

# # Train the model
# def train_model():
#     recognizer = cv2.face.LBPHFaceRecognizer_create()
#     faces = []
#     labels = []
#     label_map = {}
#     current_label = 0

#     if not os.path.exists("faces"):
#         return None, {}

#     for person_usn in os.listdir("faces"):
#         person_folder = os.path.join("faces", person_usn)
#         if not os.path.isdir(person_folder):
#             continue

#         if person_usn not in label_map:
#             label_map[person_usn] = current_label
#             current_label += 1

#         for img_file in os.listdir(person_folder):
#             img_path = os.path.join(person_folder, img_file)
#             img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)

#             if img is None:
#                 print(f"[WARN] Could not read image: {img_path}")
#                 continue

#             faces.append(img)
#             labels.append(label_map[person_usn])

#     if not faces:
#         # Instead of raising an error, return None to be handled gracefully
#         return None, {}

#     recognizer.train(faces, np.array(labels))
#     return recognizer, {v: k for k, v in label_map.items()}

# # Face recognition API
# @app.route("/recognize", methods=["POST","OPTIONS"])
# def recognize():
#     if request.method == "OPTIONS":
#         # ✅ Proper CORS preflight response
#         return jsonify({"status": "ok"}), 200
#     try:
#         data = request.get_json()
#         if not data or "image" not in data:
#             return jsonify({"error": "No image provided"}), 400

#         image_data = data.get("image").split(",")[1]
#         image_bytes = base64.b64decode(image_data)
#         np_arr = np.frombuffer(image_bytes, np.uint8)
#         frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

#         if frame is None:
#             return jsonify({"error": "Failed to decode image"}), 400

#         recognizer, label_reverse_map = train_model()
#         if recognizer is None:
#             return jsonify({"usn": "No training data available"}), 400

#         face_cascade = cv2.CascadeClassifier(
#             cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
#         )
#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         faces = face_cascade.detectMultiScale(gray, 1.3, 5)

#         if not faces:
#             return jsonify({"usn": "No face detected"}), 404

#         (x, y, w, h) = faces[0]
#         face_img = gray[y:y+h, x:x+w]
#         label, confidence = recognizer.predict(face_img)
#         usn = label_reverse_map.get(label, "Unknown")
        
#         return jsonify({
#             "usn": usn,
#             "confidence": int(confidence)
#         })
#     except Exception as e:
#         print(f"Recognition Error: {str(e)}")
#         return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os
import base64

app = Flask(__name__)

# Use Flask-CORS to handle CORS for your frontend origins
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:5173",
    "http://127.0.0.1:5173","http://localhost:5050"
]}}, supports_credentials=True)

# Ensure the 'faces' directory exists
os.makedirs("faces", exist_ok=True)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask server is running"}), 200

@app.route("/enroll", methods=["POST"])
def enroll():
    try:
        data = request.get_json()
        if not data or "usn" not in data or "image" not in data:
            return jsonify({"error": "Invalid request payload"}), 400

        usn = data["usn"]
        image_data = data["image"].split(",")[1]
        image_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        face_img = cv2.imdecode(np_arr, cv2.IMREAD_GRAYSCALE)

        if face_img is None:
            return jsonify({"error": "Failed to decode image"}), 400

        student_folder = os.path.join("faces", usn)
        os.makedirs(student_folder, exist_ok=True)
        img_count = len(os.listdir(student_folder))
        img_name = f"{img_count + 1}.jpg"
        img_path = os.path.join(student_folder, img_name)
        cv2.imwrite(img_path, face_img)

        return jsonify({"message": f"Student {usn} enrolled successfully!"}), 201
    except Exception as e:
        print(f"Enrollment Error: {str(e)}")
        return jsonify({"error": f"An error occurred during enrollment: {str(e)}"}), 500

def train_model():
    try:
        recognizer = cv2.face.LBPHFaceRecognizer_create()
    except AttributeError:
        raise RuntimeError("cv2.face.LBPHFaceRecognizer_create() not found. Install opencv-contrib-python.")

    faces = []
    labels = []
    label_map = {}
    current_label = 0

    if not os.path.exists("faces"):
        return None, {}

    for person_usn in os.listdir("faces"):
        person_folder = os.path.join("faces", person_usn)
        if not os.path.isdir(person_folder):
            continue

        if person_usn not in label_map:
            label_map[person_usn] = current_label
            current_label += 1

        for img_file in os.listdir(person_folder):
            img_path = os.path.join(person_folder, img_file)
            img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            if img is None:
                print(f"[WARN] Could not read image: {img_path}")
                continue
            faces.append(img)
            labels.append(label_map[person_usn])

    if not faces:
        return None, {}

    recognizer.train(faces, np.array(labels))
    return recognizer, {v: k for k, v in label_map.items()}

@app.route("/recognize", methods=["POST", "OPTIONS"])
def recognize():
    if request.method == "OPTIONS":
        # Proper CORS preflight response
        print("OPTIONS request received")
        return jsonify({"status": "ok"}), 200
    try:
        data = request.get_json()
        if not data or "image" not in data:
            return jsonify({"error": "No image provided"}), 400

        image_data = data.get("image").split(",")[1]
        image_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({"error": "Failed to decode image"}), 400

        recognizer, label_reverse_map = train_model()
        if recognizer is None:
            return jsonify({"usn": "No training data available"}), 400

        face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        )
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        if len(faces) == 0:
            return jsonify({"usn": "No face detected"}), 404

        (x, y, w, h) = faces[0]
        face_img = gray[y:y+h, x:x+w]
        label, confidence = recognizer.predict(face_img)
        usn = label_reverse_map.get(label, "Unknown")

        return jsonify({
            "usn": usn,
            "confidence": int(confidence)
        })
    except Exception as e:
        print(f"Recognition Error: {str(e)}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(port=5050, debug=True)