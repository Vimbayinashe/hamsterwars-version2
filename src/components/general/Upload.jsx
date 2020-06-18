import React, { useState } from 'react';
import './Upload.css';

const Upload = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [imgName, setImgName] = useState('');
    const [favFood, setFavFood] = useState('');
    const [loves, setLoves] = useState('');

    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);
    const [imgNameTouched, setImgNameTouched] = useState(false);
    const [favFoodTouched, setFavFoodTouched] = useState(false);
    const [lovesTouched, setLovesTouched] = useState(false);


    const stopSubmit = event => {
        event.preventDefault();
    }


    let [nameClass, nameError] = nameTouched ? isValidText(name) : ['', false];

    // let anyError = 
    //     ( nameError || ageError || imgError || foodError || lovesError )        
    //     ? true 
    //     : false      disabled={anyError}


    return(
        <section className="upload">
            <h2>Upload A New Hamster</h2>
            <h3>Please enter the hamster's details here:</h3>
            <form onSubmit={stopSubmit}>

                <div className="form-element">
                    <label>Name:</label>
                    <input type="text" placeholder="Hamster's name"
                        className={nameClass}
                        onBlur={() => setNameTouched(true)}
                        onChange={e => setName(e.target.value)}
                        value={name}/>
                    <div className={nameError ? 'error-message' : 'hidden'}>Please enter a name for the hamster</div>
                </div>  

                <div className="form-element">
                    <label>Age:</label>
                    <input type="text" placeholder="Hamster's age"
                        onBlur={() => setAgeTouched(true)}                    
                        onChange={e => setAge(e.target.value)}
                        value={age}/>
                </div>  

                <div className="form-element">
                    <label>Favourite Food:</label>
                    <input type="text" placeholder="Hamster's favourite food"
                        onBlur={() => setFavFoodTouched(true)}
                        onChange={e => setFavFood(e.target.value)}
                        value={favFood}/>
                </div> 

                <div className="form-element">
                    <label>Loves:</label>
                    <input type="text" placeholder="What does the hamster love doing"
                        onBlur={() => setLovesTouched(true)}
                        onChange={e => setLoves(e.target.value)}
                        value={loves}/>
                </div>  
                
                <div className="form-element">
                    <label>Choose a name for the hamster's picture:</label>
                    <input type="text" placeholder="name of picture"
                        onBlur={() => setImgNameTouched(true)}
                        onChange={e => setImgName(e.target.value)}
                        value={imgName}/>
                </div>

                <div className="form-element">
                    <button disabled> Add New Hamster </button>
                </div>


                <div>Name: {name} </div>
                <div>age: {age} </div>
                <div>imgName: {imgName} </div>
                <div>favFood: {favFood} </div>
                <div>love: {loves} </div>


            </form>

        </section>
    )
}


function isValidText(text) {
    if( String(text) !== '') return ['form-valid', false];
    else return ['form-error', true]   
}

function isValidAge(age) {
    let valid = typeof(Number(age)) === 'number' && Number(age) >= 0 
        && Number(age) <= 20;
    if( valid ) {
        return ['form-valid', false];
    } else { 
        return ['form-error', true] 
    }
}

export default Upload;

/**
 * {
    "loves": "Running that wheeeeeeeeeeeeeeeel!",
    "age": 5,
    "favFood": "persika",
    "name": "Tulau",
    "imgName": "hamster-Y.jpg"
}
 */
