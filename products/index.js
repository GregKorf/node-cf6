const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const cors = require('cors');

// give licence to specific server or every server with origin: "*" to connect to my back end
app.use(cors({
    // origin: "*"
    origin: ['http://localhost:8000', 'http://www.aueb.gr']
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/', express.static('files')); // open a index html in folder files

mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => { console.log('Connection to MongoDB established')},
        err => { console.log('Failed to connect to MongoDB')}
    );

const user = require('./routes/user.routes');
const userProduct = require('./routes/user.product.routes');
const product = require('./routes/product.routes')

app.use('/api/user', user);    
// app.use('/api/product', product);

app.use('/api/user-product', userProduct);

app.use('/api/products', product);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument.options)
)

module.exports = app