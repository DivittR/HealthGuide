function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const waterCountSpan = document.getElementById('waterCount');
const addWaterBtn = document.getElementById('addWaterBtn');
const resetWaterBtn = document.getElementById('resetWaterBtn');

let dailyWaterData = {
    count: 0,
    date: ""
};

function updateWaterDisplay() {
    waterCountSpan.textContent = dailyWaterData.count;
}

function saveWaterData() {
    localStorage.setItem('dailyWaterData', JSON.stringify(dailyWaterData));
}

const savedWaterDataString = localStorage.getItem('dailyWaterData');
if (savedWaterDataString) {
    dailyWaterData = JSON.parse(savedWaterDataString);
    const todayDate = getTodayDateString();
    if (dailyWaterData.date === todayDate) {
        updateWaterDisplay();
    } else {
        dailyWaterData.count = 0;
        dailyWaterData.date = todayDate;
        saveWaterData();
        updateWaterDisplay();
    }
} else {
    dailyWaterData.count = 0;
    dailyWaterData.date = getTodayDateString();
    saveWaterData();
    updateWaterDisplay();
}

addWaterBtn.addEventListener('click', () => {
    dailyWaterData.count++;
    dailyWaterData.date = getTodayDateString();
    updateWaterDisplay();
    saveWaterData();
    updateWaterProgressBar();
});

resetWaterBtn.addEventListener('click', () => {
    dailyWaterData.count = 0;
    dailyWaterData.date = getTodayDateString();
    updateWaterDisplay();
    saveWaterData();
    updateWaterProgressBar();
});

const waterProgressBar = document.getElementById('waterProgress');
const waterGoal = 8;

function updateWaterProgressBar() {
    const progress = Math.min((dailyWaterData.count / waterGoal) * 100, 100);
    waterProgressBar.style.width = `${progress}%`;
    if (dailyWaterData.count >= waterGoal) {
        waterProgressBar.classList.add('goal-met');
    } else {
        waterProgressBar.classList.remove('goal-met');
    }
}
updateWaterProgressBar();

// --- NEW: Steps Walked Logic (Automatic Counter) ---
const stepsCountSpan = document.getElementById('stepsCount');
const resetStepsBtn = document.getElementById('resetStepsBtn');

const METERS_PER_STEP = 0.76;
const distanceCoveredSpan = document.getElementById('distanceCovered');

let stepsWalked = 0;

// Auto Step Counter specific variables
const MIN_AUTO_STEP_INTERVAL = 1000;
const MAX_AUTO_STEP_INTERVAL = 3000;
const MIN_STEPS_PER_INTERVAL = 1;
const MAX_STEPS_PER_INTERVAL = 5;

let autoStepTimeoutId;

const startAutoStepsBtn = document.getElementById('startAutoStepsBtn');
const stopAutoStepsBtn = document.getElementById('stopAutoStepsBtn');


function updateDistanceDisplay() {
    const distanceInMeters = stepsWalked * METERS_PER_STEP;
    const distanceInKm = distanceInMeters / 1000;
    distanceCoveredSpan.textContent = distanceInKm.toFixed(2);
}

// Revised function to start the automatic step increment with a more robust recursive loop
function startAutoSteps() {
    // Check if a loop is already running before starting a new one
    if (autoStepTimeoutId) {
        return; // Exit if already running
    }

    const scheduleNextStep = () => {
        const stepsToAdd = Math.floor(Math.random() * (MAX_STEPS_PER_INTERVAL - MIN_STEPS_PER_INTERVAL + 1)) + MIN_STEPS_PER_INTERVAL;
        stepsWalked += stepsToAdd;
        stepsCountSpan.textContent = stepsWalked;
        localStorage.setItem('stepsWalked', stepsWalked.toString());
        updateDistanceDisplay();
        updateStepsProgressBar();

        const nextInterval = Math.floor(Math.random() * (MAX_AUTO_STEP_INTERVAL - MIN_AUTO_STEP_INTERVAL + 1)) + MIN_AUTO_STEP_INTERVAL;
        autoStepTimeoutId = setTimeout(scheduleNextStep, nextInterval);
    };

    console.log('Auto steps started.');
    // Start the first step after an initial delay
    const initialDelay = Math.floor(Math.random() * (MAX_AUTO_STEP_INTERVAL - MIN_AUTO_STEP_INTERVAL + 1)) + MIN_AUTO_STEP_INTERVAL;
    autoStepTimeoutId = setTimeout(scheduleNextStep, initialDelay);
}


function stopAutoSteps() {
    clearTimeout(autoStepTimeoutId);
    autoStepTimeoutId = null;
    console.log('Auto steps stopped.');
}

const savedSteps = localStorage.getItem('stepsWalked');
if (savedSteps !== null) {
    stepsWalked = parseInt(savedSteps);
    stepsCountSpan.textContent = stepsWalked;
    updateDistanceDisplay();
}

resetStepsBtn.addEventListener('click', () => {
    stepsWalked = 0;
    stepsCountSpan.textContent = stepsWalked;
    localStorage.setItem('stepsWalked', stepsWalked.toString());
    updateDistanceDisplay();
    updateStepsProgressBar();
    stopAutoSteps();
});

if (startAutoStepsBtn) {
    startAutoStepsBtn.addEventListener('click', startAutoSteps);
}
if (stopAutoStepsBtn) {
    stopAutoStepsBtn.addEventListener('click', stopAutoSteps);
}

const stepsProgressBar = document.getElementById('stepsProgress');
const stepsGoal = 10000;

function updateStepsProgressBar() {
    const progress = Math.min((stepsWalked / stepsGoal) * 100, 100);
    stepsProgressBar.style.width = `${progress}%`;
    if (stepsWalked >= stepsGoal) {
        stepsProgressBar.classList.add('goal-met');
    } else {
        stepsProgressBar.classList.remove('goal-met');
    }
}
updateStepsProgressBar();


const calorieInput = document.getElementById('calorieInput');
const mealInput = document.getElementById('mealInput');
const addMealBtn = document.getElementById('addMealBtn');
const totalCaloriesSpan = document.getElementById('totalCalories');
const mealList = document.getElementById('mealList');
const resetMealsBtn = document.getElementById('resetMealsBtn');

let dailyMeals = [];
let totalCalories = 0;

function renderMeals() {
    mealList.innerHTML = '';
    totalCalories = 0;

    dailyMeals.forEach((meal, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${meal.name}: ${meal.calories} kcal`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('meal-item-delete');

        deleteButton.addEventListener('click', () => {
            dailyMeals.splice(index, 1);
            renderMeals();
        });

        listItem.appendChild(deleteButton);
        mealList.appendChild(listItem);
        totalCalories += meal.calories;
    });

    totalCaloriesSpan.textContent = totalCalories;
    saveMealsData();
}

// Reusable function to add a meal to the tracker (made global for meal-planner.js)
window.addMealToTracker = function(mealName, calories) {
    const newMeal = { name: mealName, calories: calories };
    dailyMeals.push(newMeal);
    renderMeals(); // Re-render the calorie tracker list
    // Optionally clear manual input fields if they are still relevant
    if (calorieInput) calorieInput.value = '';
    if (mealInput) mealInput.value = '';
    // console.log(`Meal "${mealName}" with ${calories} kcal added successfully!`); // Optional console log
};


function saveMealsData() {
    localStorage.setItem('dailyMeals', JSON.stringify(dailyMeals));
    localStorage.setItem('totalCalories', totalCalories.toString());
}

const savedMealsString = localStorage.getItem('dailyMeals');
const savedTotalCalories = localStorage.getItem('totalCalories');
let savedMealsDate = localStorage.getItem('dailyMealsDate');

const todayDate = getTodayDateString();

if (savedMealsString && savedTotalCalories && savedMealsDate) {
    if (savedMealsDate === todayDate) {
        dailyMeals = JSON.parse(savedMealsString);
        totalCalories = parseInt(savedTotalCalories);
        renderMeals();
    } else {
        dailyMeals = [];
        totalCalories = 0;
        localStorage.setItem('dailyMealsDate', todayDate);
        renderMeals();
    }
} else {
    dailyMeals = [];
    totalCalories = 0;
    localStorage.setItem('dailyMealsDate', todayDate);
    renderMeals();
}

addMealBtn.addEventListener('click', () => {
    const calories = parseInt(calorieInput.value);
    const mealName = mealInput.value.trim();

    if (isNaN(calories) || calories <= 0 || mealName === '') {
        alert('Please enter a valid meal name and positive calorie amount.');
        return;
    }

    const newMeal = { name: mealName, calories: calories };
    dailyMeals.push(newMeal);

    renderMeals();
    calorieInput.value = '';
    mealInput.value = '';
});

resetMealsBtn.addEventListener('click', () => {
    dailyMeals = [];
    totalCalories = 0;
    renderMeals();
});
