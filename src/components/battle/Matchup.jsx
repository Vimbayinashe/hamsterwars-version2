import React from 'react';
import HamsterCard from '../hamsters/HamsterCard';


const Matchup = ({ fetchError, hamsters, outcome }) => {
    
    let winner = hamsters.filter(hamster => hamster.id === outcome.win);
   

    return (
        <section>
            {
                outcome.win ? 
                <><h2>The Winner!</h2>
                <div className="matchup-hamster">
                    {
                        fetchError ?
                        <><p>This cute hamster won the latest battle:</p>
                        <img src={`/assets/hamster-${outcome.win}.jpg`} alt=""/></>
                        : <HamsterCard hamster={winner[0]} matchup={true} />
                    }
                </div></>
                : <div className="matchup error-message">
                    There is no previous match result to show.
                </div>
            }
        </section>
    )
}

export default Matchup; 

