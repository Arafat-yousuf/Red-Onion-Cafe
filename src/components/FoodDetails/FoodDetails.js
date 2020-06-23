import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FoodItem from '../../fakeData/foodItems.json';
import './FoodDetails.css'

const FoodDetails = (props) => {
    const {id} = useParams();
    //console.log(id);  
    const selectedFood =  FoodItem.find(food => food.id === parseInt(id));
    //console.log(selectedFood);
    console.log("hello");
    const [quantity, setQuantity] = useState(1);
    const handleCart = (currentFood) => {
        currentFood.quantity = quantity;
        props.handleCart(currentFood);
    }
    return (
        <div className = "food-details my-5 pt-5 container">
            <div className="row">
                <div className="col-md-6 pr-md-4">
                    <h1>{selectedFood.name}</h1>

                    <p className="my-5">{selectedFood.fullDescription}</p>
                    <div className="d-flex  my-4">
                        <h2 className="price">${selectedFood.price}</h2>

                        <div className="cart-controller ml-3">
                            <button className="btn inc-btn shadow-none" onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}><svg className="bi bi-dash" width="30px" height="30px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z" />
                            </svg></button> 
                            <h4>{quantity}</h4> 
                            <button className="btn dec-btn shadow-none" onClick={() => setQuantity(quantity + 1)}><svg className="bi bi-plus" width="30px" height="30px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                                <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                            </svg></button>
                        </div>
                    </div>
                    <div className="action d-flex align-items-center">
                    <Link to="/">
                        <button className="btn btn-danger btn-rounded mb-4" onClick={() => handleCart(selectedFood)}><svg className="bi bi-cart-plus mr-2" width="20px" height="20px" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8.5 5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z" />
                            <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0v-2z" />
                            <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg> Add</button>
                        </Link>
                    </div>
                    <div className="more-img">
                        <img className="img-fluid" src={selectedFood.image} alt="" />
                        <img className="img-fluid" src={selectedFood.image} alt="" />
                        <svg className="bi bi-chevron-right" width="50px" height="50px" viewBox="0 0 16 16" fill="gray" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>

                </div>
                <div className="col-md-6">
                    <img className="img-fluid" src={selectedFood.image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;