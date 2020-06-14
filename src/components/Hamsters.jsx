import React, { useState, useEffect } from 'react';

const Hamsters = () => {

    const [hamsters, setHamsters] = useState([]);

    useEffect(() => {
        let url = '/api/hamsters';

        let fetchHamsters = async () => {
        
            try {
                const response = await fetch(url);
                const json = await response.json();
                
                console.log(json);
                
                return setHamsters(json);
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchHamsters();

    }, [])


    return (
        <section>
            <h2>Hamsters</h2>
            <div>

            </div>
        </section>
    )
}

export default Hamsters;