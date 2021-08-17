const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const morgan = require('morgan');

const productRoute = require('./api/routes/product');

const app = express();
try {
mongoose.connect(process.env.MONGO_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('Mongoose is connected'));
} catch (err) {
    console.log('Could not connected');
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/products', productRoute);

module.exports = app;