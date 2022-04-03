import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import { theme, cn } from '../style.js';
import { css } from '@emotion/css';
// import logo from '../svg/sjsulogo.svg';

const Navbar = (props) => {

    const title = 'Rate My SJSU';
    const [user, setUser] = useState({});

    const goHome = () => { navigate("/") }
    const goCreate = () => { navigate("/create") }
    const goManage = () => { navigate("/manage") }
    const goLogIn = () => { navigate("/login") }

    const logout = (e) => {
        axios
        .post(
            "http://localhost:8000/api/users/logout",
            {},
            {
                withCredentials: true,
            },
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
            if(setUser){
                setUser({});
            }
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/secure",
            { withCredentials: true }
        )
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // check if we can find any logged in user 
    if(Object.keys(user).length != 0){
        return(
            <div className='navbar'>
                {/* <div
                    dangerouslySetInnerHTML={{ __html: logo }}
                    className={css`
                        svg {
                            width: 20px;
                            height: 20px;
                        }
                    `}
                ></div> */}
                <h1 className={cn.h1}>{title}</h1>
                <div className='navbarButtons'>
                    <button onClick={goHome}>Go Home</button>
                    <button onClick={goCreate}>Create</button>
                    <button onClick={goManage}>Manage</button>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        )
    }else{
        return(
            <div className='navbar'>
                {/* <div
                    dangerouslySetInnerHTML={{ __html: logo }}
                    className={css`
                        width: 20px;
                        height: 20px;
                        svg {
                            width: 20px;
                            height: 20px;
                        }
                    `}
                ></div> */}
                <h1 className={
                    css`
                        color: #0055A2;
                        font-weight: bold;
                        font-size: 50px;
                    `
                }>{title}</h1>
                <div className='navbarButtons'>
                    <button onClick={goHome}>Go Home</button>
                    <button onClick={goLogIn}>Login</button>
                </div>
            </div>
        )
    }
    
}

export default Navbar;