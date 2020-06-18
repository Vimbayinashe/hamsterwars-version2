import React from 'react';

const HamsterCard = ({ hamster, matchup }) => {
    
    let imageUrl = '/assets/'

    return(
        <div className="hamster-card">
            <div className="hamster-image">
                <img src={imageUrl + hamster.imgName} alt="hamster"/>
            </div>
            <div className="hamster-facts">
                <div><span>Name: </span> { hamster.name } </div>
                <div><span>Age: </span> { hamster.age } years </div>
                <div><span>Favourite food: </span> { hamster.favFood } </div>
                <div><span>Loves: </span> { hamster.loves } </div>
                {
                    matchup ?
                    <div className="matchup-info">
                        {`${hamster.name} has played ${hamster.games + 1} games.`}
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}

export default HamsterCard;
