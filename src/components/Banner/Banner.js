import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div className="banner d-flex align-items-center text-center">
        <div className = "container">
        <h1>Best food waiting for your belly</h1>
            <div className = "search-bar col-md-6 my-5 mx-auto">
                <input type ="text" className="form-control" placeholder ="Search Food Items"/> 
                <button  className="btn btn-danger search-btn btn-rounded">Search</button>
            </div>
            
        </div>
        </div>
    );
};

export default Banner;