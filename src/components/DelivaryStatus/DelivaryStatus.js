import React from 'react';
import { useState } from 'react';
import map from '../../Images/map.png'
import rider from '../../Images/Image/Group 1151.png'
import helmet from '../../Images/Image/Group 1152.png'

const DelivaryStatus = (props) => {
    return (
        <div className="container pt-5 my-5">
            <div className="row">
                <div className="col-md-8">
                    <img className="img-fluid" src={map} alt=""/>
                </div>
                <div className="col-md-4 pl-md-5">
                    <div className="bg-light p-3 rounded">
                        <img className="w-25 ml-5" src={rider} alt=""/>
                        <div className="bg-white  rounded p-3 my-3">
                            
                            <div>   
                                <h5>Your Location</h5>
                                {
                                    props.deliveryDetails  ?
                                   <p>{props.deliveryDetails.flat}, {props.deliveryDetails.road}</p> 
                                   : <p>Loading data ...</p>
                                } 
                            </div>
                            <div>
                                <h5>Shop Address</h5>
                                <p>Kebab Wala</p>
                            </div>
                        </div>
                        <h1>09:00</h1>
                        <p>Estimated Delivery</p>

                        <div className="bg-white rounded p-3 d-flex">
                            <img className="w-25 mr-2" src={helmet} alt=""/>
                            <div>
                                <h6>Foisal Reza</h6>
                                <p>Your Rider</p>
                            </div>
                        </div>

                        <button className="btn btn-block my-3 btn-danger">Contact</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DelivaryStatus;