# HealthGuide: Your Personalized AI-Powered Health Assistant

### 🚀 **Project Overview**

HealthGuide is a modern, full-featured front-end web application built to serve as a personal digital health assistant. Developed to be both a showcase of core web development skills and a genuinely useful tool, it empowers users to track daily wellness metrics and access real-time health information.

This project is a powerful demonstration of how a static front-end can be integrated with a dynamic backend to create an intelligent and interactive user experience.

---

### ✨ **Key Features**

#### **1. AI-Powered Health Tools**
* **Symptom Checker:** An intelligent tool on the homepage that takes user-input symptoms and communicates with a **Python/Flask backend** to provide possible conditions and risk ratings from a **Gemini API**.
* **Medicine Directory:** A dynamic, searchable database that offers common medicine names and their uses, also powered by the AI backend.

#### **2. Interactive Dashboard**
A central hub where users can actively monitor and manage their health goals.
* **Water Intake:** Track glasses of water with real-time updates and a dynamic progress bar.
* **Automated Steps:** A simulated step counter that updates steps and calculates distance at realistic intervals, giving a more engaging feel than manual input.
* **Calorie Tracker:** Log meals by name and calorie count, view a detailed list, and see a running daily total.

#### **3. User-Centric Design & Experience**
* **Dynamic Landing Page:** A modern, hero-style landing page with a clean, professional aesthetic. All the application's core features are available below the fold.
* **Daily Data Reset:** All trackers on the dashboard automatically reset at the start of each new day, providing a fresh start for tracking.
* **Data Persistence:** User progress is saved locally using **`localStorage`**, so all data remains intact even if the user closes the browser.
* **Responsive UI:** The entire application is built with **CSS Flexbox and Grid** to ensure a seamless and intuitive experience across all devices, from mobile phones to desktop computers.

---

### 💻 **Technology Stack**

This project's architecture is a testament to the power of a combined front-end and backend approach.

* **Front-End:**
    * **HTML5:** Semantic and structured web pages.
    * **CSS3:** Styling and modern layouts, including **Flexbox**, **Grid**, and custom animations.
    * **JavaScript (ES6+):** The core logic for all dynamic functionality, **DOM manipulation**, event handling, and asynchronous communication.

* **Backend:**
    * **Python:** The language used to build the server.
    * **Flask:** A lightweight web framework that acts as the API endpoint for the front-end.
    * **Google Gemini API:** Provides the intelligent, conversational AI responses for the Symptom Checker and Medicine Directory.

---

### 🚀 **How to Run the Project Locally**

To experience HealthGuide in its full functionality, you'll need to run the front-end in your browser and the Python backend in your terminal.

#### **1. Clone the Repository**
```bash
git clone [your-repository-url]
cd [your-project-name]

2. Set up the Python Backend

First, install the necessary Python dependencies.
Bash

pip install Flask google-generativeai Flask-Cors

Next, start the Flask server in your terminal. This is a crucial step for the AI features to work.
Bash

python app.py

Leave this terminal window open and running.

3. Launch the Website

Open the index.html file in your web browser. The front-end will now communicate with your local Flask server.

📂 File Structure

HealthGuide-App/
├── app.py              # Python Flask backend server
├── home.js             # JS logic for homepage features (AI, insights)
├── script.js           # JS logic for dashboard trackers
├── style.css           # All CSS styles
├── index.html          # Main landing page
├── dashboard.html      # Health tracking dashboard
├── about-doctors.html  # Doctor profiles page
└── contact.html        # Contact form page

