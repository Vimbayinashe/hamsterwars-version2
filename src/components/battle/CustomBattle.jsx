import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Battle = ({ setOutcome, postMatchResult }) => {

    const [fetchError, setFetchError] = useState(false);
    const [hamstersExist, setHamstersExist] = useState(false);
    const [hamsters, setHamsters] = useState([]);
    const [winner, setWinner] = useState('');
    const { id1 } = useParams();
    const { id2 } = useParams();


    useEffect(() => {

        let url = '/api/hamsters/';

        let fetchAllHamsters = async () => {
         
            try {
                const response = await fetch(url);
                if( response.status !== 200 ) {
                    console.log('Could not fetch Custom - all hamsters. Status: ' + response.status);
                    setFetchError(true);
                }
                const json = await response.json();

                if (json.hamsters) {
                    setHamsters(json.hamsters);
                    setFetchError(false);
                }

                return json.hamsters;
                
            } catch (error) {
                console.error(error);
            }
        }
        
        console.log('Fetching ALL Hamsters - Custom Battle!')
        fetchAllHamsters();

    }, [])  
    

    useEffect(() => {

        if (hamsters) {
            let id1Exists = (hamsters.some(hamster => hamster.id === Number(id1) ));
            let id2Exists = (hamsters.some(hamster => hamster.id === Number(id2) ));

            (id1Exists && id2Exists) ? setHamstersExist(true) : setHamstersExist(false);
        }

        // work around (limit exceeded)
        setHamstersExist(true);

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
        }
        
    }, [loser, winner, postMatchResult, setOutcome])
    

    return(
        <section>
            <h2>Hamster Battle</h2>
            <p>Click on the cutest hamster!</p>
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
                            : 'Please select valid hamsters between ....'
                        }
                    </div>
                }
            </div>
        </section>
    )
}

export default Battle;


