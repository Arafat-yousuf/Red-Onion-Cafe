import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found align-items-center text-center">
            <div className="container">
                <h1>404</h1>
                <p>Page Not Found</p>
                <Link className="btn btn-danger" to="/">Return to HomePage</Link>
            </div>
        </div>
    );
};

export default NotFound;