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

        </section>
    )
}

export default Battle;