import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Battle = () => {

    const [hamsters, setHamsters] = useState([]);

    const params = useParams();
    const { id1 } = useParams();
    const { id2 } = useParams();

    console.log('params: ', params);
    console.log('id1: ', id1);
    console.log('id2: ', id2);


    useEffect(() => {
        let url = '/api/hamsters/';

        setHamsters(fetchAllHamsters);
        console.log(hamsters);
        

    }, [setHamsters, hamsters])

    return(
        <section>
            {/* params: { params } */}
            id1: { id1 }
            id2: { id2 }
        </section>
    )
}

export default Battle;


let fetchAllHamsters = async () => {
         
    try {
        const response = await fetch('/api/hamsters/');
        const json = await response.json();

        return (json.hamsters);
        
    } catch (error) {
        console.error(error);
    }
}