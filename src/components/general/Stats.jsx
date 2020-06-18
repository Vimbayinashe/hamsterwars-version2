import React, { useEffect, useState } from 'react';

const Stats = () => {
    
    const [losers, setLosers] = useState('');
    const [topHamsters, setTopHamsters] = useState('');
    const [totalGames, setTotalGames] = useState('');
    
    
    useEffect(() => {

        let Statistics = [
            { name: 'bottom', url: '/api/charts/bottom/', setState: setLosers },
            { name: 'top', url: '/api/charts/top/', setState: setTopHamsters },
            { name: 'games', url: '/api/stats/total/', setState: setTotalGames }
        ]

        let fetchStats = async () => {
            
            Statistics.forEach(async (stat) => {
                try {
                    let response = await fetch(stat.url);
                    
                    let json = await response.json();

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
                <li key={hamster.hamster.id}>{hamster.hamster.name} has won {hamster.hamster.wins} out of {hamster.hamster.games}</li>)) }
        </ol>
        : <p>We are currently unable to show you the top five hamsters.</p>;

    let bottomList = losers ? 
        <ol>
            { losers.hamsters.map(hamster => (
                <li key={hamster.hamster.id}>
                    {hamster.hamster.name} has lost {hamster.hamster.defeats} out of {hamster.hamster.games}
                </li>)) }
        </ol>
        : <p> We are currently unable to show you the bottom five hamsters.</p>;



    return (
        <section className="stats">
            <h2>Hamster Wars - Statistics</h2>
            
            <article>
                <h3>Top 5 Hamsters</h3>
                <div className="stats-info">
                    {topList}
                </div>
            </article>

            <article>
                <h3>Bottom 5 Hamsters </h3>
                <div className="stats-info">
                    {bottomList}
                </div>
            </article>

            <article>
                <h3>Total Number of Battles</h3>
                <p className="stats-info">
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
