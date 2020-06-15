import React from 'react';

const HamsterCard = ({ hamster }) => {
    console.log(hamster);
    
    let imageUrl = '/assets/'
    return(
        <div className="hamster-card">
            <img src={imageUrl + hamster.imgName} alt="hamster"/>
            <div className="hamster-facts">
                <div> Name:  { hamster.name } </div>
                <div> Age: { hamster.age } </div>
                <div> Favourite food { hamster.favFood } </div>
                <div> Loves: { hamster.loves } </div>
            </div>
            <button> Select </button>
        </div>
    )
}

export default HamsterCard;