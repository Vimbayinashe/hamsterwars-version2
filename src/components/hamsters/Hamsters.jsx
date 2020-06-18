import React from 'react';
import HamsterCard from './HamsterCard';
import './Hamster.css';

const Hamsters = ({ hamsters }) => {
    
    let JSXList = hamsters.length > 0 ?  hamsters.map(hamster => (
        <HamsterCard key={hamster.id} hamster={hamster} matchup={false} />
    )) : "" ;


    return (
        <section>
            <h2>Hamsters</h2>
            <section className="show-hamsters">
                { JSXList }
            </section>
        </section>
    )
}

export default Hamsters;