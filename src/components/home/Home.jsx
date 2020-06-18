import React from 'react';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';
import Button from './Button';



const Home = () => {

    return(
        <section className="home">
            <Slideshow />
            {/* <h2>Home Page</h2> */}

            <div>
                <Link to="/battle">
                    <Button>Play</Button>
                </Link>
                <Link to="/all-hamsters">
                    <Button>All Hamsters</Button>
                </Link>
                <Link to="/stats">
                    <Button>Statistics</Button>
                </Link>
                <Link to="/upload">
                    <Button>Upload</Button>
                </Link>
            </div>
            
        </section>
    )
}

export default Home;