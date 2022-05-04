import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';

const Forget = (props) => {

    const [sjsuid, setSjsuid] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("")
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [confirmation, setConfirmation] = useState("")
    const [foundUserFlag, setFoundUserFlag] = useState(false)
    const [correctAnswerFlag, setCorrectAnswerFlag] = useState(false)
    const [user, setUser] = useState({})

    const searchID = (event) =>{
        event.preventDefault();
        setErrors("")
        axios
            .get(`http://localhost:8000/api/users/${sjsuid}`)
            .then((res) => {
                if(res.data){
                    console.log(res)
                    setUser(res.data)
                    setFoundUserFlag(true)
                }
                else{
                    setErrors("No account found")
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data.message);
            });
    }

    const checkAnswer = (event)=>{
        event.preventDefault();
        setErrors("")
        if(securityAnswer == user.securityAnswer){
            setCorrectAnswerFlag(true)
        }
        else{
            setErrors("Your answer is incorrect")
        }
    }

    const changePassword = (event) =>{
        event.preventDefault();
        axios
            .post(`http://localhost:8000/api/users/changepassword`,
            {
                sjsuid,
                password
            })
            .then(res =>{
                console.log(res.data)
                setConfirmation("Your password has been reset. You can now go back and login")
            })
            
    }

    if(!correctAnswerFlag && !foundUserFlag){
        return(
            <div className='wrapper'>
                <div className='bg'></div>
                <Navbar/>
                <div className='section-shift'>
                    <form onSubmit={searchID}>
                        <div className='alert-message'>
                            <b>{errors ? errors : ""}</b>
                        </div>
                        <label>Enter your SJSU ID:</label>
                        <input type="text"
                            name="sjsuid"
                            value={sjsuid}
                            onChange={(e) => setSjsuid(e.target.value)}>
                        </input>
                        <button>Submit</button>
                    </form>
                </div>
                
            </div>
        )
    }else if(!correctAnswerFlag && foundUserFlag){
        return(
            <div className='wrapper'>
                <div className='bg'></div>
                <Navbar/>
                <div className='section-shift'>
                    <form onSubmit={checkAnswer}>
                        <div className='alert-message'>
                            <b>{errors ? errors : ""}</b>
                        </div>
                        <p>SJSU ID: {user.sjsuid}</p>
                        <label>Please answer your security question:</label>
                        <p>{user.securityQuestion}</p>
                        <input type="text" 
                            name="securityAnswer"
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}>
                        </input>
                        <button>Submit</button>
                    </form>
                </div>
               
            </div>
        )
    }else if(correctAnswerFlag && foundUserFlag){
        return(
            <div className='wrapper'>
                <div className='bg'></div>
                <Navbar/>
                <div className='section-shift'>
                    <form onSubmit={changePassword}>
                        <div className='alert-message'>
                            <b>{errors ? errors : ""}</b>
                            <b style={{color:'green'}}>{confirmation ? confirmation : ""}</b>
                        </div>
                        <p>SJSU ID: {user.sjsuid}</p>
                        <label>Please enter a new password:</label>
                        <input type="text" 
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    
}
export default Forget;