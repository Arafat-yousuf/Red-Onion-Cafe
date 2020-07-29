import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import Food from '../Food/Food';
import './SearchFood.css'

const SearchFood = () => {
    const [food, setFood] = useState([]);
    const {query} = useParams();
    
    useEffect(() => {
        fetch('http://localhost:4200/foods')
        .then(res => res.json())
        .then(data => {
            setFood(data);
        })
        .catch(err => console.log(err))
    } ,[food.length])

    const queryResult = food.filter(food => food.name.toLowerCase().includes(query.toLowerCase()) );
    return (
        <div className="container food-area">
                <h4 className="text-center search-res-title">Search Result</h4>
                <div className="row my-5">
                    {
                    queryResult.length === 0 && <h1 className="col-12 display-5 text-center">No food found!</h1>
                    }
                    
                    {
                        queryResult.map(food => <Food key={food.id} food={food}></Food>)
                    }
                </div>
                <div className="text-center">
                    <Link to="/">
                        <button  className="btn btn-danger btn-secondary">See Our all Foods</button>
                    </Link>

                </div>
            </div>
    );
};

export default SearchFood;