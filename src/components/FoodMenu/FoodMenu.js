import React, { useState, useEffect } from 'react';
import './FoodMenu.css'
import Food from '../Food/Food'
import { Link } from 'react-router-dom';
import { getDatabaseCart } from '../../Utilities/localCart';
import Loading from '../Loading/Loading';

const FoodMenu = (props) => {
    const [food, setFood] = useState([]);
    const [FoodType, setFoodType] = useState("Breakfast");
    const [loading, setLoading] = useState("block");
    const cart = getDatabaseCart();
    const cartLength = Object.keys(cart).length;
    //console.log(cartLength);

    useEffect(() => {
        fetch('https://fathomless-tundra-96989.herokuapp.com/foods')
        .then(res => res.json())
        .then(data => {
            setFood(data);
            setLoading("none");
        })
        .catch(err => console.log(err))
    } ,[])
    
   // console.log(food);
    const selectedFoods =  food.filter(food => food.type === FoodType)

    return (
        <div className="container food-area">
                <nav>
                    <ul className="nav justify-content-center">
                        <li onClick={() => setFoodType("Breakfast")} className="nav-item">
                            <span  to="breakfast" className={FoodType === "Breakfast" ?  "active nav-link" : "nav-link"}>Breakfast</span>
                        </li>
                        <li onClick={() => setFoodType("Lunch")} className="nav-item">
                            <span to="breakfast" className={FoodType === "Lunch" ?  "active nav-link" : "nav-link"}>Lunch</span>
                        </li>
                        <li onClick={() => setFoodType("Dinner")} className="nav-item">
                            <span to="breakfast" className={FoodType === "Dinner" ?  "active nav-link" : "nav-link"}>Dinner</span>
                        </li>
                    </ul>
                </nav>

            {
                loading === "block" ?
                    <Loading loading={loading} />
                    :
                    <div className="row my-5">

                        {selectedFoods.map(food => <Food key={food.id} food={food} />)}
                    </div>
            }
                <div className="text-center">
                    {
                        cartLength ? 
                        <Link to="/checkout">
                            <button  className="btn btn-danger">Check Out Your Food</button>
                        </Link>
                        :
                        <button disabled className="btn btn-secondary">Check Out Your Food</button>

                    }

                </div>
            </div>
    );
};

export default FoodMenu;