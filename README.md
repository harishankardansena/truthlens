
# 🔎 TruthLens

### AI-Powered Fake News Detection System

TruthLens is a machine-learning based fake news detection project designed to analyze news content and classify it as **Real** or **Fake**.

The project combines a **browser extension, Django-based web application, and Machine Learning model** to provide a practical approach to identifying potentially misleading news content.

---

## 🎯 Why TruthLens?

The rapid spread of misinformation makes it difficult to determine whether online news can be trusted.

TruthLens aims to provide users with a quick way to analyze news content using Natural Language Processing and Machine Learning.

> **Analyze the content. Understand the result. Think before you trust.**

---

## ✨ Features

- 📰 **News Content Analysis** — Enter a news article or text for analysis.
- 🧹 **Text Preprocessing** — Cleans and normalizes the input before classification.
- 🧠 **Machine Learning Classification** — Uses a trained ML model with a vectorizer to classify the submitted content.
- ✅ **Real/Fake Prediction** — Displays the classification result directly in the application.
- 🌐 **Browser Extension** — Provides a browser-based interface for the TruthLens project.
- 🖥️ **Web Application** — Includes a Django-based application for the broader TruthLens system.
- ⚡ **Quick Analysis** — Users can submit content and receive a prediction through the interface.

---

## 🏗️ System Architecture

TruthLens is organized into three major components:

```text
                    ┌──────────────────────┐
                    │        User          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Browser Extension   │
                    │      Interface       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Django Backend     │
                    │      & API           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Text Preprocessing   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Vectorizer       │
                    │  vectorizer.jb       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   ML Classifier      │
                    │    lr_model.jb       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Real / Fake Result │
                    └──────────────────────┘
````

### 🔄 Processing Flow

1. **Input** — The user provides news content for analysis.
2. **Preprocessing** — The text is cleaned and normalized.
3. **Vectorization** — The cleaned text is transformed using the trained vectorizer.
4. **Classification** — The trained machine-learning model processes the transformed input.
5. **Prediction** — TruthLens returns a Real/Fake classification.

---

## 🧠 Machine Learning

TruthLens uses a trained machine-learning pipeline to classify news content.

### 🔹 Text Preprocessing

Before prediction, the input text is cleaned by:

* Converting text to lowercase
* Removing bracketed content
* Removing non-word characters
* Removing URLs
* Removing HTML tags
* Removing punctuation
* Removing newline characters
* Removing words containing digits

### 🔹 Feature Transformation

The cleaned text is passed through the trained **vectorizer** stored in:

`vectorizer.jb`

The vectorizer converts the processed text into numerical features that can be used by the classifier.

### 🔹 Classification

The transformed input is passed to the trained model stored in:

`lr_model.jb`

The application then uses the model's prediction to determine the classification displayed to the user.

### 🔹 Model Pipeline

```text
News Article
     ↓
Text Cleaning
     ↓
Vectorization
     ↓
Trained ML Model
     ↓
Prediction
     ↓
Real / Fake
```

---

## 🛠️ Tech Stack

| Category              | Technologies                      |
| --------------------- | --------------------------------- |
| **Programming**       | Python, JavaScript                |
| **Frontend**          | HTML, CSS, JavaScript             |
| **Backend**           | Django                            |
| **Machine Learning**  | Scikit-learn, Logistic Regression |
| **NLP**               | Text preprocessing, vectorization |
| **Model Storage**     | Joblib                            |
| **Browser Extension** | JavaScript, HTML, CSS             |
| **Development**       | Jupyter Notebook, Git, GitHub     |

---

## 📂 Project Structure

```text
truthlens/
│
├── backend/
│   └── Django web application
│
├── extension/
│   └── Browser extension
│
├── ml/
│   ├── app.py
│   ├── lr_model.jb
│   ├── vectorizer.jb
│   └── requirements.txt
│
├── .env.example
├── .gitignore
└── README.md
```

### Component Overview

**`backend/`**
Contains the Django-based web application and backend functionality.

**`extension/`**
Contains the browser extension interface and related extension files.

**`ml/`**
Contains the machine-learning application, trained model, and vectorizer used for news classification.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/harishankardansena/truthlens.git
cd truthlens
```

### 2. Set Up the Python Environment

```bash
python -m venv venv
```

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

### 3. Install ML Dependencies

```bash
cd ml
pip install -r requirements.txt
```

### 4. Run the ML Application

```bash
streamlit run app.py
```

The application will start locally and provide a browser URL where you can enter news content for analysis.

---

## 🚀 Running the Full Project

TruthLens contains multiple components.

### 🧠 Machine Learning Application

```bash
cd ml
streamlit run app.py
```

### 🌐 Django Backend

From the backend directory:

```bash
cd backend
python manage.py runserver
```

The Django application will then be available on the local development server.

### 🌐 Browser Extension

The extension can be loaded through your browser's developer/extension settings using the files inside:

```text
extension/
```

---

## 🔐 Environment Variables

If the backend requires environment-specific configuration, create a `.env` file based on:

```text
.env.example
```

**Never commit real API keys, passwords, secret keys, or other credentials to GitHub.**

---

## 📸 Screenshots

Screenshots of the TruthLens interface can be added here.

```text
screenshots/
├── dashboard.png
├── extension.png
└── prediction.png
```

---

## 🔮 Future Scope

Potential future improvements include:

* 🔍 More advanced claim analysis
* 🌐 Integration with external fact-checking services
* 🤖 LLM-assisted analysis
* 📊 Confidence and credibility scoring
* 📰 Automatic news/article extraction
* 🗂️ Prediction history
* 📈 Improved model evaluation and accuracy
* 🌍 Support for multiple languages

---

## 📌 Project Status

**Active Development**

TruthLens is being developed as an AI/ML-based misinformation detection project combining machine learning, web technologies, and browser-extension functionality.

---

## 👨‍💻 Author

### Harishankar Dansena

B.Tech Computer Science & Engineering

**GitHub:**
[https://github.com/harishankardansena](https://github.com/harishankardansena)

**LinkedIn:**
[https://www.linkedin.com/in/harishankar-dansena-6307a5234](https://www.linkedin.com/in/harishankar-dansena-6307a5234)

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.



Then we'll move to the **screenshots section**, because that's what will make this README visually impressive.
```
