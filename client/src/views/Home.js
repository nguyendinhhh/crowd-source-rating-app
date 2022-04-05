import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Navbar from '../components/Navbar';

const Home = (props) => {

    const [pollList, setPollList] = useState([]);
    const [ratingList, setRatingList] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/allPolls")
            .then((res) => {
                console.log(res.data)
                setPollList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/allRatings")
            .then((res) => {
                console.log(res.data)
                setRatingList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const search = (e) => {
        e.preventDefault();
        if(keyword){
            axios.get(`http://localhost:8000/api/polls/allpollsbykeyword/${keyword}`)
                .then((res)=>{
                    setPollList(res.data);
                    console.log(res);
                    console.log(res.data);
                    setKeyword("");
                })
                .catch((err)=>{
                    console.log(err);
                });
            axios.get(`http://localhost:8000/api/ratings/allratingsbykeyword/${keyword}`)
            .then((res)=>{
                setRatingList(res.data);
                console.log(res);
                console.log(res.data);
                setKeyword("");
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }

    return(
        <div className='wrapper'>
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
                            <div key={index}>
                                <Link className='item' to={`/ratingdetail/${rating._id}`}>
                                    {rating.ratingQuestion}
                                </Link>   
                            </div>
                        ))
                    }
                </div>
                
            </div>
            
        </div>
    )
}
export default Home;