import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Grid, Card, CardHeader, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material'


const ProductPage = () => {
    const [displayProduct, setDisplayProduct] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(response => {
                console.log(response.data)
                setDisplayProduct(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Container>
            <h1>Product Page</h1>
            <div>
                <h3 className='nav'> Site Name
                    <Link to="/">shirt</Link>|
                    <Link to="/">pant</Link>|
                    <Link to="/">short</Link>
                    Search option
                    <Link to='/test/cart'>cart</Link>
                </h3>
            </div>
            <div className='featuredItem'>
                {
                    displayProduct.map((eachItem, idx) => (
                        <ol key={idx}>
                            <li>{eachItem.name}</li>
                            <li>{eachItem.description}</li>
                            <li>{eachItem.price}</li>
                            <li>{eachItem.category}</li>
                        </ol>
                    ))
                }
            </div>

            <div className='footer'>
                <Grid container spacing={4} sx={{ gap: "10px" }}>
                    {
                        displayProduct.map((eachProduct, idx) => (
                            <Grid row>
                                <Grid item lg={12} >
                                    <Card sx={{ maxWidth: 345, width: "400px", height: "400px" }}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            img src={eachProduct.image} alt={eachProduct.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {eachProduct.name}
                                            </Typography>
                                            {eachProduct.category}
                                            <Typography variant="body2" color="text.secondary">
                                                {eachProduct.description}
                                            </Typography>
                                            ${eachProduct.price}
                                        </CardContent>
                                        <CardActions>
                                            <Link to='/test/cart'>add to Cart</Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </ Container >
    )
}

export default ProductPage