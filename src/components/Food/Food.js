import React from 'react';
import {Link} from 'react-router-dom';
import './Food.css';
import { getDatabaseCart } from '../../Utilities/localCart';
const Food = (props) => {
    const {id,name,shortDescription,price,image} = props.food;
    const cart = getDatabaseCart();
    const cartKeys = Object.keys(cart);
    const addedFood = cartKeys.find(element => element == id);
    //console.log(cart[addedFood]);
    return (
        <div className="col-md-4 mb-4">
            <Link to={"/food/"+id}>
                <div className="card text-center">
                    <div className="image">

                    <img src={image} alt="" className="card-img-top"/>

                    {
                        addedFood?
                        <div className="top-right ">{cart[addedFood]}</div>
                        :
                        <div ></div>
                        
                    }


                    </div>
                    <div className="card-body">
                        <h5>{name}</h5>
                        <p className="text-secondary">{shortDescription}</p>
                        <h4>${price.toFixed(2)}</h4>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Food;