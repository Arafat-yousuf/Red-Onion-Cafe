import React from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentForm = (props) => {
    const [paymentError, setPaymentError] = useState(null);
    const [paymentFinished, setPaymentFinished] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

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
            props.checkOutCart(payment);
            setPaymentError(null);
        }

    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pay
      </button>
                {
                    paymentError && <p style={{ color: 'red' }}>{paymentError}</p>
                }
                {
                    paymentFinished && <p style={{ color: 'green' }}>Payment Successfull</p>
                }
            </form>
            {
                paymentFinished ?
                    <Link to="/deliveryStatus">
                        <button className="btn btn-danger btn-block">Track Your Order</button>
                    </Link>
                    :
                    <button disabled className="btn btn-block btn-secondary">Track Your Order</button>
    }
        </div>

    );
};

export default PaymentForm;