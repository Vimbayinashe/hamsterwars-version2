import React from 'react';
import { useParams } from 'react-router-dom';

const Battle = () => {

    const params = useParams();
    const { id1 } = useParams();
    const { id2 } = useParams();

    console.log('params: ', params);
    console.log('id1: ', id1);
    console.log('id2: ', id2);

    return(
        <section>
            {/* params: { params } */}
            id1: { id1 }
            id2: { id2 }
        </section>
    )
}

export default Battle;