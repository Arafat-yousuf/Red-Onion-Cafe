import React from 'react';
import {Link} from 'react-router-dom';
const Food = (props) => {
    const {id,name,shortDescription,price,image} = props.food;
    return (
        <div className="col-md-4 mb-4">
            <Link to={"food/"+id}>
                <div className="card text-center">
                    <img src={image} alt="" className="card-img-top"/>
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