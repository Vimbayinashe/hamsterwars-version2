import React, { useState, useEffect } from 'react';

const Slideshow = () => {

const [image, setImage] = useState('/assets/hamster-32.jpg');

useEffect(() => {
    
    let random = Math.ceil(Math.random() *40);
    setImage(`/assets/hamster-${random}.jpg`)

}, [])


    return (
        <div className="home-picture">
            <img alt="a hamster" className="hamster-slideshow" src={image} />
        </div>
    )
}

export default Slideshow;

// some random fetch in a function
// fetch -> array of five images.