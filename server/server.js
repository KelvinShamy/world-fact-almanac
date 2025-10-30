const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv').config();
const models = require('./models/mongoModels');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', express.static('src'));
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../src/index.html')));

// TESTING
app.get('/queryTest', (req, res) => {
    let queryParameters = null;
    console.log("typeof req.query.key1:", typeof req.query.key1);
    console.log("typeof req.query.key2:", typeof req.query.key2);

    if (req.query) queryParameters = req.query;
    res.status(200).json({
        text: "queryTest received",
        queryParameters,
    })
});

app.get('/paramsTest/:id', (req, res) => {
    console.log("req.params", req.params);
    console.log("typeof req.params", typeof req.params);
    
    const { id } = req.params;
    console.log("id", id);

    res.status(200).json({
        test: "paramsTest received",
        id,
    })
});

app.post('/bodyTest', (req, res) => {
    console.log(req.body);

    res.status(200).json({
        test: "bodyTest received",
    })
});

// Test req.cookies w/ cookie parser package (?)

// END TESTING

app.post('/', async (req, res) => {
    const toAdd = new models.Fav(req.body);
    await toAdd.save();
    res.status(200).json(`${req.body.country} has been added to your list, great choice!`);
});

app.get('/favorites', async (req, res) => {
    console.log('request to get favorites received');
    const favorites = await models.Fav.find({});
    res.status(200).json(favorites);
})

app.delete('/favorites', async (req, res) => {
    const deletion = await models.Fav.deleteOne(req.body);
    res.status(200).json('DELETE request registered');
})

app.put('/favorites', async (req, res) => {
    const country = await models.Fav.find(req.body);
    const update = await models.Fav.updateOne( req.body, { visited: !country[0].visited } );
    res.status(200).json('PUT request registered');
})




mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to Mongo DB.'))
    .then(() => {
        app.listen(PORT, () => {
            console.log((`Server listening on port: ${PORT}...`))
        })
    })
    .catch(err => console.log(err));
