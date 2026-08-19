# 🔎 TruthLens

### AI-Powered Fake News Detection System

TruthLens is a machine-learning based fake news detection project designed to analyze news content and classify it as **Real** or **Fake**.

The project combines a **browser extension, Django-based web application, and Machine Learning model** to provide a practical approach to identifying potentially misleading news content.

---

## 🎯 Why TruthLens?

The rapid spread of misinformation makes it difficult to determine whether online news can be trusted.

TruthLens aims to provide users with a quick way to analyze news content using Natural Language Processing and Machine Learning.

> **Analyze the content. Understand the result. Think before you trust.**

## ✨ Features

- 📰 **News Content Analysis** — Enter a news article or text for analysis.
- 🧹 **Text Preprocessing** — Cleans and normalizes the input before classification.
- 🧠 **Machine Learning Classification** — Uses a trained ML model with a vectorizer to classify the submitted content.
- ✅ **Real/Fake Prediction** — Displays the classification result directly in the application.
- 🌐 **Browser Extension** — Provides a browser-based interface for the TruthLens project.
- 🖥️ **Web Application** — Includes a Django-based application for the broader TruthLens system.
- ⚡ **Quick Analysis** — Users can submit content and receive a prediction through the interface.

  ## 🏗️ System Architecture

TruthLens is organized into three major components:

```text
                    ┌──────────────────────┐
                    │       User           │
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

                    ## 🧠 Machine Learning

TruthLens uses a trained machine-learning pipeline to classify news content.

### 🔹 Text Preprocessing

Before prediction, the input text is cleaned by:

- Converting text to lowercase
- Removing bracketed content
- Removing non-word characters
- Removing URLs
- Removing HTML tags
- Removing punctuation
- Removing newline characters
- Removing words containing digits

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

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Programming** | Python, JavaScript |
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Django |
| **Machine Learning** | Scikit-learn, Logistic Regression |
| **NLP** | Text preprocessing, vectorization |
| **Model Storage** | Joblib |
| **Browser Extension** | JavaScript, HTML, CSS |
| **Development** | Jupyter Notebook, Git, GitHub |

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
