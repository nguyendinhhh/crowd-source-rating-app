import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Navbar from '../components/Navbar';

const Manage = (props) => {

    const [user, setUser] = useState({});
    const [pollList, setPollList] = useState([]);
    const [ratingList, setRatingList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/secure",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/polls/allpollsbycreator/${user.sjsuid}`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data)
                setPollList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        axios.get(`http://localhost:8000/api/ratings/allratingsbycreator/${user.sjsuid}`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data)
                setRatingList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [user])

    const deletePoll = (pollid) => {
        axios.delete(`http://localhost:8000/api/polls/${pollid}`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setPollList(pollList.filter((poll, index) => poll._id !== pollid))
            })
            .catch((err) => console.log(err))
    }

    const deleteRating = (ratingid) => {
        axios.delete(`http://localhost:8000/api/ratings/${ratingid}`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setRatingList(ratingList.filter((rating, index) => rating._id !== ratingid))
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='wrapper'>
            <div className='bg'></div>
            <Navbar />
            <div className="section-shift">
                <h2>Welcome, Spartan</h2>
                <label>Here are the threads initiated by you:</label>
            </div>
            <div className='item-list'>
                {
                    pollList.map((poll, index) => (
                        <div className='item' key={index}>
                            <Link to={`/polldetail/${poll._id}`}>
                                {poll.pollQuestion}
                            </Link>
                            <button className="small-indent" onClick={() => deletePoll(poll._id)}>
                                Delete
                        </button>
                        </div>
                    ))
                }
                {
                    ratingList.map((rating, index) => (
                        <div className='item' key={index}>
                            <Link to={`/ratingdetail/${rating._id}`}>
                                {rating.ratingQuestion}
                            </Link>
                            <button className="small-indent" onClick={() => deleteRating(rating._id)}>
                                Delete
                        </button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
export default Manage;