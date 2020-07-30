import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './FoodDetails.css'
import { Plus,Dash,CartPlus,ChevronCompactRight } from 'react-bootstrap-icons';
import { addToDatabaseCart, getDatabaseCart } from '../../Utilities/localCart';
import Loading from '../Loading/Loading';

const FoodDetails = (props) => {
    const [selectedFood,setSelectedFood] = useState({})
    const {id} = useParams();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState("block");
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch("http://localhost:4200/food/"+ id)
        .then(res=>res.json())
        .then(data => {
            setSelectedFood(data);
            setLoading("none");
            const product = productKeys.find( pd => pd === data.id);
            if(product)
            setQuantity(savedCart[data.id]);
        })
        .catch(err => console.log(err))
    },[id])

    const handleCart = (currentFood) => {
       addToDatabaseCart(currentFood.id,quantity);
    }
    /*const {id} = useParams();
    console.log(id);  
    const selectedFood =  FoodItem.find(food => food.id === parseInt(id));
    console.log(selectedFood);
    console.log(selectedFood.quantity);
    const [quantity, setQuantity] = useState(selectedFood.quantity);
    const handleCart = (currentFood) => {
        currentFood.quantity = quantity;
        props.handleCart(currentFood);
    }*/
    return (
        <div className = "food-details my-5 pt-5 container">
            {
            loading==="block"?
            <Loading loading={loading}/>
            :
            <div className="row">
                <div className="col-md-6 pr-md-4">
                    <h1>{selectedFood.name}</h1>

                    <p className="my-5">{selectedFood.fullDescription}</p>
                    <div className="d-flex  my-4">
                        <h2 className="price">${selectedFood.price*quantity}</h2>

                        <div className="cart-controller ml-3">
                            <button className="btn inc-btn shadow-none" onClick={() => {setQuantity(quantity <= 1 ? 1 : quantity - 1)}}><Dash size="30px"/></button> 
                            <h4>{quantity}</h4> 
                            <button className="btn dec-btn shadow-none" onClick={() => {setQuantity(quantity + 1)}}><Plus size="30px"/></button>
                        </div>
                    </div>
                    <div className="action d-flex align-items-center">
                    <Link to="/">
                        <button className="btn btn-danger btn-rounded mb-4" onClick={() => handleCart(selectedFood)}><CartPlus className="mr-2" size="20px"/> Add</button>
                        </Link>
                    </div>
                    <div className="more-img">
                        <img className="img-fluid" src={selectedFood.image} alt="" />
                        <img className="img-fluid" src={selectedFood.image} alt="" />
                        <ChevronCompactRight size="50px" color="gray"/>
                    </div>

                </div>
                <div className="col-md-6">
                    <img className="img-fluid" src={selectedFood.image} alt="" />
                </div>
            </div>
}
        </div>
    );
};

export default FoodDetails;