import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {

    return(
        <header className="App-header">
            <h1>Hamster Wars</h1>
            <nav>
                <Link to="/">Home</Link>
                <NavLink to ="/battle">Battle</NavLink>
                <NavLink to="/stats">Statistics</NavLink>
                <NavLink to="/hamster-gallery">Hamsters</NavLink>
                <NavLink to="/upload">Upload new hamster</NavLink>
                {/* <NavLink to="/tournament">Hamster Tournament</NavLink> */}
            </nav>
        </header>

    )
}

export default Header;