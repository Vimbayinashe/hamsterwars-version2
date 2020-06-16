import React, { useEffect, useState } from 'react';
// import { text } from 'express';

const Battle = ({ props: { competitors, setCompetitors, outcome, setOutcome }}) => {

    const [reply, setReply] = useState('');
    const [reply2, setReply2] = useState('');

    // console.log(reply);
    console.log('post: ', reply2);

    useEffect(() => {

        let url = '/api/hamsters/random/2';

        let fetchRandomHamsters = async () => {
            
            try {
                const response = await fetch(url);
                const json = await response.json();
                
                return setCompetitors(json.hamsters)

            } catch (err) {
                console.error(err);
            }
        }
        
        fetchRandomHamsters();

    }, [setCompetitors])


    useEffect(()=> {

        let matches = async () => {

            let url = '/api/games';
                    
            try {
                const response = await fetch(url);
                const json = response.json();
        
                return setReply(json);
                
            } catch (err) {
                console.error(err);
            }
        }
        

        matches();
        
    }, [outcome])


    function handleClick(winner) {

        let loser = winner 
            ? competitors.find(hamster =>(hamster.id !== winner)) 
            : '';

        setOutcome({
            win: Number(winner),
            defeat: loser.id
        })

        setReply2(postMatchResult(outcome));
        

        return outcome;
    }
    

    return(
        <section>
            <h2>Hamster Battle</h2>
            <p>Click on the cutest hamster!</p>
            <div className="competing-hamster">
                {
                    competitors.map(c => (
                        <img key={c.id} src={'/assets/' + c.imgName}     
                            alt="competing hamster"
                            // onClick={ ()=> setWinner(Number(c.id)) } />
                            onClick={ ()=> handleClick(c.id) } />
                    )) 

                }
            </div>

        </section>
    )
}

export default Battle;

let postMatchResult = async (data) => {

    let url = '/api/games';
            
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'hamster40'
            },
            body: JSON.stringify(data)
        });

        const json = response.json();

        console.log(json);
        
        return json;

                        

    } catch (err) {
        console.error(err);
    }
}