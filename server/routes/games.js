const { Router } = require('express');
const { auth, db } = require('./../firebase');
const { v4: uuidv4 } = require('uuid');

const router = new Router();


// hämta en array med samtliga matchobject som hållits
router.get('/', async (req, res) => {
    
    try {

        let games = [];
        
        let snapShot = await db
        .collection('games')
        .get();
        
        snapShot.forEach(doc => {
            games.push(doc.data().game)
        })
        
        res.send({ games: games })
    }
    catch(err) {
        console.error(err);
        res.status(400).send({ msg: err })
    }

})


// spara en match
router.post('/', async (req, res) => {
    
    try {

        let hamsters = [];
        
        // hämta data från firestore 'hamsters' collection
        let snapShot = await db
        .collection('hamsters')
        .get();

        snapShot.forEach(hamster => {
            hamsters.push(hamster.data())
        })

        // hämta vinnande hamster i ett objekt
        let winner = hamsters.filter( (hamster) => {
            return hamster.hamster.id == req.body.win
        })

        // hämta förlorande hamster
        let loser = hamsters.filter( (hamster) => {
            return hamster.hamster.id == req.body.defeat
        })

        // hämta hamster objekt ur object och array
        winner = winner[0].hamster;
        loser = loser[0].hamster;

        // uppdatera hamster objekt
        winner.wins++
        winner.games++
        loser.defeats++
        loser.games++

      
        // uppdatera vinnande hamster i firestore
        let message = "";

        db
        .collection('hamsters')
        .doc(JSON.stringify(winner.id))        
        .update({ hamster: winner })
        .then(message += `Hamster ${winner.id} updated `)
        .catch(err => console.error(err))
        
        // uppdatera vinnande hamster i firestore
        db
        .collection('hamsters')
        .doc(JSON.stringify(loser.id))        
        .update({ hamster: loser })
        .then(message += `& Hamster ${loser.id} updated `)
        .catch(err => console.error(err))
        
        
        // generate match uuid
        let matchId = uuidv4();        
        
        let game = {
            id: matchId,
            timeStamp: new Date(),
            contestants: [ 
                { hamsterId: req.body.win },
                { hamsterId: req.body.defeat }
             ],
            winner: { hamsterId: req.body.win }
        }
        
        // skicka matchen till firestore
        db
        .collection('games')
        .doc(matchId)
        .set({ game })
        .catch(err => { throw err } )
        
        // skicka svar
        res.status(201).send({ 
            updated: message, 
            game: `Game with id: ${matchId} created.` 
        })

    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err })        
    }

})

/**
 * exempel req.body
*   {
        "win" : 38,
        "defeat" : 15
    }
 */

//  POST => http://localhost:3000/games


module.exports = router;