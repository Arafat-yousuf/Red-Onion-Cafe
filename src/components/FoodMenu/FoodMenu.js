import React, { useState, useEffect } from 'react';
import './FoodMenu.css'
import Food from '../Food/Food'
import { Link } from 'react-router-dom';
import { getDatabaseCart } from '../../Utilities/localCart';
const FoodMenu = (props) => {
    const [food, setFood] = useState([]);
    const [FoodType, setFoodType] = useState("Breakfast");
    const cart = getDatabaseCart();
    const cartLength = Object.keys(cart).length;
    //console.log(cartLength);

    useEffect(() => {
        fetch('http://localhost:4200/foods')
        .then(res => res.json())
        .then(data => {
            setFood(data);
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

            <div className="row my-5">
                {selectedFoods.map(food => <Food key={food.id} food={food} />)}
            </div>
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