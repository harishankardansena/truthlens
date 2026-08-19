import streamlit as st
import joblib
import re, string

# Load your Jupyter-generated files
vectorizer = joblib.load("vectorizer.jb")
model = joblib.load("lr_model.jb")

def clean_text(text):
    text = text.lower()
    text = re.sub(r"\[.*?\]", "", text)
    text = re.sub(r"\W", " ", text)
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub(r"<.*?>+", "", text)
    text = re.sub(r"[%s]" % re.escape(string.punctuation), "", text)
    text = re.sub(r"\n", "", text)
    text = re.sub(r"\w*\d\w*", "", text)
    return text

st.title("TruthLens : Fake News Detector 📰")
st.write("Enter a news article below to check whether it is Fake or Real.")

news_input = st.text_area("News Article", "")

if st.button("Check News"):
    if news_input.strip():
        cleaned = clean_text(news_input)
        transformed = vectorizer.transform([cleaned])
        prediction = model.predict(transformed)

        if prediction[0] == 1:
            st.success("✅ The News is REAL")
        else:
            st.error("❌ The News is FAKE")
    else:
        st.warning("⚠️ Please enter some text to analyze.")
