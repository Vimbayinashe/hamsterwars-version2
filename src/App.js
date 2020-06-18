import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// , Link, NavLink, Redirect
import Header from './components/home/Header';
import Home from './components/home/Home';
import Hamsters from './components/hamsters/Hamsters';
import RandomBattle from './components/battle/RandomBattle';
import CustomBattle from './components/battle/CustomBattle';
import Matchup from './components/battle/Matchup';
import Stats from './components/statistics/Stats';
import key from './APIKey';


function App() {

    const [fetchError, setFetchError] = useState(false);
    const [hamsters, setHamsters] = useState([]);
    const [randomCompetitors, setRandomCompetitors] = useState([]);
    const [outcome, setOutcome] = useState({});

    console.log('outcome in App.js: ', outcome);
    
    const randomBattleProps = {
        competitors: randomCompetitors,
        setCompetitors: setRandomCompetitors,
        outcome: outcome,
        setOutcome: setOutcome,
        postMatchResult
    }


    useEffect(() => {

        let url = '/api/hamsters/';

        let fetchAllHamsters = async () => {
         
            try {
                const response = await fetch(url);
                if( response.status !== 200 ) {
                    console.log('Could not fetch all hamsters in App.js. Status: ' + response.status);
                    setFetchError(true);
                }
                const json = await response.json();

                if (json.hamsters) {
                    setHamsters(json.hamsters);
                    setFetchError(false);
                }

                return json.hamsters;
                
            } catch (error) {
                console.error(error);
            }
        }
        
        console.log('Fetching ALL Hamsters - App.js!')
        fetchAllHamsters();

    }, [])


    return (
        <Router className = "main">
            <Switch>
                <Route path="/">
                    <Header/>
                </Route>
            </Switch>

            <main>
                {/* Here comes <Switch> & <Route>'s that point to the specific components  */}
                <Switch>

                    <Route path="/stats">
                        <Stats />
                    </Route>
                    <Route path="/matchup">
                        <Matchup 
                            fetchError={fetchError}
                            hamsters={hamsters}
                            outcome={outcome} />
                    </Route>

                    <Route path="/battle/:id1/:id2">
                        <CustomBattle 
                            hamsters={hamsters}
                            fetchError={fetchError}
                            setOutcome={setOutcome}
                            postMatchResult={postMatchResult}/>
                    </Route>

                    <Route path="/battle">
                        <RandomBattle 
                            props={randomBattleProps}>
                        </RandomBattle>
                    </Route>

                    <Route path="/all-hamsters">
                        <Hamsters hamsters={hamsters} />
                    </Route>
                    
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </Switch>

            </main>

            <Switch>
                <Route path="/">
                    <footer>
                        Footer <i>bla bla bla...</i>
                    </footer>
                </Route>
            </Switch>
        </Router>

    );
}

export default App;


let postMatchResult = async (data) => {

    let url = '/api/games';
            
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': key
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        console.log('post: ', json);
        console.log('KEY: ', key);
        
        return json;

                        

    } catch (err) {
        console.error(err);
    }
}