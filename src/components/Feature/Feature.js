import React from 'react';
import './Feature.css'

const Feature = (props) => {
    const {icon,image,title,description} = props.feature;
    return (
        <div className="feature col-md-4 mb-3">
            <div className="card">
                <img className="card-img-top" src={image} alt=""/>
                <div className="card-body">
                    <div className="d-flex">
                        <img className="mr-2" height="40px" src={icon} alt=""/>
                        <div>
                            <h5> {title} </h5>
                            <p>{description} </p>
                            {
            
                                <span className="card-link collapse-btn">Show More <svg className="bi bi-arrow-right-circle-fill icon" width="20px" height="20px" viewBox="0 0 16 16" fill="limegreen" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"/>
                              </svg> </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;