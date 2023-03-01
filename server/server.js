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

// app.get('/test', (req, res) => {
//     res.send('Hello from our Express server');
// });

app.post('/', async (req, res) => {
    // console.log('req.body: ', req.body);
    // console.log(models);
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
