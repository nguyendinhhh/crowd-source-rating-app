import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const PollDetail = (props) => {

    const {pollid} = props;
    const [poll, setPoll] = useState({}); 
    const [options, setOptions] = useState ([]);
    const [votedOption, setVotedOption] = useState("");
    const [error, setError] = useState("");
    // if vote fails, don't re-render the page
    // if vote succeeds, re-renderr the page to display the updated vote count
    const [flag, setFlag] = useState(0);
    //these two lists are for the labels of the bar graph
    const [optionList, setOptionList] = useState([]);
    const [votesList, setVotesList] = useState([]);
    const [newVotesList, setNewVotesList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/polls/${pollid}`)
            .then((res) => {
                console.log(res.data);
                setPoll(res.data);
                setOptions(res.data.options);
                res.data.options.forEach((option)=>{
                    newVotesList.push(option.votes)
                })
                setVotesList([])
                setNewVotesList([])
                setVotesList(newVotesList)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [flag])

    const submitHandler = (e) => {
        e.preventDefault();

        // if the label lists are empty, add the labels to the list
        if(optionList[0] == null){
            options.forEach((option)=>{
                optionList.push(option.option)
            })
            options.forEach((option)=>{
                votesList.push(option.votes)
            })
        }
        
        axios.post(`http://localhost:8000/api/polls/vote/${pollid}`,
            {votedOption},
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
            if(err.response.data.message != "You must be logged in to perform this operation"){
                setFlag(1)   
            }
        })
    }
    if(!flag){
        return(
            <div className='wrapper'>
                <div className='bg'></div>
                <Navbar />
                <div className='main-form'>
                    <div>
                        <form onSubmit={submitHandler}>
                            <b style={{color:'red'}}>{error ? error : ""}</b>
                            <h3>{poll.pollQuestion}</h3>
                            <h4>Result will be shown after you voted</h4>
                            <div style={{marginTop: 30}}>
                                {
                                    options.map((option, index) => (
                                        <div key={index}>
                                            <input style={{width: 20, marginTop: 10}}
                                                type = "radio" 
                                                value={option.option}
                                                name = "option"
                                                onChange = {(e)=>setVotedOption(e.target.value)}
                                            />
                                            {option.option}
                                        </div>
                                    ))
                                }
                            </div> 
                            <button style={{marginTop:30}}>Submit</button>
                        </form>
                    </div>            
                </div>
            </div>
        )
    }
    else if(flag){
        return(
            <div className='wrapper'>
                <div className='bg'></div>
                <Navbar />
                <div className='main-form'>
                    <div>
                        <form onSubmit={submitHandler}>
                            <b style={{color:'red'}}>{error ? error : ""}</b>
                            <h3>{poll.pollQuestion}</h3>
                            <h4>Result will be shown after you voted</h4>
                            <div style={{marginTop:30}}>
                                {
                                    options.map((option, index) => (
                                        <div key={index}>
                                            <input style={{width: 20, marginTop: 10}}
                                                type = "radio" 
                                                value={option.option}
                                                name = "option"
                                                onChange = {(e)=>setVotedOption(e.target.value)}
                                            />
                                            {option.option}
                                        </div>
                                    ))
                                }
                            </div> 
                            <button style={{marginTop:30}} >Submit</button>
                        </form>
                    </div>
                    
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
export default PollDetail;