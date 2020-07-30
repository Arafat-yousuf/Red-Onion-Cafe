import React from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabaseCart, clearLocalShoppingCart } from '../../Utilities/localCart';
import { useAuth } from '../Login/useAuth';

const PaymentForm = (props) => {
    const [paymentError, setPaymentError] = useState(null);
    const [paymentFinished, setPaymentFinished] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const auth = useAuth();

    const checkOutCart = (payment) => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: savedCart,
            shipment: props.deliveryDetails,
            payment: payment
        };
        fetch('http://localhost:4200/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(order => {
                clearLocalShoppingCart();
                //console.log(order);
                setOrderId(order._id);
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if (error) {
            setPaymentError(error.message);
            setPaymentFinished(null);
        }
        else {
            setPaymentFinished(paymentMethod);
            const payment = { id: paymentMethod.id, last4: paymentMethod.card.last4 }
            checkOutCart(payment);
            setPaymentError(null);
        }
        //console.log(typeof orderId);

    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>Pay</button>
                {
                    paymentError && <p style={{ color: 'red' }}>{paymentError}</p>
                }
                {
                    paymentFinished && <p style={{ color: 'green' }}>Payment Successfull</p>
                }
            </form>
            {
                paymentFinished ?
                    <Link to={"/deliveryStatus/"+orderId}>
                        <button className="btn btn-danger btn-block mt-3">Track Your Order</button>
                    </Link>
                    :
                    <button disabled className="btn btn-block btn-secondary mt-3">Track Your Order</button>
    }
        </div>

    );
};

export default PaymentForm;