import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Delivary.css';
import { removeFromDatabaseCart, getDatabaseCart, addToDatabaseCart } from '../../Utilities/localCart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';
import Loading from '../Loading/Loading';

const Delivary = (props) => {
    const [shippingAddressFilled, setShippingAddressFilled] = useState(false);
    const [paymentReady, setPaymentReady] = useState(false);
    const [deliveryDetails, setDeliveryDetails] = useState({
        todoor: null, road: null, flat: null, businessname: null, address: null
    });
    const { delivertodoor, road, flat, businessname, instruct } = deliveryDetails;
    const { register, handleSubmit, watch, errors } = useForm();
    const stripePromise = loadStripe('pk_test_51HAASpHWttGIGToiEvm33982N4iam18LvLWIK5WXePpxE8CnsfMDNWrqK675wKBjOhClvZZGpnVXwdhFF7rm4jMD00iJ87jAOl');
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState("block");

    const onSubmit = data => {
        setDeliveryDetails(data);
        setShippingAddressFilled(true);
        //getUserEmail(auth.user.email);
    };



    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.id !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(productKeys.length === 0){
            setLoading("none");
        }
        //console.log(productKeys.length);
        fetch('https://fathomless-tundra-96989.herokuapp.com/getFoodsById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                const cartProducts = productKeys.map(key => {
                    const product = data.find(pd => pd.id === key);
                    product.quantity = savedCart[key];
                    //console.log(product.quantity);
                    return product;
                });
                setCart(cartProducts);
                setLoading("none");
            })

    }, []);

    const handleCart = (productId, productQuantity) => {
        const newCart = cart.map(item => {
            if (item.id === productId) {
                item.quantity = productQuantity;
                //console.log(item.quantity);
                if (item.quantity !== 0)
                    addToDatabaseCart(item.id, item.quantity);
                else removeProduct(item.id);
            }
            return item;
        })
        setCart(newCart);
    }



    const subTotal = cart.reduce((acc, crr) => {
        return acc + (crr.price * crr.quantity);
    }, 0)
    const totalQuantity = cart.reduce((acc, crr) => {
        return acc + crr.quantity;
    }, 0)
    const tax = (subTotal / 100) * 5;
    const deliveryFee = totalQuantity && 2;
    const grandTotal = subTotal + tax + deliveryFee;
    return (
        <div className="delivary container pt-5 my-5">
            {
                paymentReady ?
                    <div style={{ display: 'block' }}
                        className="col-md-6">
                        <h3>Payment Information</h3>
                        <Elements stripe={stripePromise}>
                            <PaymentForm deliveryDetails={deliveryDetails}></PaymentForm>
                        </Elements>
                    </div>
                    :
                    <div className="row">
                        <div style={{ display: (delivertodoor && road && flat && businessname && instruct) ? "none" : "block" }} className="col-md-5">
                            <h4>Edit Delivery Details</h4>
                            <hr />
                            <form onSubmit={handleSubmit(onSubmit)} className="py-5">

                                <div className="form-group">
                                    <input name="delivertodoor" className="form-control" ref={register({ required: true })} defaultValue={delivertodoor} placeholder="Delivery To Door" />
                                    {errors.delivertodoor && <span className="error">This Option is required</span>}
                                </div>
                                <div className="form-group">
                                    <input name="road" className="form-control" ref={register({ required: true })} defaultValue={road} placeholder="Road No" />
                                    {errors.road && <span className="error">Road No is required</span>}
                                </div>
                                <div className="form-group">
                                    <input name="flat" className="form-control" ref={register({ required: true })} defaultValue={flat} placeholder="Flat, Suite or Floor" />
                                    {errors.flat && <span className="error">Flat, Suite or Floor is required</span>}
                                </div>
                                <div className="form-group">
                                    <input name="businessname" className="form-control" ref={register({ required: true })} defaultValue={businessname} placeholder="Business name" />
                                    {errors.businessname && <span className="error">Business name is required</span>}
                                </div>
                                <div className="form-group">
                                    <textarea name="instruct" ref={register({ required: true })} placeholder="instruct" className="form-control" cols="30" rows="2">{instruct}</textarea>
                                    {errors.instruct && <span className="error">Password is required</span>}
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-danger btn-block" type="submit">Save & Continue</button>
                                </div>
                            </form>
                        </div>
                        {
                            loading === "block" ?
                                <Loading loading={loading} />
                                :
                                <div className="offset-md-2 col-md-5">
                                    <div className="restaurant-info mb-5">
                                        <h4>Form <strong> Star Kabab And Restaura</strong></h4>
                                        <h5>Arriving in 20-30 min</h5>
                                        <h5>107 Rd No 9</h5>
                                    </div>

                                    {
                                        cart.map(item =>
                                            <div className="single-checkout-item mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3">
                                                <img width="100px" src={item.image} alt="" />
                                                <div>
                                                    <h6>{item.name}</h6>
                                                    <h4 className="text-danger">${item.price}</h4>
                                                    <p>Delivery free</p>
                                                </div>
                                                <div className="checkout-item ml-3 row">
                                                    <button onClick={() => handleCart(item.id, (item.quantity + 1))} className="btn font-weight-bolder">+</button>
                                                    <p className="bg-white m-1 pt-1 rounded">{item.quantity}</p>
                                                    {
                                                        item.quantity > 0 ?
                                                            <button className="btn font-weight-bolder" onClick={() => handleCart(item.id, (item.quantity - 1))}>-</button>
                                                            :
                                                            <button disabled className="btn font-weight-bolder">-</button>

                                                    }
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className="cart-calculation">
                                        <p className="d-flex justify-content-between"><span>Sub Total . {totalQuantity} Item</span> <span>${subTotal.toFixed(2)}</span></p>
                                        <p className="d-flex justify-content-between"><span>Tax</span> <span>${tax.toFixed(2)}</span></p>
                                        <p className="d-flex justify-content-between"><span>Delivery Fee</span> <span>${deliveryFee}</span></p>
                                        <p className="h5 d-flex justify-content-between"><span>Total</span> <span>${grandTotal.toFixed(2)}</span></p>
                                        {
                                            totalQuantity ?
                                                shippingAddressFilled ?
                                                    <button onClick={() => setPaymentReady(true)} className="btn btn-danger btn-block">Check Out Your Food</button>
                                                    :
                                                    <button onClick={() => alert("Please Fill Up The Address!")} className="btn btn-danger btn-block">Check Out Your Food</button>

                                                :
                                                <button disabled className="btn btn-block btn-secondary">Nothing to Checkout</button>

                                        }
                                    </div>
                                </div>
                        }
                    </div>

            }

        </div>
    );
};

export default Delivary;