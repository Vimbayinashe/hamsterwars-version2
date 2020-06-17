import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// , Link, NavLink, Redirect
import Header from './components/home/Header';
import Home from './components/home/Home';
import Hamsters from './components/hamsters/Hamsters';
import RandomBattle from './components/battle/RandomBattle';
import CustomBattle from './components/battle/CustomBattle';
import key from './APIKey';


function App() {

    const [randomCompetitors, setRandomCompetitors] = useState([]);
    // const [customCompetitors, setCustomCompetitors] = useState([]);
    const [outcome, setOutcome] = useState({});

    console.log('outcome in App.js: ', outcome);
    
    const randomBattleProps = {
        competitors: randomCompetitors,
        setCompetitors: setRandomCompetitors,
        setOutcome: setOutcome,
        postMatchResult
    }

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

                    <Route path="/battle/:id1/:id2">
                        <CustomBattle 
                            setOutcome={setOutcome}
                            postMatchResult={postMatchResult}/>
                    </Route>

                    <Route path="/battle">
                        <RandomBattle 
                            props={randomBattleProps}>
                        </RandomBattle>
                    </Route>

                    <Route path="/all-hamsters">
                        <Hamsters />
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
        
        return json;

                        

    } catch (err) {
        console.error(err);
    }
}