import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// , Link, NavLink, Redirect
import Header from './components/home/Header';
import Home from './components/home/Home';
import Hamsters from './components/hamsters/Hamsters';
import RandomBattle from './components/battle/RandomBattle';
import CustomBattle from './components/battle/CustomBattle';


function App() {

    const [randomCompetitors, setRandomCompetitors] = useState([]);
    const [customCompetitors, setCustomCompetitors] = useState('');

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
                        <strong>Battle Params</strong>
                        <CustomBattle />
                    </Route>

                    <Route path="/battle">
                        <strong>OG BATTLE!!!</strong>
                        <RandomBattle 
                            competitors={randomCompetitors} 
                            setCompetitors={setRandomCompetitors}>
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

        // <div className="App">
        // <header className="App-header">
        //     <h1>Hamster Wars</h1>
        // </header>
        // <p>coming soon...</p>
        // </div>
    );
}

export default App;
