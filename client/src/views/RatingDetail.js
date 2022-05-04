import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';
import StepRangeSlider from 'react-step-range-slider'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const RatingDetail = (props) => {
    const {ratingid} = props;
    const [rating, setRating] = useState({}); 
    const [scores, setScores] = useState ([]);
    const [votedScore, setVotedScore] = useState("3");
    const [error, setError] = useState("");
    // if vote fails, don't re-render the page 
    // if vote succeeds, re-renderr the page to display the updated vote count
    const [flag, setFlag] = useState(0);
    const [likedFlag, setLikedFlag] = useState(0);
    const [optionList, setOptionList] = useState([]);
    const [votesList, setVotesList] = useState([]);
    const [newVotesList, setNewVotesList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ratings/${ratingid}`)
            .then((res) => {
                console.log(res.data);
                setRating(res.data);
                setScores(res.data.scores);
                res.data.scores.forEach((score)=>{
                    newVotesList.push(score.votes)
                })
                setVotesList([])
                setNewVotesList([])
                setVotesList(newVotesList)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [flag, likedFlag])

    const submitHandler = (e) => {
        e.preventDefault();

        // if the label lists are empty, add the labels to the list
        if(optionList[0] == null){
            scores.forEach((score)=>{
                optionList.push(score.score)
            })
            scores.forEach((score)=>{
                votesList.push(score.votes)
            })
        }

        axios.post(`http://localhost:8000/api/ratings/vote/${ratingid}`,
            {votedScore},
            { withCredentials: true }
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
            if(err.response.data.message != "You must be logged in to perform this operation"){
                setFlag(1)   
            }
        })
    }

    const likeRating = (e) =>{
        e.preventDefault();

        axios.post(`http://localhost:8000/api/ratings/like/${ratingid}`, 
            {dummy: 0},
            {withCredentials: true}
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setError(res.data.message)
            setLikedFlag(1);
        })
        .catch((err)=>{
            console.log(err);
            console.log("err.response:", err.response.data);
            setError(err.response.data.message);
        })
    }

    if(!flag){
        return(
            <div className='wrapper'> 
            <div className='bg'></div>
                <Navbar />
                <div className='main-form'>
                    <form onSubmit={submitHandler}>
                        <b style={{color:'red'}}>{error ? error : ""}</b>
                        <h3>{rating.ratingQuestion}</h3>
                        <h4>Please rate on a scale of 0-5</h4>

                        <div style={{marginTop:30}}>
                            <input type="range" name="slider" min="0" max="5" step="1" defaultValue={3}
                            onChange = {(e)=>setVotedScore(e.target.value)}/>
                            <label for="slider">{votedScore}</label>
                        </div>
                        <div style={{marginTop:30}}>
                            <button>Submit</button>
                        </div>
                        {rating.likes} people found this rating 
                        <a style={{color:'blue'}} onClick={likeRating}> helpful</a>
                    </form>
                </div>
            </div>
            
        )
    }
    else{
        return(
            <div className='wrapper'> 
            <div className='bg'></div>
                <Navbar />
                <div className='main-form'>
                    <form onSubmit={submitHandler}>
                        <b style={{color:'red'}}>{error ? error : ""}</b>
                        <h3>{rating.ratingQuestion}</h3>
                        <h4>Please rate on a scale of 0-5</h4>
                        <div style={{marginTop:30}}>
                            <input type="range" name="slider" min="0" max="5" step="1" defaultValue={3}
                            onChange = {(e)=>setVotedScore(e.target.value)}/>
                            <label for="slider">{votedScore}</label>
                        </div>
                        <div style={{marginTop:30}}>
                            <button>Submit</button>
                        </div>
                        {rating.likes} people found this rating 
                        <a style={{color:'blue'}} onClick={likeRating}> helpful</a>
                    </form>
                    <div style={{marginLeft: 100}}>
                            <h1>Current Result</h1>
                            <div style={{ maxWidth: "650px" }}>
                                <Bar
                                data={{
                                    // Name of the variables on x-axies for each bar
                                    labels: optionList,
                                    datasets: [
                                    {
                                        // Label for bars
                                        label: "votes",
                                        data: votesList,
                                        // Color of each bar
                                        backgroundColor: ["#0055a2"],
                                        // Border color of each bar
                                        borderColor: ["aqua"],
                                        borderWidth: 0.5,
                                    },
                                    ],
                                }}
                                // Height of graph
                                height={400}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                    yAxes: [
                                        {
                                        ticks: {
                                            // The y-axis value will start from zero
                                            beginAtZero: true,
                                            steps: 1,
                                        },
                                        },
                                    ],
                                    },
                                    
                                }}
    
                                />
                            </div>
                        </div>
                </div>
            </div>

        )
    }
    
}
export default RatingDetail;