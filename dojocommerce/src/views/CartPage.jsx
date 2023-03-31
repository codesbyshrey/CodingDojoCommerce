import React from 'react'
import { Link } from 'react-router-dom';

const CartPage = ({ cart }) => {

    return (
        <div>
            <h2>Cart Items:</h2>
            {
                cart ?
                <div>
                {
                cart.map((item, index) => (
                    <ul key={index}>
                        <li>{item.name}</li>
                    </ul>
                ))}
                </div> :
                <div>
                    <h1> Your Cart is Empty </h1>
                    <Link to="/"> Return to Dojo Commerce </Link>
                </div>
                }
        </div>
    );
};


export default CartPage