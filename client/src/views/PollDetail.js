import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';

const PollDetail = (props) => {

    const {pollid} = props;
    const [poll, setPoll] = useState({}); 
    const [options, setOptions] = useState ([]);
    const [votedOption, setVotedOption] = useState("");
    const [error, setError] = useState("");
    // if vote fails, don't re-render the page
    // if vote succeeds, re-renderr the page to display the updated vote count
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/polls/${pollid}`)
            .then((res) => {
                console.log(res.data);
                setPoll(res.data);
                setOptions(res.data.options);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [flag])

    const submitHandler = (e) => {
        e.preventDefault();
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
        })
    }

    return(
        <div>
            <Navbar />
            <form onSubmit={submitHandler}>
                <p>{error ? error : ""}</p>
                <p>{poll.pollQuestion}</p>
                {
                    options.map((option, index) => (
                        <div key={index}>
                            <input 
                                type = "radio" 
                                value={option.option}
                                name = "option"
                                onChange = {(e)=>setVotedOption(e.target.value)}
                            />
                            {option.option} (current vote: {option.votes})
                        </div>
                    ))
                }
                <button>Submit</button>
            </form>
            
        </div>
    )

}
export default PollDetail;