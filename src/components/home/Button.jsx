import React from 'react';

const Button = (props) => {
    
    return(
        <div className="home-button">
            <button>{ props.children } </button>
        </div>
    )
}

export default Button;