# HealthGuide: Your Personalized Web-Based Health Assistant

### Project Overview
HealthGuide is a front-end web application designed to help users track and manage their daily health and wellness goals. This project serves as a showcase of core web development skills using HTML, CSS, and vanilla JavaScript for dynamic DOM manipulation and client-side data persistence.

The application provides a centralized dashboard for tracking key metrics and offers a basic symptom checker and medicine directory to provide useful health information.

### Features
* **Personalized Dashboard:** A single-page dashboard to track daily progress on water intake, steps walked, and calorie consumption.
* **Interactive Trackers:**
    * **Water Intake:** Add glasses of water with a button, view progress on a dynamic progress bar, and reset the count daily.
    * **Steps Tracker:** An automatic, simulated step counter that updates steps and calculates distance covered over time. Includes a progress bar to a daily goal.
    * **Calorie Tracker:** Log meals with a name and calorie count, view a list of logged meals, and see a running total for the day.
* **Daily Reset Functionality:** All dashboard trackers automatically reset at the start of each new day, ensuring a fresh start.
* **Health Information Pages:**
    * **Symptom Checker:** A tool on the homepage where users can input symptoms and receive possible disease matches or a recommendation to see a doctor.
    * **Medicine Directory:** A searchable database of common medicines and their uses, integrated directly into the homepage.
    * **About Our Doctors:** A dedicated page showcasing a team of doctors with professional profiles.
* **Clean and Responsive UI:** The application is designed with a modern, clean, and responsive interface that works well on both desktop and mobile devices.

### Technologies Used
* **HTML5:** Used for the semantic structure and content of the application.
* **CSS3:** Utilized for all styling, including a professional and warm color palette, Flexbox and Grid layouts, and responsive design with media queries.
* **JavaScript (ES6+):** The core technology for all interactive functionality, including:
    * DOM Manipulation
    * Event Handling
    * `localStorage` for data persistence
    * `Date` object for daily resets
    * `setTimeout` and `setInterval` for the simulated step tracker

### How to Run the Project Locally
1.  **Clone the repository:**
    ```bash
    git clone [your-repository-url]
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd [your-project-name]
    ```
3.  **Open `index.html` in your web browser.**
    The project is a front-end-only application, so no server setup is required.

---
