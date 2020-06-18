import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Battle = ({ props: { competitors, setCompetitors, setOutcome, postMatchResult }}) => {

    const [fetchError, setFetchError] = useState(false);
    const [winner, setWinner] = useState('');
    const history = useHistory();

    console.log('Random Battle competitors', competitors);

    
    useEffect(() => {

        let url = '/api/hamsters/random/2';

        let fetchRandomHamsters = async () => {
            
            try {
                const response = await fetch(url);
                if( response.status !== 200 ) {
                    console.log('Could not fetch competitors. Status: ' + response.status);
                    setFetchError(true);
                }
                const json = await response.json();

                if (json.hamsters) {
                    setCompetitors(json.hamsters);
                    setFetchError(false);
                }
                
                return json.hamsters;

            } catch (err) {
                console.error(err);
            }
        }
        
        console.log('Fetching 2 Random hamsters!')
        fetchRandomHamsters();
        
    }, [setCompetitors])      


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
            setOutcome(result);
            renderRedirect();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winner, loser, postMatchResult, setOutcome])


    let renderRedirect = () => {
        return history.push(`/matchup/${winner}/${loser.id}`);
    }

        
    return(
        <section>
            <h2>Hamster Battle</h2>
            <h3>Click on the cutest hamster!</h3>
            <div className="competing-hamster">
                {
                    competitors ?
                    competitors.map(c => (
                        <img key={c.id} src={'/assets/' + c.imgName}     
                            alt="competing hamster"
                            onClick={ ()=> setWinner(Number(c.id)) } />
                    )) 
                    : <div> Hamsters Loading...</div>
                }
            </div>
            <div className="error-message"> 
                {
                    fetchError ? 'We are facing challenges loading hamsters' : ''
                }
            </div>

        </section>
    )
}

export default Battle;

