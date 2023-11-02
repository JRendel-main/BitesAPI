import express from 'express';
import bodyParser from 'body-parser';
import foodRoute from './routes/food.js';

const app = express();
const PORT = 3000;

//CORS Security for API Access
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/food', foodRoute);
// add welcome page route
app.get('/', (req, res) => {
  // add intruction to use API
  res.send('Welcome to the Food API! Use endpoints to filter food data.');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

export default app;