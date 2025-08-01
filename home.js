// --- Symptom Checker Logic for Home Page ---

// 1. Get references to HTML elements
const symptomInput = document.getElementById('symptomInput');
const checkSymptomsBtn = document.getElementById('checkSymptomsBtn');
const symptomResultsDiv = document.getElementById('symptomResults');

// 2. Define a simple database of symptoms and possible diseases (UPDATED)
const diseaseDatabase = [
    {
        name: "Common Cold",
        symptoms: ["runny nose", "sore throat", "cough", "sneezing", "mild headache", "body aches"],
        recommendation: "Rest, drink fluids, and over-the-counter cold medicine. Symptoms usually clear in a week."
    },
    {
        name: "Flu (Influenza)",
        symptoms: ["fever", "body aches", "fatigue", "cough", "sore throat", "headache", "chills", "nasal congestion"],
        recommendation: "Rest, fluids. Consider antiviral medication if caught early. Monitor for severe symptoms."
    },
    {
        name: "Allergies",
        symptoms: ["sneezing", "itchy eyes", "runny nose", "nasal congestion", "rash"],
        recommendation: "Antihistamines can help. Identify and avoid allergens if possible."
    },
    {
        name: "Migraine",
        symptoms: ["severe headache", "pulsating pain", "nausea", "vomiting", "sensitivity to light", "sensitivity to sound"],
        recommendation: "Rest in a dark, quiet room. Over-the-counter pain relievers or prescription medication may be needed. Consult a doctor for diagnosis and management."
    },
    {
        name: "Stomach Flu (Gastroenteritis)",
        symptoms: ["nausea", "vomiting", "diarrhea", "stomach cramps", "low-grade fever"],
        recommendation: "Stay hydrated with clear fluids. Eat bland foods. Symptoms usually resolve in a few days."
    },
    {
        name: "Heartburn / Acid Reflux",
        symptoms: ["chest pain", "burning sensation in chest", "sore throat", "difficulty swallowing", "cough"],
        recommendation: "Avoid spicy and fatty foods. Antacids can provide temporary relief. Persistent symptoms should be discussed with a doctor."
    },
    {
        name: "Muscle Strain",
        symptoms: ["pain in a specific muscle", "swelling", "difficulty moving", "stiffness"],
        recommendation: "Rest the affected muscle, apply ice, and consider over-the-counter pain relievers. Consult a physical therapist if pain is severe."
    }
    // Add more diseases and symptoms here
];

// 3. Function to check symptoms and display results
function checkSymptoms() {
    const rawSymptoms = symptomInput.value.toLowerCase().trim();
    if (rawSymptoms === "") {
        symptomResultsDiv.innerHTML = '<h3>Please enter at least one symptom.</h3>';
        symptomResultsDiv.innerHTML += `
            <div class="contact-doctor-section">
                <p>If you're concerned, you can also:</p>
                <a href="contact.html" class="button-primary contact-btn">Contact Our Doctors</a>
            </div>
        `;
        return;
    }

    const enteredSymptoms = rawSymptoms.split(',').map(s => s.trim()).filter(s => s !== '');

    let possibleDiseases = [];
    let matchedSymptomsCount = {};

    diseaseDatabase.forEach(disease => {
        let currentMatches = 0;
        enteredSymptoms.forEach(enteredSymptom => {
            if (disease.symptoms.includes(enteredSymptom)) {
                currentMatches++;
            }
        });

        if (currentMatches > 0) {
            possibleDiseases.push({
                name: disease.name,
                recommendation: disease.recommendation,
                matches: currentMatches
            });
        }
    });

    possibleDiseases.sort((a, b) => b.matches - a.matches);

    symptomResultsDiv.innerHTML = ''; // Clear previous results

    if (possibleDiseases.length > 0) {
        let resultsHTML = '<h3>Possible Conditions:</h3><ul>';
        possibleDiseases.forEach(disease => {
            resultsHTML += `<li><strong>${disease.name}</strong>: ${disease.recommendation}</li>`;
        });
        resultsHTML += '</ul>';
        symptomResultsDiv.innerHTML = resultsHTML;

        symptomResultsDiv.innerHTML += '<p class="recommendation"><strong>Disclaimer: This is for informational purposes only. For accurate diagnosis and treatment, please consult a healthcare professional.</strong></p>';

    } else {
        symptomResultsDiv.innerHTML = `
            <h3>No immediate matches found for your symptoms.</h3>
            <p class="recommendation">Your symptoms might be unique, or indicate a condition not in our current database. It's always best to consult a doctor for a proper diagnosis.</p>
        `;
    }

    // Always add the Contact Our Doctors section at the end
    symptomResultsDiv.innerHTML += `
        <div class="contact-doctor-section">
            <p>If you're concerned, you can also:</p>
            <a href="contact.html" class="button-primary contact-btn">Contact Our Doctors</a>
        </div>
    `;
}

// 4. Add event listener to the "Check Symptoms" button
checkSymptomsBtn.addEventListener('click', checkSymptoms);


// --- NEW: Medicine Directory Logic for Home Page ---

// 1. Get references to HTML elements
const medicineSearchInput = document.getElementById('medicineSearchInput');
const searchMedicineBtn = document.getElementById('searchMedicineBtn');
const medicineSearchResultsDiv = document.getElementById('medicineSearchResults');

// 2. Define a database of common medicines (UPDATED)
const medicineDatabase = [
    {
        name: "Dolo 650",
        alternative: "Paracetamol, Acetaminophen",
        uses: "Fever, mild to moderate pain (headache, muscle aches)",
        category: "Pain Relief"
    },
    {
        name: "Sinarest",
        alternative: "Paracetamol, Phenylephrine, Chlorpheniramine",
        uses: "Cold and flu symptoms, nasal congestion, fever, headache, body ache",
        category: "Cold & Flu"
    },
    {
        name: "Lopamide",
        alternative: "Loperamide",
        uses: "Diarrhea relief",
        category: "Digestive"
    },
    {
        name: "Cetirizine",
        alternative: "Zyrtec",
        uses: "Allergy symptoms (sneezing, runny nose, itchy eyes, hives)",
        category: "Allergy"
    },
    {
        name: "Amoxicillin",
        alternative: "Moxatag",
        uses: "Bacterial infections (ear infections, strep throat, pneumonia) - Prescription only",
        category: "Antibiotic"
    },
    {
        name: "Ibuprofen",
        alternative: "Advil, Motrin",
        uses: "Pain, inflammation, fever (headache, menstrual cramps, arthritis)",
        category: "Pain Relief"
    },
    {
        name: "Omeprazole",
        alternative: "Prilosec",
        uses: "Heartburn, acid reflux, stomach ulcers",
        category: "Digestive"
    },
    {
        name: "Ranitidine",
        alternative: "Zantac (historical), Famotidine (current alternative)",
        uses: "Heartburn, acid indigestion, ulcers",
        category: "Digestive"
    },
    {
        name: "Dextromethorphan",
        alternative: "Robitussin DM, Delsym",
        uses: "Cough suppression",
        category: "Cold & Flu"
    },
    {
        name: "Pseudoephedrine",
        alternative: "Sudafed",
        uses: "Nasal congestion, sinus pressure",
        category: "Cold & Flu"
    },
    {
        name: "Loperamide",
        alternative: "Imodium",
        uses: "Diarrhea relief",
        category: "Digestive"
    },
    {
        name: "Aspirin",
        alternative: "Ecotrin",
        uses: "Pain relief, fever reduction, blood thinner",
        category: "Pain Relief"
    },
    {
        name: "Digene",
        alternative: "Gelusil, Milk of Magnesia",
        uses: "Acidity, gas, indigestion, heartburn",
        category: "Digestive"
    },
    {
        name: "Vicks Vaporub",
        alternative: "Menthol, Eucalyptus oil",
        uses: "Cough, cold, muscular aches and pains",
        category: "Cold & Flu"
    },
    {
        name: "Benadryl",
        alternative: "Diphenhydramine",
        uses: "Allergy symptoms, insomnia, cough",
        category: "Allergy"
    }
    // Add more medicines here
];

// 3. Function to search and display medicines
function searchMedicine() {
    const searchTerm = medicineSearchInput.value.toLowerCase().trim();
    medicineSearchResultsDiv.innerHTML = ''; // Clear previous results

    if (searchTerm === "") {
        medicineSearchResultsDiv.innerHTML = '<h3>Please enter a medicine name or use to search.</h3>';
        return;
    }

    const matchingMedicines = medicineDatabase.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm) ||
        (medicine.alternative && medicine.alternative.toLowerCase().includes(searchTerm)) ||
        medicine.uses.toLowerCase().includes(searchTerm) ||
        (medicine.category && medicine.category.toLowerCase().includes(searchTerm))
    );

    if (matchingMedicines.length > 0) {
        let resultsHTML = '<h3>Matching Medicines:</h3><ul>';
        matchingMedicines.forEach(medicine => {
            resultsHTML += `
                <li>
                    <strong>${medicine.name}</strong> (${medicine.alternative || 'No alternative listed'})<br>
                    <span class="medicine-use">Uses: ${medicine.uses}</span>
                    ${medicine.category ? `<br><span class="medicine-category">Category: ${medicine.category}</span>` : ''}
                </li>
            `;
        });
        resultsHTML += '</ul>';
        medicineSearchResultsDiv.innerHTML = resultsHTML;
    } else {
        medicineSearchResultsDiv.innerHTML = `
            <h3>No medicines found matching "${searchTerm}".</h3>
            <p>Try a different name or symptom related to the medicine's use.</p>
        `;
    }
}

// 4. Add event listener to the "Search Medicine" button
searchMedicineBtn.addEventListener('click', searchMedicine);

// --- NEW: Personalized Insights Logic ---

// Get references to HTML elements
const dynamicInsightsDiv = document.getElementById('dynamicInsights');
const refreshInsightsBtn = document.getElementById('refreshInsightsBtn');

// Define daily goals (should match dashboard goals)
const WATER_GOAL = 8; // glasses
const STEPS_GOAL = 10000; // steps
const CALORIE_THRESHOLD_LOW = 1500; // Example low calorie threshold
const CALORIE_THRESHOLD_HIGH = 2500; // Example high calorie threshold

// Function to generate and display insights
function generatePersonalizedInsights() {
    let insightsHtml = '';

    // --- Retrieve data from localStorage ---
    const savedWaterDataString = localStorage.getItem('dailyWaterData');
    const savedStepsString = localStorage.getItem('stepsWalked');
    const savedTotalCaloriesString = localStorage.getItem('totalCalories');

    let waterCount = 0;
    let stepsCount = 0;
    let totalCalories = 0;

    // Use getTodayDateString from script.js, assuming it's loaded first.
    // Or, for independence, let's redefine it here.
    function getTodayDateString() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    if (savedWaterDataString) {
        const waterData = JSON.parse(savedWaterDataString);
        // Only use water data if it's from today (to match daily reset logic)
        if (waterData.date === getTodayDateString()) {
            waterCount = waterData.count;
        }
    }
    if (savedStepsString) {
        stepsCount = parseInt(savedStepsString);
    }
    if (savedTotalCaloriesString) {
        totalCalories = parseInt(savedTotalCaloriesString);
    }

    // --- Generate Insights ---

    // Insight 1: Water Intake
    if (waterCount >= WATER_GOAL) {
        insightsHtml += `<p class="insight-good">Hydration: Excellent! You've met your water goal today. Keep it up!</p>`;
    } else if (waterCount > WATER_GOAL / 2) {
        insightsHtml += `<p class="insight-neutral">Hydration: You're halfway to your water goal. A few more glasses will get you there!</p>`;
    } else {
        insightsHtml += `<p class="insight-action">Hydration: Remember to drink more water today. Aim for at least ${WATER_GOAL - waterCount} more glasses.</p>`;
    }

    // Insight 2: Steps Walked
    if (stepsCount >= STEPS_GOAL) {
        insightsHtml += `<p class="insight-good">Activity: Fantastic! You've crushed your steps goal today. Great work!</p>`;
    } else if (stepsCount > STEPS_GOAL * 0.75) {
        insightsHtml += `<p class="insight-neutral">Activity: You're very close to your steps goal. A short walk could get you there!</p>`;
    } else if (stepsCount > STEPS_GOAL / 2) {
        insightsHtml += `<p class="insight-neutral">Activity: Good progress on steps. Keep moving to reach your goal!</p>`;
    } else {
        insightsHtml += `<p class="insight-action">Activity: Time to get moving! Try to increase your steps today. Aim for at least ${STEPS_GOAL - stepsCount} more.</p>`;
    }

    // Insight 3: Calorie Intake
    if (totalCalories > CALORIE_THRESHOLD_HIGH) {
        insightsHtml += `<p class="insight-action">Nutrition: Your calorie intake seems a bit high today. Consider lighter options for your next meal.</p>`;
    } else if (totalCalories < CALORIE_THRESHOLD_LOW && totalCalories > 0) { // Check > 0 so it doesn't show for empty tracker
        insightsHtml += `<p class="insight-action">Nutrition: Your calorie intake is on the lower side. Ensure you're getting enough energy for the day.</p>`;
    } else if (totalCalories > 0) { // If totalCalories is within range and not zero
        insightsHtml += `<p class="insight-good">Nutrition: Your calorie intake appears balanced. Keep up the healthy eating habits!</p>`;
    } else {
        insightsHtml += `<p class="insight-neutral">Nutrition: No calorie data yet. Log your meals to get personalized insights!</p>`;
    }

    // If no data at all, provide a general message
    if (waterCount === 0 && stepsCount === 0 && totalCalories === 0) {
        insightsHtml = `<p>It looks like you haven't logged any data today. Head over to the <a href="dashboard.html">Dashboard</a> to start tracking your progress and get personalized insights!</p>`;
    }

    dynamicInsightsDiv.innerHTML = insightsHtml;
}

// Call insights generation on page load
generatePersonalizedInsights();

// Add event listener to refresh button
refreshInsightsBtn.addEventListener('click', generatePersonalizedInsights);
