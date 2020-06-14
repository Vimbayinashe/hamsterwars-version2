const { Router } = require('express');
const { auth, db, storage, bucket, gcBucket } = require('./../firebase');
const fs = require('fs');


const router = new Router();

// skicka bilder to firebase storage    
router.post('/upload-all', async (req, res) => {
    console.log('Received POST /upload request');
    
    try {

        let filePath = (__dirname + '/../public/assets');

        fs.readdir(filePath, function (err, files) {

            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 

            files.forEach(function (file) { // typeof(file) = string
                console.log(file); 

                gcBucket
                .upload(__dirname + '/../public/assets/' + file, {
                    destination: 'assets/' + file
                })
                
            });

        });

        res.status(201).send({ msg: "Pictures Uploaded" })

    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: err })  
    }

})


router.get('/download-all', async (req, res) => {

    try {
        let id = req.params.id;
        console.log('GET picture: ', id);
        
        let image = await gcBucket.getFiles()
 
        image[0].forEach(image => {
            console.log(image.name);
            gcBucket
                .file(image.name)
                .download({destination: image.name})
        })

        res.status(201).send({ msg: 'Hamster images successfully downloaded.'})
        
    } catch (err) {
        console.error(err);
        res.status(400).send({ msg: err })  
    }
    
})


module.exports = router;


/** Downloading one image
 * 
 *  let image =  await gcBucket
    .file('assets/hamster-3.jpg')
    .download({destination: 'assets/hamster-ne88w.jpg'})
 */
