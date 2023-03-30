import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Grid, Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material'


const ProductPage = () => {
    const [oneProduct, setOneProduct] = useState([])

    const [oneCategory, setOneCategory] = useState([])
    // const [category, setCategory] = useState([])
    // const [similarCategory, setSimilarCategory] = useState([])
    const list = []
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then(response => {
                setOneProduct(response.data)
                console.log(response.data.category)
            })
            .catch(err => {
                console.log(err)
            })


    }, [id])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product`)
            .then(response => {
                //setOneCategory(response.data)
                const allProduct = response.data
                allProduct.forEach((item, idx) => {
                    if (item.category === "shirt") {
                        list.push(item)
                    }
                })
                setOneCategory(list)
                // console.log(setOneCategory)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='separator'>
            <div className='featuredItem'>
                <img src={oneProduct.image} height="600px" width="500px" alt={oneProduct.name} />
                <ul>
                    <h3>{oneProduct.name}</h3>
                    <li>{oneProduct.description}</li>
                    <li>${oneProduct.price}</li>
                    <li>{oneProduct.category}</li>
                    <Link to='/test/cart'>add to Cart</Link>
                </ul>
            </div>
            <h3 className='extraPadding'>Related items</h3>
            {
                oneCategory.map((eachCategory, idx) => (
                    <div key={idx}>
                        <h3>{eachCategory.name}</h3>
                        <li>{eachCategory.description}</li>
                        <li>${eachCategory.price}</li>
                    </div>
                ))}
        </div>
    )
}

export default ProductPage