import React, { useState } from 'react';
import './Upload.css';

const Upload = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [imgName, setImgName] = useState('');
    const [favFood, setFavFood] = useState('');
    const [loves, setLoves] = useState('');
    const [postedHamster, setPostedHamster] = useState('');

    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);
    const [imgNameTouched, setImgNameTouched] = useState(false);
    const [favFoodTouched, setFavFoodTouched] = useState(false);
    const [lovesTouched, setLovesTouched] = useState(false);


    const stopSubmit = event => {
        event.preventDefault();
    }


    let [nameClass, nameError] = nameTouched ? isValidText(name) : ['', false];
    let [ageClass, ageError] = ageTouched ? isValidAge(age) : ['', false];
    let [imgNameClass, imgNameError] = imgNameTouched ? isValidText(imgName) : ['', false];
    let [favFoodClass, favFoodError] = favFoodTouched ? isValidText(favFood) : ['', false];
    let [lovesClass, lovesError] = lovesTouched ? isValidText(loves) : ['', false];

    let anyError = ( nameError || ageError || imgNameError || favFoodError 
        || lovesError ) ? true : false;
        
        
    function submitHamster () {
        let data = { name, age, favFood, loves, imgName: (imgName + '.jpg') };
        console.log(data);
       
        postHamster(data);

        setTimeout(() => {
            // clear posted hamster details
            setName('');  
            setAge('');
            setFavFood('');
            setLoves('');
            setImgName('');

            setNameTouched(false);
            setAgeTouched(false);
            setFavFoodTouched(false);
            setLovesTouched(false);
            setImgNameTouched(false);
        
            setPostedHamster('');
        }, 4000)

    }

    async function postHamster (data) {
        let url = 'api/hamsters/new';
                
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const json = await response.json();
            if (json.name) {
                setPostedHamster(json.name)
            }
    
            console.log('post: ', json);
            
            return json;

        } catch (err) {
            console.error(err);
        }
    }


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
                </div>  
                <div className={nameError ? 'error-message' : 'hidden'}>
                    What is the hamster's name?
                </div>

                <div className="form-element">
                    <label>Age:</label>
                    <input type="text" placeholder="Hamster's age"
                        className={ageClass}
                        onBlur={() => setAgeTouched(true)}                    
                        onChange={e => setAge(e.target.value)}
                        value={age}/>
                </div>
                <div className={ageError ? 'error-message' : 'hidden'}>
                    How many years old is the hamster (as a number)?
                </div>  

                <div className="form-element">
                    <label>Favourite Food:</label>
                    <input type="text" placeholder="Hamster's favourite food"
                        className={favFoodClass}
                        onBlur={() => setFavFoodTouched(true)}
                        onChange={e => setFavFood(e.target.value)}
                        value={favFood}/>
                </div> 
                <div className={favFoodError ? 'error-message' : 'hidden'}>
                    What is the hamster's favourite food?
                </div>

                <div className="form-element">
                    <label>Loves:</label>
                    <input type="text" placeholder="What does the hamster love doing"
                        className={lovesClass}
                        onBlur={() => setLovesTouched(true)}
                        onChange={e => setLoves(e.target.value)}
                        value={loves}/>
                </div>
                <div className={lovesError ? 'error-message' : 'hidden'}>
                    What does the hamster like to do?
                </div>  
                
                <div className="form-element">
                    <label>Choose a name for the hamster's picture:</label>
                    <input type="text" placeholder="name of picture"
                        className={imgNameClass}
                        onBlur={() => setImgNameTouched(true)}
                        onChange={e => setImgName(e.target.value)}
                        value={imgName}/>
                </div>
                <div className={imgNameError ? 'error-message' : 'hidden'}>
                    What would you like to call the hamster's picture?
                </div>

                <div className="form-element button">
                    <button disabled={anyError}
                        onClick={submitHamster}> 
                        Add New Hamster 
                    </button>
                </div>

            </form>

            { 
                postedHamster 
                ? <div className="loaded">{postedHamster} successfully uploaded</div> 
                : ''
            }
            

        </section>
    )
}


function isValidText(text) {
    if( String(text) !== '') return ['form-valid', false];
    else return ['form-error', true]   
}

function isValidAge(age) {
    let valid = age && typeof(Number(age)) === 'number' && Number(age) >= 0 
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
