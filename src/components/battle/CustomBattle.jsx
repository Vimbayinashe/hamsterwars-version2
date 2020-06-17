import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Battle = ({ outcome, setOutcome, postMatchResult }) => {

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
                const json = await response.json();

                console.log('Fetching ALL Hamsters - Custom Battle!')
        
                return setHamsters(json.hamsters)
                
            } catch (error) {
                console.error(error);
            }
        }

        // work around (limit exceeded)
        // fetchAllHamsters();

    }, [])  // setHamsters hamsters
    

    useEffect(() => {

        if (hamsters) {
            let id1Exists = (hamsters.some(hamster => hamster.id === Number(id1) ));
            let id2Exists = (hamsters.some(hamster => hamster.id === Number(id2) ));

            (id1Exists && id2Exists) ? setHamstersExist(true) : setHamstersExist(false);
        }

        // work around (limit exceeded)
        setHamstersExist(true);

    }, [id1, id2, hamsters, setHamstersExist])


    let loser = (winner === id1) ? Number(id2) : Number(id1);
    
    useEffect(()=> {

        let result = {
            win: winner,
            defeat: loser
        };

        console.log('Posting Custom Match Battle!')
        postMatchResult(result);
        
    }, [winner, loser, postMatchResult])
    

    return(
        <section>
            <h2>Hamster Battle</h2>
            <p>Click on the cutest hamster!</p>
            <div className="competing-hamster">
                {
                    hamstersExist ?
                        <><img src={`/assets/hamster-${id1}.jpg`}     
                            alt="competing hamster"
                            onClick={ ()=> setWinner(Number(id1)) } />
                        <img src={`/assets/hamster-${id2}.jpg`}     
                            alt="competing hamster"
                            onClick={ ()=> setWinner(Number(id2)) } /></>
                        : <div className="error-message"> 
                            Please select valid hamsters between ....
                          </div>
                }
            </div>
        </section>
    )
}

export default Battle;


