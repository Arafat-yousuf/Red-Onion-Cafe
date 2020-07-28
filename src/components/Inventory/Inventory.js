import React from 'react';
import foods from '../../fakeData/foodItems';
import features from '../../fakeData/features';
const Inventory = () => {
    const dataPoster = (url, dataToPost) => {
        fetch(url , {
            method : "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(dataToPost)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err  => console.log(err))
    }


    return (
        <div className="container py-5">
            <h1>Inventory Management</h1>
            <button onClick={() => dataPoster('http://localhost:4200/addFoods',foods)} className="btn btn-danger mr-2">Add products</button>
            <button onClick={() => dataPoster('http://localhost:4200/addFeatures', features)} className="btn btn-danger">Add Features</button>
        </div>
    );
};

export default Inventory;