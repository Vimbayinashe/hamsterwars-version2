import React, { useEffect, useState } from 'react';

const Stats = () => {
    
    const [losers, setLosers] = useState('');
    const [topHamsters, setTopHamsters] = useState('');
    const [totalGames, setTotalGames] = useState('');
    
    
    useEffect(() => {
        // { hamsters: top } & top:[]   { totalGames : amount }

        let Statistics = [
            { name: 'bottom', url: '/api/charts/bottom/', setState: setLosers },
            { name: 'top', url: '/api/charts/top/', setState: setTopHamsters },
            { name: 'games', url: '/api/stats/total/', setState: setTotalGames }
        ]

        let fetchStats = async () => {
            
            console.log('Stats.jsx fetch running!');    /** */
            
            Statistics.forEach(async (stat) => {
                try {
                    let response = await fetch(stat.url);
                    if( response.status !== 200 ) {
                        console.log(`Could not fetch ${stat.name} in Stats Component. Status: ` + response.status);
                    }
                    let json = await response.json();
                    stat.setState(json);

                    console.log(json);   /** */
                } catch (error) {
                    console.error(error);
                }
            })
       
        }

        fetchStats();

    }, [])


    return (
        <section>
            <h2>Hamster Wars - Statistics</h2>

            <article>
                <h3>Top 5 Hamsters</h3>

            </article>
            <article>
                <h3>Bottom 5 Hamsters </h3>

            </article>
            <article>
                <h3>Total Number of Battles</h3>
                <p>{} games have been played to date.</p>
            </article>
        </section>
    )
}

export default Stats;

// let losersURL = '/api/charts/bottom/';  
// let topURL = '/api/charts/top/';
// let gamesURL = '/api/stats/total/';    