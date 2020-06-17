import React from 'react';
// import HamsterCard from '../hamsters/HamsterCard';
// {/* <HamsterCard hamster={outcome.winner} /> */}


const Matchup = ({ outcome }) => {

    console.log('outcome in Matchup: ', outcome);
    


    return (
        <section>
            {
                outcome.winner ? 
                <><h2>The Winner!</h2>
                <div className="competing-hamster">
                    <img src={`/assets/hamster-${outcome.winner}.jpg`} alt=""/>
                </div></>
                : <div className="error-message">
                    There is no previous match result to show.
                </div>
            }
        </section>
    )
}

export default Matchup; 

