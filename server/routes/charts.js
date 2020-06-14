const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

// hämta  en array med top 5 mest vinnande hamsterobject
router.get('/top', async (req, res) => {

    try {

        let top = [];

        let snapShot = await db
        .collection('hamsters')
        .orderBy("hamster.wins", "desc")
        .orderBy("hamster.games", "asc")    //*
        // .orderBy("hamster.names", "asc")    // 3 fields => top = []
        .limit(5)
        .get();

        //* ordered by games because fewer games => higher rate of wins/game
        
        snapShot.forEach(doc => {
            top.push(doc.data())
        })
    
        res.send({ hamsters: top })
        
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: err })   
    }

})


// hämta  en array med top 5 mest fölorande hamsterobject
router.get('/bottom', async (req, res) => {

    try {

        let bottom = [];

        let snapShot = await db
        .collection('hamsters')
        .orderBy("hamster.defeats", "desc")
        .orderBy("hamster.games", "asc")    //*
        .limit(5)
        .get();

        console.log(snapShot.size);
        
        //* ordered by games because fewer games => higher rate of loss/game
        
        snapShot.forEach(doc => {
            bottom.push(doc.data())
        })
    
        res.send({ hamsters: bottom })
        
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: err })   
    }

})



module.exports = router;