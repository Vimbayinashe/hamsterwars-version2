const path = require('path');


// Authorization middleware
const auth = (req, res, next) => {

    let APIKey = process.env.KEY;

    if (req.method !== "GET") {

        if(APIKey === req.headers['authorization']) {
            // console.log(APIKey);
            next();
        } else {
            console.log('submitted: ' + req.headers['authorization']);
            res.status(403).send({ msg: 'Please enter correct API Key.'})
        }

    } 
    else {
        next()
    }

    // let root = path.join(__dirname, 'public')

    // if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
    //     res.sendFile('index.html', { root })
    //   } else next()
}

module.exports = { auth };