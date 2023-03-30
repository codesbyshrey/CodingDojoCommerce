import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Grid, Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material'
import DisplayPants from './DisplayPants'
import DisplayShirt from './DisplayShirt'
import DisplayShort from './DisplayShort'


const ProductPage = () => {
    const [oneProduct, setOneProduct] = useState([])

    const [oneCategory, setOneCategory] = useState([])
    const [category, setCategory] = useState([])


    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then(response => {
                setOneProduct(response.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [id])

    return (
        <div className='separator'>
            <div className='featuredItem'>
                <img src={oneProduct.image} height="600px" width="500px" alt={oneProduct.name} />
                <ul>
                    <h3>{oneProduct.name}</h3>
                    <li>{oneProduct.description}</li>
                    <li>${oneProduct.price}</li>
                    <li>{oneProduct.category}</li>
                    <Link to='/test/cart'>Add to Cart </Link>
                </ul>
            </div>
            <h3 className='extraPadding'> Related Items: </h3>
            {
                oneProduct && oneProduct.category === "shirt" &&
                <div>
                    <DisplayShirt />
                </div>
            }
            {
                oneProduct && oneProduct.category === "short" &&
                <div>
                    <DisplayShort />
                </div>
            }
            {
                oneProduct && oneProduct.category === "pants" &&
                <div>
                    <DisplayPants />
                </div>
            }
        </div >
    )
}

export default ProductPage