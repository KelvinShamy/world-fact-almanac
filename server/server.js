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

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../src/index.html')));

app.post('/', async (req, res) => {
    const toAdd = new models.Fav(req.body);
    await toAdd.save();
    res.status(201).json(req.body.country);
});

app.get('/favorites', async (req, res) => {
    console.log('request to get favorites received');
    const favorites = await models.Fav.find({});
    res.status(200).json(favorites);
});

app.delete('/favorites', async (req, res) => {
    await models.Fav.deleteOne(req.body);
    res.sendStatus(204);
});

app.put('/favorites', async (req, res) => {
    const country = await models.Fav.find(req.body);
    await models.Fav.updateOne(req.body, { visited: !country[0].visited });
    res.sendStatus(204);
});




mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to Mongo DB.'))
    .then(() => {
        app.listen(PORT, () => {
            console.log((`Server listening on port: ${PORT}...`))
        })
    })
    .catch(err => console.log(err));
