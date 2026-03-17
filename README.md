# Image-Classification

Screenshot:
![alt text](<Screenshot 2026-03-17 at 10.57.22 PM.png>)

Project Demonstration:
<video controls src="ImageClassification.mov" title="Title"></video>


## Image Classifier

This project is an **End-to-End Image Classification System** that identifies five of my favorite personalitites. The system utilizes a Machine Learning model in the backend and a responsive, user-friendly interface in the frontend.

## 🌟 Featured Personalities
The model is trained to recognize and distinguish between:
* **Bhagat Singh**
* **Che Guevara**
* **Fidel Castro**
* **Vladimir Lenin**
* **Xi Jinping**

---

## 🏗️ Project Architecture

The project is split into three main components:

### 1. Data Science & Model Building (`/model`)
* **Data Collection:** Scraped and curated images for the five classes.
* **Preprocessing:** Used **OpenCV** for face and eye detection. Only images with clear facial features were used for training.
* **Feature Engineering:** Applied **Wavelet Transform** to extract essential patterns from the images, which helps the model focus on structural details.
* **Training:** Built using **Scikit-learn**. I experimented with several models (SVM, Random Forest, Logistic Regression) and used **GridSearchCV** for hyperparameter tuning.

### 2. Backend Server (`/server`)
* Built with **Python** and **Flask**.
* Exposes an API endpoint (`/classify_image`) that receives Base64 encoded images from the frontend.
* Uses the saved `.pkl` model and `class_dictionary.json` to return classification results and probability scores.
* **CORS** enabled to allow seamless communication with the frontend.

### 3. Frontend UI (`/UI`)
* A clean, responsive dashboard built with **HTML, CSS, and Bootstrap**.
* **Dropzone.js** integration for easy drag-and-drop image uploads.
* **jQuery** handles asynchronous API calls to the Flask server, ensuring a smooth user experience without page reloads.

---



## 🛠️ Tech Stack
* **Languages:** Python, JavaScript, HTML5, CSS3
* **ML Libraries:** Scikit-learn, OpenCV, NumPy
* **Web Framework:** Flask
* **UI Components:** Bootstrap, Dropzone.js, jQuery

---

## 📸 How it Works
1.  **Upload:** Drag an image into the Dropzone area.
2.  **Detection:** OpenCV checks for a face and two eyes. If not found, the system alerts the user.
3.  **Classification:** The image is preprocessed (Wavelet Transform) and fed into the SVM model.
4.  **Result:** The UI displays the best match along with a probability score table for all five personalities.

---