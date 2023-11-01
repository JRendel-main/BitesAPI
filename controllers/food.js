import fs from 'fs';
import express from 'express';

// read the json db
const foodPath = 'db/output.json';
let food = JSON.parse(fs.readFileSync(foodPath, 'utf8'));

// Create a new instance of express router
const router = express.Router();

export const foodList = (req, res) => {
    // send back to client the food json
    res.send(food);
    console.log('Warning! Someone is accessing your food list!');
};

export const foodData = (req, res) => {
    // get the id from the request
    const id = req.params.id;

    // check if there is comma in the id string and split it
    const idArray = id.split(',');
    // if there is only one id'
    if (idArray.length === 1) {
        // get the food item from the json
        const foodItem = food.find((food) => food.id === id);
        // send back to client the food item json
        res.send(foodItem);
    } else {
        // if there are multiple ids
        // create an empty array to store the food items
        let foodArray = [];
        // loop through the id array
        idArray.forEach((id) => {
            // get the food item from the json
            const foodItem = food.find((food) => food.id === id);
            // push the food item to the food array
            foodArray.push(foodItem);
        });
        // send back to client the food array json
        res.send(foodArray);
    }
};

export const foodRandom = (req, res) => {
    const count = req.params.count;

    // create an empty array to store the food items
    let foodArray = [];
    // loop through the count
    for (let i = 0; i < count; i++) {
        // get a random number
        const random = Math.floor(Math.random() * food.length);
        // get the food item from the json
        const foodItem = food[random];
        // push the food item to the food array
        foodArray.push(foodItem);
    }
    // send back to client the food array json
    res.send(foodArray);
};

export const foodCount = (req, res) => {
    // count the number of food items
    const count = food.length;
    // send back to client the count
    res.send({ count });
};

export const findIngredients = (req, res) => {
    // Get the ingredients from the request, separated by comma
    const searchIngredients = req.params.ingredients.split(',');

    // Create an empty array to store the food items
    let foodArray = [];

    // Initialize variables to keep track of the meal with the most matched ingredients
    let maxMatchCount = 0;
    let mostMatchedMeal = null;

    // Define a helper function to clean and extract specific ingredients
    function cleanAndExtractIngredients(ingredientsString) {
        // Split the ingredients string into an array and make it lowercase
        const foodIngredients = JSON.parse(ingredientsString.toLowerCase());

        // Clean and extract specific ingredients while ignoring numbers and measurements
        const specificIngredients = foodIngredients.map((ingredient) =>
            ingredient.replace(/[\d.]+/g, '').trim().replace(/\s+/g, ' ')
        );

        return specificIngredients;
    }

    food.forEach((foodItem) => {
        // Check if foodItem.ingredients is defined
        if (foodItem.ingredients) {
            const specificIngredients = cleanAndExtractIngredients(foodItem.ingredients);

            // Calculate the number of matched ingredients
            const matchedIngredients = specificIngredients.filter((specificIngredient) =>
                searchIngredients.some((searchIngredient) =>
                    specificIngredient.includes(searchIngredient.toLowerCase())
                )
            );

            if (matchedIngredients.length > maxMatchCount) {
                maxMatchCount = matchedIngredients.length;
                mostMatchedMeal = foodItem;
            }
        }
    });

    console.log('Meal with the most matched ingredients:', mostMatchedMeal);
    if (mostMatchedMeal === null) {
        res.send({ error: 'No meal found' });
    } else {
        res.send(mostMatchedMeal);
    }
};



export default router;
