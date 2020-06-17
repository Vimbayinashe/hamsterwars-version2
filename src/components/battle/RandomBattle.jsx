import React, { useEffect, useState } from 'react';

const Battle = ({ props: { competitors, setCompetitors, outcome, setOutcome, postMatchResult }}) => {

    const [winner, setWinner] = useState('');
    console.log('competitors', competitors);

    
    useEffect(() => {
        
        // Get new competitors
        setCompetitors(null);
        console.log('competitors', competitors);

        let url = '/api/hamsters/random/2';

        let fetchRandomHamsters = async () => {
            
            try {
                const response = await fetch(url);
                if( response.status !== 200 ) {
                    console.log('Could not fetch competitors. Status: ' + response.status);
                    // todo: kanske visa felmeddelande för användaren
                }
                const json = await response.json();
                console.log('RandomBattle.useEffect json.hamsters=', json.hamsters);
                setCompetitors(json.hamsters)
                
                
                return json

            } catch (err) {
                console.error(err);
            }
        }
        
        console.log('Fetching 2 Random hamsters!')
        fetchRandomHamsters();

    }, [])      // setCompetitors


    let loser = winner && competitors
        ? competitors.find(hamster =>(hamster.id !== winner)) 
        : '';


    useEffect(()=> {

        if(winner) {
            
            let result = {
                win: winner,
                defeat: loser.id
            };

            console.log('Posting Random Match Battle!')
            postMatchResult(result);
        }
        
    }, [winner, loser, postMatchResult])


    console.log('RandomBattle render competitors:', competitors);
        
    return(
        <section>
            <h2>Hamster Battle</h2>
            <p>Click on the cutest hamster!</p>
            <div className="competing-hamster">
                {
                    competitors ?
                    competitors.map(c => (
                        <img key={c.id} src={'/assets/' + c.imgName}     
                            alt="competing hamster"
                            onClick={ ()=> setWinner(Number(c.id)) } />
                    )) 
                    : <div> Loading...</div>
                }
            </div>

        </section>
    )
}

export default Battle;

