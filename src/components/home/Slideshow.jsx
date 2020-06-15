import React, { useState, useEffect } from 'react';

const Slideshow = () => {

const [image, setImage] = useState('http://localhost:8000/assets/hamster-32.jpg');

useEffect(() => {
    
    let selectedImage = setInterval(() => {
        let random = Math.ceil(Math.random() *40);
        setImage(`http://localhost:8000/assets/hamster-${random}.jpg`)

    },8000)
    
    return () => clearInterval(selectedImage);

}, [])


    return (
        <article>
            <img alt="a hamster" className="hamster-slideshow" src={image} />
        </article>
    )
}

export default Slideshow;

// some random fetch in a function
// fetch -> array of five images.