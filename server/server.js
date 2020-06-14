const express = require('express');
const { auth } = require('./auth');
require('dotenv/config');
const path = require('path');


const app = express();


// servar React-frontend senare.
app.use( express.static(__dirname + '/../build'));

// servar bilderna via en static route
app.use('/assets', express.static(__dirname + 'public/assets'))  


// convert post.body -> json
app.use(express.json());


// Authorization middleware
app.use(auth);


// Routes
const hamstersRoute = require('./routes/hamsters');
const chartsRoute = require('./routes/charts');
const gamesRoute = require('./routes/games');
const statsRoute = require('./routes/stats');
const imagesRoute = require('./routes/images');
// const { dirname } = require('path');

app.use('/api/hamsters', hamstersRoute);
app.use('/api/charts', chartsRoute);
app.use('/api/games', gamesRoute);
app.use('/api/stats', statsRoute);
app.use('/api/images', imagesRoute);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Server running on port ', port);
})