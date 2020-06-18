import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Battle = ({ fetchError, hamsters, setOutcome, postMatchResult }) => {

    const [hamstersExist, setHamstersExist] = useState(false);
    const [winner, setWinner] = useState('');
    const { id1, id2 } = useParams();
    const history = useHistory();

    console.log('hamsters props ', hamsters);
    

    useEffect(() => {

        if (hamsters) {
            let id1Exists = (hamsters.some(hamster => hamster.id === Number(id1) ));
            let id2Exists = (hamsters.some(hamster => hamster.id === Number(id2) ));

            (id1Exists && id2Exists) ? setHamstersExist(true) : setHamstersExist(false);
        }

        // work around (limit exceeded)
        // setHamstersExist(true);

    }, [id1, id2, hamsters, setHamstersExist])


    let loser = (winner === Number(id1) ) ? Number(id2) : Number(id1);
    
    useEffect(()=> {
        
        if(winner) {

            let result = {
                win: winner,
                defeat: loser
            };

            console.log('Posting Custom Match Battle!')
            postMatchResult(result);
            setOutcome(result);
            renderRedirect();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loser, winner, postMatchResult, setOutcome])

    
    let renderRedirect = () => {
        return history.push(`/matchup/${id1}/${id2}`);
    }


    return(
        <section>
            <h2>Hamster Battle</h2>
            <h3>Click on the cutest hamster!</h3>
            <div className="competing-hamster">
                {
                    hamstersExist
                    ? <><img src={`/assets/hamster-${id1}.jpg`}     
                        alt="competing hamster"
                        onClick={ ()=> setWinner(Number(id1)) } />
                        <img src={`/assets/hamster-${id2}.jpg`}     
                        alt="competing hamster"
                        onClick={ ()=> setWinner(Number(id2)) } /></>

                    : <div className="error-message"> 
                        { 
                            fetchError 
                            ? 'We are facing challenges loading hamsters' 
                            : 'Please select valid hamsters'
                        }
                    </div>
                }
            </div>
        </section>
    )
}

export default Battle;

