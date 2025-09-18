const API_URL = 'http://127.0.0.1:5000/check_symptoms';

// --- Symptom Checker Logic ---
const symptomInput = document.getElementById('symptomInput');
const checkSymptomsBtn = document.getElementById('checkSymptomsBtn');
const symptomResultsDiv = document.getElementById('symptomResults');

async function checkSymptoms() {
    const rawSymptoms = symptomInput.value.toLowerCase().trim();
    if (rawSymptoms === "") {
        symptomResultsDiv.innerHTML = '<h3>Please enter at least one symptom.</h3>';
        return;
    }

    symptomResultsDiv.innerHTML = '<div class="loading-spinner"></div>';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms: rawSymptoms })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // The LLM response is expected to be a JSON array of disease objects
        const diseaseResults = data[0];
        
        if (diseaseResults && diseaseResults.length > 0) {
            let html = `<h3>Possible conditions:</h3><ul>`;
            diseaseResults.forEach(disease => {
                html += `
                    <li>
                        <strong>Disease:</strong> ${disease.disease} <br>
                        <strong>Over the Counter Medicines:</strong> ${disease.overTheCounterMeds} <br>
                        <strong>Risk Rating:</strong> ${disease.risk_rating} / 10
                    </li>`;
            });
            html += `</ul>`;
            symptomResultsDiv.innerHTML = html;
        } else {
             symptomResultsDiv.innerHTML = `
                <h3>No immediate matches found for your symptoms.</h3>
                <p class="recommendation">Your symptoms might be unique, or indicate a condition not in our current database. It's always best to consult a doctor for a proper diagnosis.</p>
            `;
        }

        // Always show the contact doctors section
        symptomResultsDiv.innerHTML += `
            <div class="contact-doctor-section">
                <p>If you're concerned, you can also:</p>
                <a href="contact.html" class="button-primary contact-btn">Contact Our Doctors</a>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching data:", error);
        symptomResultsDiv.innerHTML = '<h3>Error: Could not connect to the server. Please check if the server is running.</h3>';
    }
}

checkSymptomsBtn.addEventListener('click', checkSymptoms);

// --- Medicine Directory Logic ---
const medicineSearchInput = document.getElementById('medicineSearchInput');
const searchMedicineBtn = document.getElementById('searchMedicineBtn');
const medicineSearchResultsDiv = document.getElementById('medicineSearchResults');

// Note: The medicine directory is currently not connected to the Flask server
// and will not function. You would need to create a separate endpoint in
// app.py for this feature.
async function searchMedicine() {
    medicineSearchResultsDiv.innerHTML = '<h3>This feature requires a separate backend endpoint.</h3>';
}

searchMedicineBtn.addEventListener('click', searchMedicine);
