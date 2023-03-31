// Cart Page
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const EmptyCart = () => {
    return (
        <div> 
            <h1> Your Cart is Empty </h1>
            <Link to="/"> Return to Dojo Commerce </Link>
        </div>
    )
}

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([])

    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/order`)
            .then(response => {
                console.log(response.data)
                setCartProducts(response.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [id])

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

            <h1> <button className="btn" type="button" onClick={updateCart}> Update </button>  </h1>
            <div className="cartProducts">
                <h4> Your Items </h4>
                <div className='featuredItem'>
                    <ul>
                        <li>{cartProducts.name}</li>
                        <li>${cartProducts.price}</li>
                    </ul>
                </div>
            </div>
            <div className="orderSummary"> 
                <button className="btn btn-danger" type="button" onClick={removeItem}> Remove This Item </button>
            <button href="/test/checkout" className="btn btn-primary" type="submit"> <Link to="/test/checkout"> Checkout </Link> </button>
            <button className="btn btn-secondary" type="submit" onClick={checkoutHandler}> Checkout(Register) </button>
            </div>
            <br/>
            <hr/>
            <br/>
            <h2> Current Orders: </h2>
            <div>
                {
                    cartProducts.map((eachOrder, index) => (
                        <div key={index}>
                            <p> {eachOrder.user}</p>
                            <p> {eachOrder.products} </p>
                            <p> {eachOrder.total} </p>
                            <p> {eachOrder.status} </p>
                            <hr/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cart;