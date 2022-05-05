import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Navbar from '../components/Navbar';
import moment from 'moment';
moment().format();

const Home = (props) => {

    const [pollList, setPollList] = useState([]);
    const [ratingList, setRatingList] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/allPolls")
            .then((res) => {
                setPollList(res.data)
            })
            .catch((err) => {
                console.log("Oops, something went wrong!"); //console.log(err); avoid error details breach
            })
    }, [])

    
    useEffect(() => {
        axios.get("http://localhost:8000/api/allRatings")
            .then((res) => {
                setRatingList(res.data)
            })
            .catch((err) => {
                console.log("Oops, something went wrong!"); //console.log(err); avoid error details breach
            })
    }, [])

    const search = (e) => {
        e.preventDefault();
        if(keyword){
            axios.get(`http://localhost:8000/api/polls/allpollsbykeyword/${keyword}`)
                .then((res)=>{
                    setPollList(res.data);
                    setKeyword("");
                })
                .catch((err)=>{
                    console.log("Oops, something went wrong!"); //console.log(err); avoid error details breach
                });
            axios.get(`http://localhost:8000/api/ratings/allratingsbykeyword/${keyword}`)
            .then((res)=>{
                setRatingList(res.data);
                setKeyword("");
            })
            .catch((err)=>{
                console.log("Oops, something went wrong!"); //console.log(err); avoid error details breach
            });
        }
    }


    //var current = moment(new Date());
    //var created = moment(ratingList[0].createdAt);

    //current.diff(created, 'days')

    return(
        <div className='wrapper'>
            <div className='bg'></div>
            <Navbar/>
            <div>
                <form className='search-bar' onSubmit={search}>
                    <input 
                        placeholder="Looking for something?"
                        value={keyword} 
                        onChange={(e)=>setKeyword(e.target.value)} 
                        type="text" 
                    />
                    <button>Search</button>
                </form>
                <div className='item-list'>
                    {
                        pollList.map((poll, index) => (
                            <div className='item' key={index}>
                                <Link to={`/polldetail/${poll._id}`}>
                                    {poll.pollQuestion}
                                </Link>   
                            </div>
                        ))
                    }
                    {
                        ratingList.map((rating, index) => (
                            <div key={index} className='item'>
                                {((moment(new Date()).diff(moment(rating.createdAt),'days') <= rating.lifespan) || rating.likes >= 50) &&
                                    <Link to={`/ratingdetail/${rating._id}`}>
                                    {rating.ratingQuestion}
                                    </Link>   
                                } 
                            </div>
                        ))
                    }
                </div>
                
            </div>
            
        </div>
    )
}
export default Home;