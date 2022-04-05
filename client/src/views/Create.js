import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';

const Create = (props) => {

    const [type, setType] = useState("poll");
    const [options, setOptions] = useState([{option: ""}]);
    const [pollQuestion, setPollQuestion] = useState("");
    const [ratingQuestion, setRatingQuestion] = useState("");
    const [error, setError] = useState({})

    const pollQuestionHander = (e) => {
        setPollQuestion(e.target.value);
    }

    const ratingQuestionHander = (e) => {
        setRatingQuestion(e.target.value);
    }

    const optionHandler = (e, index) => {
        const {name, value} = e.target;
        const list = [...options];
        list [index][name] = value;
        setOptions(list);
    };

    const addHandler = () => {
        setOptions([ ...options, {option: ""} ]);
    };

    const removeHandler = (index) => {
        const list = [...options];
        list.splice(index, 1);
        setOptions(list);
    };

    const pollSubmitHandler = (e) => {
        e.preventDefault();

        let newObject = {pollQuestion: "", options:[]}
        newObject.pollQuestion = pollQuestion;
        newObject.options = options;
        
        axios.post("http://localhost:8000/api/polls/create", {pollQuestion, options}, {withCredentials: true})
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/manage");
            })
            .catch((err)=>{
                console.log(err);
                setError(err.response.data.errors)
            })
    }

    const ratingSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/ratings/create", {ratingQuestion}, {withCredentials: true})
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/manage");
            })
            .catch((err)=>{
                console.log(err);
                setError(err.response.data.errors);
            })
    }

    if(type == "poll"){
        return(
            <div className='wrapper'>
                <Navbar />
                <div className='type-selector'>
                    <label>Select type</label>
                    <select onChange={e => setType(e.target.value)}>
                        <option value="poll">Poll</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
                
                <div className='main-form'>
                    <form onSubmit={pollSubmitHandler}>
                    <div>
                        <label>Enter a topic for your poll:</label>
                    </div>
                    <textArea
                        placeholder='Which is the best cafe on campus?'
                        name = "pollQuestion"
                        value = {pollQuestion}
                        onChange = {(e) => pollQuestionHander(e)}
                    />
                    {options.map((option, i) => {
                        return (
                        <div key={i}>
                            <div>
                                <label> Option #{i+1} </label>
                            </div>
                            <input
                                name="option"
                                value={option.option}
                                onChange={(e) => optionHandler(e, i)}
                            />
                            <div>
                                {options.length !== 1 && 
                                <button onClick={() => removeHandler(i)}>Remove</button>}

                                {options.length - 1 === i && 
                                <button onClick={() => addHandler()}>Add More</button>}
                            </div>
                        </div>
                        );
                    })}
                    <button style={{marginTop: 20}} >Submit</button>
                    </form>
                </div> 
            </div>
        )
    }
    else{
        return(
            <div className='wrapper'>
                <Navbar />
                <div className='type-selector'>
                    <label>Select type</label>
                    <select onChange={e => setType(e.target.value)}>
                        <option value="poll">Poll</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
                <div className='main-form'>
                    <form onSubmit={ratingSubmitHandler}>
                        <div>
                            <label>Enter a topic for your rating:</label>
                        </div>
                        <textarea
                            placeholder='How would rate the new building?'
                            name = "ratingQuestion"
                            value = {ratingQuestion}
                            onChange = {(e) => ratingQuestionHander(e)}
                        />
                        <div>
                            <label>Your subject will be rated on a scale of 1-5</label>
                        </div>
                        <div>
                            <button style={{marginTop: 10}}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Create;