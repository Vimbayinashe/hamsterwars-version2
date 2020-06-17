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
                    console.log(json);   /** */

                    if(json.hamsters || json.totalGames ) {
                        stat.setState(json);
                    }

                    return json;

                } catch (error) {
                    console.error(error);
                }
            })
        }

        fetchStats();

    }, [])

    let topList = topHamsters ? 
        <ol>
            { topHamsters.hamsters.map(hamster => (
                <li key={hamster.id}>{hamster.name} has won {hamster.wins} out of {hamster.games}</li>)) }
        </ol>
        : <p>We are currently unable to show you the top five hamsters.</p>;

    let bottomList = losers ? 
        <ol>
            { losers.hamsters.map(hamster => (
                <li key={hamster.id}>{hamster.name} has lost {hamster.defeats} out of {hamster.games}</li>)) }
        </ol>
        : <p> We are currently unable to show you the bottom five hamsters.</p>;



    return (
        <section>
            <h2>Hamster Wars - Statistics</h2>
            
            <article>
                <h3>Top 5 Hamsters</h3>
                {topList}
            </article>

            <article>
                <h3>Bottom 5 Hamsters </h3>
                {bottomList}
            </article>

            <article>
                <h3>Total Number of Battles</h3>
                <p>
                {
                    totalGames ?
                    `${totalGames.totalGames} games have been played to date.`
                    : ''
                }
                </p>
            </article>

            {
                !losers && !topHamsters && !totalGames 
                ? <div className="error-message"> 
                    We are facing challenges loading Battle Statistics at the moment.
                  </div>
                : ''
            }
        </section>
    )
}

export default Stats;

// let losersURL = '/api/charts/bottom/';  
// let topURL = '/api/charts/top/';
// let gamesURL = '/api/stats/total/';    