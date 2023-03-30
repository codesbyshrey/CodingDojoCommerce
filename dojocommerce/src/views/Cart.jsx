// Cart Page
import React from "react"
import { Link, useNavigate } from "react-router-dom"

const EmptyCart = () => {
    return (
        <div> 
            <h1> Your Cart is Empty </h1>
            <Link to="/"> Return to Dojo Commerce </Link>
        </div>
    )
}

const Cart = () => {

    const navigate = useNavigate();

    const updateCart = () => {
        console.log("Update Cart")
    }

    const removeItem = () => {
        console.log("Remove Item")
    }

    const checkoutHandler = () => {
        navigate('/test/register') //navigate back to home page for now
    }


    return (
        // if cart exists? then display 

        <div className="cartContainer">
            <EmptyCart/>

            <h1> Refresh Cart <button type="button" onClick={updateCart}> Update </button>  </h1>
            <h3> Your Cart </h3>
            <div className="cartProducts">
                <h4> Your Items </h4>
            </div>
            <div className="orderSummary"> 
                <h4> Summary (x items) </h4>
                <button type="button" onClick={removeItem}> Remove This Item </button>
            </div>
            <button type="submit"> <Link to="/test/checkout"> Checkout </Link> </button>
            <button type="submit" onClick={checkoutHandler}> checkout(register) </button>
        </div>
    )
}

export default Cart;