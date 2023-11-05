import express from 'express';

// Import the food model
import { foodList, foodData, foodRandom, foodCount, findIngredients, getImage } from '../controllers/food.js';

// Create a new instance of express router
const router = express.Router();

// Create a GET route for /food
router.get('/', foodList);
router.get('/search/:id', foodData);
router.get('/get/random=:count', foodRandom);
router.get('/get/count', foodCount);
router.get('/find/ingredients=:ingredients', findIngredients);
router.get('/get/image/:id', getImage);
    

export default router;