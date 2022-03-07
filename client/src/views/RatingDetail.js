import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';

const RatingDetail = (props) => {
    const {ratingid} = props;
    const [rating, setRating] = useState({}); 
    const [scores, setScores] = useState ([]);
    const [votedScore, setVotedScore] = useState("");
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

    return(
        <div>
            {console.log(votedScore)}
            <Navbar />
            <form onSubmit={submitHandler}>
                <p>{error ? error : ""}</p>
                <p>{rating.ratingQuestion}</p>
                {
                    scores.map((score, index) => (
                        <div key={index}>
                            <input 
                                type = "radio" 
                                value={score.score}
                                name = "score"
                                onChange = {(e)=>setVotedScore(e.target.value)}
                            />
                            {score.score} (current vote: {score.votes})
                        </div>
                    ))
                }
                <button>Submit</button>
            </form>
            
        </div>
    )
}
export default RatingDetail;