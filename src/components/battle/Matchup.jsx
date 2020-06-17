import React from 'react';
import HamsterCard from '../hamsters/HamsterCard';


const Matchup = ({ fetchError, hamsters, outcome }) => {

    if(!fetchError) console.log('hamsters in Matchup: ', hamsters);
    
    let winner = hamsters.filter(hamster => hamster.id === outcome.win)
    console.log('Winner in Matchup: ', winner);
    

    return (
        <section>
            {
                outcome.win ? 
                <><h2>The Winner!</h2>
                <div className="competing-hamster">
                    {
                        fetchError ?
                        <><p>This cute hamster won the latest battle:</p>
                        <img src={`/assets/hamster-${outcome.win}.jpg`} alt=""/></>
                        : <HamsterCard hamster={winner} matchup={true} />
                    }
                </div></>
                : <div className="error-message">
                    There is no previous match result to show.
                </div>
            }
        </section>
    )
}

export default Matchup; 

