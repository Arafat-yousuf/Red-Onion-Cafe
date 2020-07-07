import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import {ConeStriped} from 'react-bootstrap-icons';

const NotFound = () => {
    return (
        <div className="not-found align-items-center text-center">
            <div className="container">
                <h1><ConeStriped color="crimson"/> 404 <ConeStriped color="crimson"/> </h1>
                <p>Page Not Found</p>
                <Link className="btn btn-danger" to="/">Return to HomePage</Link>
            </div>
        </div>
    );
};

export default NotFound;