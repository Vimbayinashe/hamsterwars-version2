import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// , Link, NavLink, Redirect
import Header from './components/home/Header';
import Home from './components/home/Home';
import Hamsters from './components/hamsters/Hamsters';


function App() {
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

                    <Route path="/battle">
                        <strong>BATTLE!!!</strong>
                        <div>fill with components from other headings also</div>
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
