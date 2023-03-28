import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Grid, Card, CardHeader, CardContent } from '@mui/material'


const HomePage = () => {
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
            <h1>Home Pages</h1>
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
                <h2>display random items/category/inventory</h2>
            </div>
            <div>
                <h2 className='featuredMessage'>Feature Message</h2>
            </div>
            <Grid container spacing={2}>
                {
                    displayProduct.map((eachProduct, idx) => (
                        <Grid item md={3}>
                            <Card elevation={10}>
                                <CardHeader key={idx}>
                                    {eachProduct.name}
                                </CardHeader>
                                <CardContent>
                                    {eachProduct.description}
                                    {eachProduct.price}
                                </CardContent>
                            </Card>
                            <Grid item md={3}></Grid>
                            <Card elevation={10}>
                                <CardHeader key={idx}>
                                    {eachProduct.name}
                                </CardHeader>
                                <CardContent>
                                    {eachProduct.description}
                                    {eachProduct.price}
                                </CardContent>
                            </Card>
                            <Grid item md={3}></Grid>
                            <Card elevation={10}>
                                <CardHeader key={idx}>
                                    {eachProduct.name}
                                </CardHeader>
                                <CardContent>
                                    {eachProduct.description}
                                    {eachProduct.price}
                                </CardContent>
                            </Card>
                            <Grid item md={3}></Grid>
                            <Card elevation={10}>
                                <CardHeader key={idx}>
                                    {eachProduct.name}
                                </CardHeader>
                                <CardContent>
                                    {eachProduct.description}
                                    {eachProduct.price}
                                </CardContent>
                            </Card>
                        </Grid>

                    ))
                }
            </Grid>
        </ Container>
    )
}

export default HomePage