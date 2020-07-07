import React from 'react';
import './Feature.css'
import { ArrowRightCircleFill } from 'react-bootstrap-icons';

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
            
                                <span className="card-link collapse-btn">Show More <ArrowRightCircleFill className ="ml-2" color = "limegreen" size="20px" ></ArrowRightCircleFill> </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;