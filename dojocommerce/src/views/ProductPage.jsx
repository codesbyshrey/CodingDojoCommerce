import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Grid, Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material'


const ProductPage = () => {
    const [oneProduct, setOneProduct] = useState([])

    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product`)
            .then(response => {
                console.log(response.data)
                setOneProduct(response.data)
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
            <div className='separator'>
                <span></span>
            </div>
            {
                oneProduct.map((eachProduct, idx) => (
                    <Card sx={{ maxWidth: 345 }}>
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

                        </CardActions>
                    </Card>
                ))
            }
            <div className='contentMain'>
                <div>
                    <h1 className='featureProduct'>feature product</h1>

                </div>
                <div>
                    <h3 className='border'>Product detail</h3>
                </div>
            </div>
            <div>
                <h1 className='extraPadding'>Related items</h1>
            </div>

            <div className='footer'>

                <Grid container spacing={4} sx={{ gap: "10px" }}>
                    {
                        oneProduct.map((eachProduct, idx) => (
                            <Grid row>
                                <Grid item lg={12} >
                                    <Card sx={{ maxWidth: 345 }}>
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