import React from 'react'

const CartPage = ({ cart }) => {

    return (
        <div>
            <h2>Cart Items:</h2>
            {
                cart.map((item, index) => (
                    <ul key={index}>
                        <li>{item.name}</li>
                    </ul>
                ))}
        </div>
    );
};


export default CartPage