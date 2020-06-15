import React, { useState, useEffect } from 'react';
import HamsterCard from './HamsterCard';
import './Hamster.css';

const Hamsters = () => {

    const [hamsters, setHamsters] = useState([]);
    
    let JSXList = hamsters ?  hamsters.map(hamster => (
        <HamsterCard key={hamster.id} hamster={hamster} />
    )) : "" ;

    
    useEffect(() => {
        let url = '/api/hamsters';

        let fetchHamsters = async () => {
        
            try {
                const response = await fetch(url);
                const json = await response.json();

                return setHamsters(json.hamsters);
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchHamsters();

    }, [])


    return (
        <section>
            <h2>Hamsters</h2>
            <h3>Select two hamsters for a customized battle</h3>
            <section className="show-hamsters">
                { JSXList }
            </section>
        </section>
    )
}

export default Hamsters;