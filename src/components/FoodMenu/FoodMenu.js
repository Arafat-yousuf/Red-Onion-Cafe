import React, { useState } from 'react';
import './FoodMenu.css'
import Food from '../Food/Food'
import FoodItems from '../../fakeData/foodItems.json'
import { Link } from 'react-router-dom';
const FoodMenu = (props) => {
    const [food, setFood] = useState(FoodItems);
    const [FoodType, setFoodType] = useState("Breakfast");

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
                        props ? 
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