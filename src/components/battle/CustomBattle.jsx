import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Battle = ({ props: { outcome, setOutcome, postMatchResult }}) => {

    const [hamstersExist, setHamstersExist] = useState(false);
    const [hamsters, setHamsters] = useState('');
    const [winner, setWinner] = useState('');


    const { id1 } = useParams();
    const { id2 } = useParams();


    useEffect(() => {

        let url = '/api/hamsters/';

        let fetchAllHamsters = async () => {
         
            try {
                const response = await fetch(url);
                const json = await response.json();
        
                return setHamsters(json.hamsters)
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchAllHamsters();

    }, [setHamsters, hamsters])


    useEffect(() => {

        let id1Exists = (hamsters.some(hamster => hamster.id === Number(id1) ));
        let id2Exists = (hamsters.some(hamster => hamster.id === Number(id2) ));

        (id1Exists && id2Exists) ? setHamstersExist(true) : setHamstersExist(false);


    }, [id1, id2, hamsters, setHamstersExist])


    useEffect(()=> {

        let loser = (winner === id1) ? Number(id2) : Number(id1);
        
        let result = {
            win: winner,
            defeat: loser
        };

        postMatchResult(result);
        
    }, [id1, id2, winner, postMatchResult])


    return(
        <section>
            <h2>Hamster Battle</h2>
            <p>Click on the cutest hamster!</p>
            <div className="competing-hamster">
                {
                    hamstersExist ?
                        <><img src={'/assets/' + id1}     
                            alt="competing hamster"
                            onClick={ ()=> setWinner(Number(id1)) } />
                        <img src={'/assets/' + id2}     
                            alt="competing hamster"
                            onClick={ ()=> setWinner(Number(id2)) } /></>
                        : 'Please select valid hamsters between ....'
                }
            </div>
        </section>
    )
}

export default Battle;


