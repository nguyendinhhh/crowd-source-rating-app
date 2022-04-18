import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';
import StepRangeSlider from 'react-step-range-slider'

const RatingDetail = (props) => {
    const {ratingid} = props;
    const [rating, setRating] = useState({}); 
    const [scores, setScores] = useState ([]);
    const [votedScore, setVotedScore] = useState("3");
    const [error, setError] = useState("");
    // if vote fails, don't re-render the page
    // if vote succeeds, re-renderr the page to display the updated vote count
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ratings/${ratingid}`)
            .then((res) => {
                console.log(res.data);
                setRating(res.data);
                setScores(res.data.scores);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [flag])

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8000/api/ratings/vote/${ratingid}`,
            {votedScore},
            {withCredentials: true}
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setFlag(1);
        })
        .catch((err)=>{
            console.log(err);
            console.log("err.response:", err.response.data);
            setError(err.response.data.message);
        })
    }

    /*
        {
                        scores.map((score, index) => (
                            <div key={index}>
                                <input style={{width: 20, marginTop: 10}}
                                    type = "radio" 
                                    value={score.score}
                                    name = "score"
                                    onChange = {(e)=>setVotedScore(e.target.value)}
                                />
                                {score.score} (current vote: {score.votes})
                            </div>
                        ))
        }
    */

    return(
        <div className='wrapper'> 
            <Navbar />
            <div className='main-form'>
                <form onSubmit={submitHandler}>
                    <b style={{color:'red'}}>{error ? error : ""}</b>
                    <p>{rating.ratingQuestion}</p>

                    <div style={{marginTop:20}}>
                    <input type="range" name="slider" min="0" max="5" step="1" defaultValue={3}
                    onChange = {(e)=>setVotedScore(e.target.value)}/>
                    <label for="slider">{votedScore}</label>
                    </div>
                
                    <button>Submit</button>
                </form>
            </div>

        </div>
        
        
    )
}
export default RatingDetail;