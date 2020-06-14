const { Router } = require('express');
const { auth, db } = require('./../firebase');
const fs = require('fs');

const router = new Router();


// hämta en array med samtliga hamsterobject.
router.get('/', async (req, res) => {

    let hamsters = [];

    let snapShot = await db
        .collection('hamsters')
        .get();
    
    snapShot.forEach(doc => {
        hamsters.push(doc.data().hamster)
    })

    res.send({ hamsters: hamsters })

})

// http://localhost:3000/hamsters/



// hämta ett hamsterobjekt
router.get('/:id', async (req, res) => {

    try {
        
        // hämta ett slumpat hamsterobjekt 
        if (req.path == "/random" || req.path == "/random/") {

            let hamsters = [];
            
            let snapShot = await db
            .collection('hamsters')
            .get();
            
            snapShot.forEach(hamster => {
                hamsters.push(hamster.data())
            })
            
            let random = Math.floor(Math.random() * hamsters.length);
            let randomHamster = hamsters[random];
            
            console.log(randomHamster.hamster.id);

            res.status(200).send({ hamster: randomHamster })

        } else {

            // hämta ett hamsterobject med efterfrågat id
          
            let snapShot = await db
            .collection('hamsters')
            .doc(req.params.id)
            .get();
                        
            // kolla att hamsterobjekt med vald id finns
            if (snapShot.data()) {
                
                // hämta hamsters uppgifter
                let hamster = snapShot.data().hamster;
                // console.log(hamster);
                res.status(200).send({ hamster: hamster })
                
            } else {
                res.status(404).send( { msg: `This hamster does not exist in our database.`})
            }

        }
        
    }
    catch (err) {
        console.error(err);
        res.status(400).send({ msg: err })        
    }

})

// GET => http://localhost:3000/hamsters/5 or /random



// Updaterar ett hamsterobjects egenskaper: wins, defeats och +1 på games.

router.put('/:id/result', async (req, res) => {

    try {

        let id = req.params.id;
        console.log(id);
        console.log(typeof(id))
        console.log(req.body);
        // res.send({ msg: req.params.id })
        
        let snapShot = await db
        .collection('hamsters')
        .doc(req.params.id)
        .get();
        
        // hämta hamsters uppgifter
        let hamster = snapShot.data().hamster;
        console.log(hamster);
        

        // kolla om data är ogiltig
        if (req.body.win === req.body.defeat) {
            throw err = "Win and defeat cannot be the same."
        }
         
        // uppdatera hamsterobjekts egenskaper
        // det tas emot endast Boolean värden (See note below)
        if (req.body.win == true) {
            hamster.wins++            
            hamster.games++
        }  
        else if (req.body.defeat == true) {
            hamster.defeats++
            hamster.games++
        } else {
            throw err = "Invalid input"
        }
        
        // uppdatera hamsterobjektet i firestore
        db
        .collection('hamsters')
        .doc(JSON.stringify(hamster.id))        //snapShot.id & id did NOT work
        .update({ hamster })
        // .set(hamster)        //did not work after first update
        .catch(err => console.error(err))
        
        res.status(200).send({ 
            msg: `Hamster ${id} updated`
        })

    }

    catch (err) {
        console.error(err);
        res.status(400).send({ msg: err })        
    }


})

/** Exempel req.body formatet:
 * 
    {
        "win" : true,
        "defeat" : false
    }
        OR
    {
        "win" : 1,
        "defeat" : 0
    }
*   
*   Jag har använt Boolean värden för att ta emot säkrare input i backend 
*
 */

// http://localhost:3000/hamsters/11/result



// hämta två eller flera slumpade hamstrar
router.get('/random/:amount', async (req, res) => {

    try {
        
        let hamsters = [];
        
        let snapShot = await db
        .collection('hamsters')
        .get();
        
        snapShot.forEach(doc => {
            hamsters.push(doc.data().hamster)
        })
        
        let randomHamsters = [];
        
        // hämta :amount slumpade hamstrar
        for (let i=0; i < req.params.amount; i++) {
            
            let random = Math.floor(Math.random() * hamsters.length);

            let anyHamster = hamsters.splice(random, 1);

            randomHamsters.push(anyHamster[0]);
    
        }
        
        res.send({ hamsters: randomHamsters })
        
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: err })   
    }
})


// skicka och spara data.json i firestore
router.post('/create-database', async (req, res) => {

    try {

        fs.readFile('./data.json', 'utf8', (err, data) => {
            if(err) throw err;

            let hamsters = JSON.parse(data);
            console.log(typeof(data));
            console.log(typeof(hamsters));

            // uppdatera firestore
            hamsters.forEach(hamster => {
                db.collection('hamsters').doc(JSON.stringify(hamster.id)).set({ hamster })
                console.log(typeof(hamster));
                console.log(hamster);
            });

            res.send({ array: hamsters})
        })
        
    }
    catch (err) {
        console.error(err);
        res.status(400).send({ msg: err })
    }

})

// POST => http://localhost:3000/hamsters/create-database


// ladda upp en ny hamster objekt
router.post('/new', async (req, res) => {

    try {

        // kolla hur många hamstrar redan finns -> välja id
        let snapShot = await db
            .collection('hamsters')
            .get()

        let length = snapShot.size;
        
        
        // skapa ny hamstar objekt
        let id = length + 1;
        
        let hamster = req.body;
        hamster.id = id;
        hamster.wins = hamster.defeats = hamster.games = 0;
        
        // skicka objekt till firestore
        db
        .collection('hamsters')
        .doc(JSON.stringify(id))
        .set({ hamster })
        .then( res.status(201).send({ msg: `New hamster ${id} created!` }) ) 
    
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: err })
    }

})

/** Exempel data format
 * 
 * {
    "loves": "Running that wheeeeeeeeeeeeeeeel!",
    "age": 5,
    "favFood": "persika",
    "name": "Tulau",
    "imgName": "hamster-Y.jpg"
}
 */



module.exports = router;