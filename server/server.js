const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const models = require('./models/mongoModels');

const MONGO_URI = "mongodb+srv://kiosk:1234@cluster0.fadk0p7.mongodb.net/solo?retryWrites=true&w=majority"
const PORT = 3500; 

// const apiRouter = require();  IS THIS STEP NECESSARY?

// this is where to put: app.use, app.get, app.post, etc 

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


// models === { Fav: Model { favorites } }

// const doc = new Person({
//     name: 'Will Riker',
//     rank: 'Commander'
//   });
//   // Inserts a new document with `name = 'Will Riker'` and
//   // `rank = 'Commander'`
//   await doc.save();
  
//   const person = await Person.findOne();
//   person.name; // 'Will Riker'






mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to Mongo DB.'))
    .then(() => {
        app.listen(PORT, () => {
            console.log((`Server listening on port: ${PORT}...`))
        })
    })
    .catch(err => console.log(err));


    // app.listen(PORT, () => {
    //     console.log((`Server listening on port: ${PORT}...`))
    // })