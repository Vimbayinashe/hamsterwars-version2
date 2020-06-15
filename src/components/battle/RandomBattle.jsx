import React, { useEffect } from 'react';
// import { text } from 'express';

const Battle = ({ competitors, setCompetitors }) => {

    useEffect(() => {

        let url = '/api/hamsters/random/2';
        console.log(url);

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
    

    return(
        <section>
            <h2>Hamster Battle</h2>
            <p>Click on the cutest hamster!</p>
            <div className="competing-hamster">
                {
                    competitors.map(c => (
                        <img key={c.id} src={'/assets/' + c.imgName} alt="competing hamster"/>
                    )) 

                }
            </div>

        </section>
    )
}

export default Battle;