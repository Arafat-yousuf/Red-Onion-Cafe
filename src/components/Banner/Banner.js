import React, { useState } from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';

const Banner = () => {
    const [query , setQuery] = useState(null)
    const findQuery = que => setQuery(que.target.value);
    //console.log(query);
    return (
        <div className="banner d-flex align-items-center text-center">
        <div className = "container">
        <h1>Best food waiting for your belly</h1>
            <div className = "search-bar col-md-6 my-5 mx-auto">
                <input id="query" onChange={findQuery} type ="text" className="form-control" placeholder ="Search Food Items"/> 
                <Link to={"/search/"+query}>
                <button onClick={() => window.scrollBy(0, 400)}  className="btn btn-danger search-btn btn-rounded">Search</button>
                </Link>
            </div>
            
        </div>
        </div>
    );
};

export default Banner;