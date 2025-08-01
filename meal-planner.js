// --- Meal Planner Logic ---

// 1. Get references to HTML elements
const prefVegRadio = document.getElementById('prefVeg');
const prefNonVegRadio = document.getElementById('prefNonVeg');
const planCalorieLimitInput = document.getElementById('planCalorieLimit');
const generatePlanBtn = document.getElementById('generatePlanBtn');
const mealPlanResultsDiv = document.getElementById('mealPlanResults');
const mealPlanListContainer = mealPlanResultsDiv.querySelector('.meal-plan-list');

// 2. Define a database of recipes
const recipeDatabase = [
    // Breakfast (Vegetarian)
    { name: "Poha", calories: 200, type: "Breakfast", preference: "vegetarian", ingredients: ["Flattened rice", "Onion", "Peas", "Turmeric"] },
    { name: "Idli (2 pcs)", calories: 120, type: "Breakfast", preference: "vegetarian", ingredients: ["Rice", "Urad dal"] },
    { name: "Upma", calories: 250, type: "Breakfast", preference: "vegetarian", ingredients: ["Semolina", "Vegetables"] },
    { name: "Vegetable Omelette", calories: 180, type: "Breakfast", preference: "vegetarian", ingredients: ["Eggs", "Vegetables"], isVegetarian: true },
    
    // Lunch (Vegetarian)
    { name: "Dal Tadka & 2 Roti", calories: 350, type: "Lunch", preference: "vegetarian", ingredients: ["Lentils", "Whole wheat flour"] },
    { name: "Paneer Sabzi & 2 Roti", calories: 400, type: "Lunch", preference: "vegetarian", ingredients: ["Paneer", "Vegetables", "Whole wheat flour"] },
    { name: "Vegetable Pulao", calories: 300, type: "Lunch", preference: "vegetarian", ingredients: ["Rice", "Mixed vegetables"] },
    { name: "Rajma Chawal", calories: 450, type: "Lunch", preference: "vegetarian", ingredients: ["Kidney beans", "Rice"] },

    // Dinner (Vegetarian)
    { name: "Mixed Veg Curry & 1 Roti", calories: 300, type: "Dinner", preference: "vegetarian", ingredients: ["Mixed vegetables", "Whole wheat flour"] },
    { name: "Palak Paneer & 1 Roti", calories: 380, type: "Dinner", preference: "vegetarian", ingredients: ["Spinach", "Paneer", "Whole wheat flour"] },
    { name: "Khichdi", calories: 280, type: "Dinner", preference: "vegetarian", ingredients: ["Rice", "Dal"] },

    // Breakfast (Non-Vegetarian)
    { name: "Egg Bhurji & 2 Toast", calories: 280, type: "Breakfast", preference: "non-vegetarian", ingredients: ["Eggs", "Bread", "Spices"] },
    { name: "Chicken Sandwich", calories: 320, type: "Breakfast", preference: "non-vegetarian", ingredients: ["Chicken", "Bread", "Vegetables"] },

    // Lunch (Non-Vegetarian)
    { name: "Chicken Curry & Rice", calories: 500, type: "Lunch", preference: "non-vegetarian", ingredients: ["Chicken", "Rice", "Spices"] },
    { name: "Fish Fry & Rice", calories: 480, type: "Lunch", preference: "non-vegetarian", ingredients: ["Fish", "Rice", "Spices"] },
    { name: "Mutton Rogan Josh & 2 Roti", calories: 600, type: "Lunch", preference: "non-vegetarian", ingredients: ["Mutton", "Whole wheat flour", "Spices"] },

    // Dinner (Non-Vegetarian)
    { name: "Grilled Chicken Salad", calories: 380, type: "Dinner", preference: "non-vegetarian", ingredients: ["Chicken", "Lettuce", "Vegetables"] },
    { name: "Egg Curry & Rice", calories: 420, type: "Dinner", preference: "non-vegetarian", ingredients: ["Eggs", "Rice", "Spices"] },
    { name: "Chicken Biryani (small)", calories: 450, type: "Dinner", preference: "non-vegetarian", ingredients: ["Chicken", "Rice", "Spices"] },
    
    // Snacks (Common to both)
    { name: "Apple", calories: 95, type: "Snack", preference: "vegetarian", ingredients: ["Apple"] },
    { name: "Banana", calories: 105, type: "Snack", preference: "vegetarian", ingredients: ["Banana"] },
    { name: "Handful of Almonds", calories: 170, type: "Snack", preference: "vegetarian", ingredients: ["Almonds"] },
    { name: "Yogurt", calories: 150, type: "Snack", preference: "vegetarian", ingredients: ["Yogurt"] },
    { name: "Boiled Egg", calories: 78, type: "Snack", preference: "non-vegetarian", ingredients: ["Egg"] }
];

// 3. Function to generate and display meal plan
function generateMealPlan() {
    const selectedPreference = document.querySelector('input[name="dietPreference"]:checked').value;
    const planCalorieLimit = parseInt(planCalorieLimitInput.value) || 2000;

    let filteredRecipes = recipeDatabase.filter(recipe => recipe.preference === selectedPreference || recipe.preference === "both");
    
    // Shuffle the recipes to get a different plan each time
    filteredRecipes.sort(() => Math.random() - 0.5);

    let dailyPlan = [];
    let currentTotalCalories = 0;
    
    // Greedy algorithm to fill the calorie limit
    // Keep adding meals as long as we have space
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops in case of a tiny limit
    while (currentTotalCalories < planCalorieLimit && attempts < maxAttempts) {
        let addedThisAttempt = false;
        
        // Loop through all recipes in a shuffled order
        for (const recipe of filteredRecipes) {
            if (currentTotalCalories + recipe.calories <= planCalorieLimit) {
                dailyPlan.push(recipe);
                currentTotalCalories += recipe.calories;
                addedThisAttempt = true;
            }
        }
        
        if (!addedThisAttempt) {
            break; // No more recipes can be added
        }
        attempts++;
    }
    
    // Sort the final plan by meal type (Breakfast, Lunch, Dinner, Snack) for better presentation
    const mealTypeOrder = ["Breakfast", "Lunch", "Dinner", "Snack"];
    dailyPlan.sort((a, b) => mealTypeOrder.indexOf(a.type) - mealTypeOrder.indexOf(b.type));

    // Display the plan
    mealPlanListContainer.innerHTML = '';

    if (dailyPlan.length > 0) {
        dailyPlan.forEach(meal => {
            const mealItemDiv = document.createElement('div');
            mealItemDiv.classList.add('meal-plan-item');
            mealItemDiv.innerHTML = `
                <div class="meal-details">
                    <strong>${meal.type}: ${meal.name}</strong>
                    <span class="calories">${meal.calories} kcal</span>
                </div>
            `;
            mealPlanListContainer.appendChild(mealItemDiv);
        });

        // Add total calories for the plan
        const totalPlanCaloriesDiv = document.createElement('div');
        totalPlanCaloriesDiv.classList.add('meal-plan-item');
        totalPlanCaloriesDiv.style.fontWeight = 'bold';
        totalPlanCaloriesDiv.style.backgroundColor = '#e6ffe6'; // Light green background
        totalPlanCaloriesDiv.innerHTML = `
            <div class="meal-details">
                <strong>Plan Total:</strong>
                <span class="calories">${currentTotalCalories} kcal</span>
            </div>
            <div></div>
        `;
        mealPlanListContainer.appendChild(totalPlanCaloriesDiv);

    } else {
        mealPlanListContainer.innerHTML = '<p class="placeholder-text">No meal plan could be generated with the current preferences and limits. Try adjusting your calorie limit or preference.</p>';
    }
}

// 4. Event Listener for Generate Plan button
generatePlanBtn.addEventListener('click', generateMealPlan);

// Initial generation on page load (optional)
// generateMealPlan();
