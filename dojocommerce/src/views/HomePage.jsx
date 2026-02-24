import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Grid, Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material'
import CartPage from './CartPage'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
    // full list of products loaded from the API
    const [displayProduct, setDisplayProduct] = useState([])
    // single randomly chosen product highlighted at the top
    const [randomProduct, setRandomProduct] = useState([])
    // simple in‑memory cart for the current session in this component
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart([...cart, product])
        console.log(cart)
        // bring user focus back to the top of the page when cart changes
        window.scrollTo(0, 30)
    }

    const navigate = useNavigate();
    const checkoutHandler = () => {
        // for now, "checkout" just pushes the user into the login flow
        navigate('/test/login')
        // future improvement: decide where to send based on auth state
    }

    // on mount, load product list from backend and choose a random featured item
    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(response => {
                setDisplayProduct(response.data)
                const products = response.data
                const randomIndex = Math.floor(Math.random() * products.length)
                setRandomProduct(products[randomIndex])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Container>
            <h1>Featured Product</h1>
            <div className='featuredItem'>
                <img src={randomProduct.image} height="500px" width="500px" alt={randomProduct.name} />
                <ul>
                    <h3><Link to={`/test/product/${randomProduct._id}`}>{randomProduct.name}</Link></h3>
                    <li>{randomProduct.description}</li>
                    <li>${randomProduct.price}</li>
                    <li>{randomProduct.category}</li>
                    <button onClick={() => addToCart(randomProduct)}>Add Product to Cart</button>
                </ul>
                <div className='cart'>
                    <h3>Cart Content:</h3>
                    {
                        cart.map((eachProduct, idx) => (
                            <div key={idx}>
                                <ol >
                                    {eachProduct.name}: ${eachProduct.price}
                                </ol>
                            </div>

                        ))
                    }
                    {/* total is currently not computed – could be derived from cart.reduce(...) */}
                    <h4>Total Amount: {cart.price}</h4>
                    <button className="btn btn-secondary" type="submit" onClick={checkoutHandler}> Checkout </button>
                </div>
            </div>
            <br />
            <hr />
            <br />
            <div>
                <h2 className='featuredMessage'> Products Available: </h2>
            </div>
            <div>
                <Grid container spacing={3} sx={{ gap: "10px" }}>
                    {
                        displayProduct.map((eachProduct, idx) => (
                            <div key={idx}>
                                <Grid>
                                    <Grid item lg={12} >
                                        <Card sx={{ maxWidth: 200, maxHeight: 500 }}>
                                            <CardMedia
                                                component="img"
                                                height="250px"
                                                img src={eachProduct.image}
                                                alt={eachProduct.name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    <Link to={`/test/product/${eachProduct._id}`}>{eachProduct.name}</Link>
                                                </Typography>
                                                {eachProduct.category}
                                                <Typography variant="body2" color="text.secondary">
                                                    {eachProduct.description}
                                                </Typography>
                                                ${eachProduct.price}
                                            </CardContent>
                                            <CardActions>
                                                {/* clicking here adds the item to the local cart but keeps you on the same page */}
                                                <button onClick={() => addToCart(eachProduct)}>Add Product to Cart</button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                        ))
                    }
                </Grid>
                <hr />
                <br />
                <hr />
                {/* separate cart summary view that reuses the same cart state */}
                <CartPage cart={cart} />
            </div>
        </ Container >
    )
}

export default HomePage