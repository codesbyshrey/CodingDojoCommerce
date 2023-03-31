import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Grid, Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material'
import { Link } from 'react-router-dom'

const DisplayPants = () => {
    const [oneCategory, setOneCategory] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product`)
            .then(response => {
                const allProduct = response.data
                const categoryProducts = allProduct.filter(item => item.category === "pants" || item.category === "pant")
                console.log(categoryProducts)
                setOneCategory(categoryProducts)
                window.scrollTo(0,0)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h2 className='separator'>Category: Pants</h2>
            <Container>
                <div>
                    <Grid container spacing={4} sx={{ gap: "10px" }}>
                        {
                            oneCategory.map((eachCategory, idx) => (
                                <div key={idx}>
                                    <Grid>
                                        <Grid item lg={12} >
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="345px"
                                                    img src={eachCategory.image}
                                                    alt={eachCategory.name}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        <Link to={`/test/product/${eachCategory._id}`}>{eachCategory.name}</Link>
                                                    </Typography>
                                                    {eachCategory.category}
                                                    <Typography variant="body2" color="text.secondary">
                                                        {eachCategory.description}
                                                    </Typography>
                                                    ${eachCategory.price}
                                                </CardContent>
                                                <CardActions>
                                                    <Link to='/test/cart'>add to Cart</Link>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))
                        }
                    </Grid>
                </div>
            </ Container >
        </div>
    )
}

export default DisplayPants