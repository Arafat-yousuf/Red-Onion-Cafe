import React, { useState, useEffect } from 'react';
import Feature from '../Feature/Feature';
import Loading from '../Loading/Loading';

const FeatureSet = (props) => {
    const [features , setFeatures] = useState([]);
    const [loading, setLoading] = useState("block");

    useEffect(() => {
        fetch('http://localhost:4200/features')
        .then(res => res.json())
        .then(data => {
            setFeatures(data);
            setLoading("none");
        })
        .catch(err => console.log(err))
} ,[])
    
    return (
        <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6">
                            <h2>Why you choose us</h2>
                            <p className="mt-3 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sapiente eaque repellendus asperiores nisi! Architecto, praesentium eligendi consequatur inventore fuga eius totam officia adipisci. Nostrum quia soluta vel distinctio delectus!</p>
                            </div>
                        </div>
                    </div>
                    <Loading loading={loading}/>
                    {
                        features.map( feature => <Feature key={feature.id} feature={feature}/>)
                    }
                    
                </div>
            </div>
    );
};

export default FeatureSet;