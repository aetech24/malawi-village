import dotenv from 'dotenv';
import express from 'express'
const PORT = 5000 || process.env.PORT
import expressLayouts from 'express-ejs-layouts';
import router from './server/main.js'
const app = express();

import { products } from './data/products.js';

//set EJS as the tempalate engine
app.set('view engine', 'ejs')

//use express ejs layouts
app.use(expressLayouts)

//let the layout file optional 
app.set('layout', './layouts/main')

//serving static files
app.use(express.static('public'))

//app route
app.use('/', router)


app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
})