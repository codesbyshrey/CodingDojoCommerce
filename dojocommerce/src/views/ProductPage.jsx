import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Grid, Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material'
import DisplayPants from './DisplayPants'


const ProductPage = () => {
    const [oneProduct, setOneProduct] = useState([])
    const [oneCategory, setOneCategory] = useState([])
    const [category, setCategory] = useState([])
    const [itemPants, setItemPants] = useState([])
    const [itemShort, setItemShort] = useState([])
    const [itemShirt, setItemShirt] = useState([])

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

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product`)
            .then(response => {
                const allProduct = response.data
                const categoryPants = allProduct.filter(item => item.category === "pants")
                setItemPants(categoryPants)
                const categoryShirt = allProduct.filter(item => item.category === "shirt")
                setItemShirt(categoryShirt)
                const categoryShort = allProduct.filter(item => item.category === "short")
                setItemShort(categoryShort)
            })
            .catch(err => {
                console.log(err)
            })
    }, [category])

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
                itemShirt ?
                    <div>
                        <DisplayPants />
                    </div> : <p></p>

            }
        </div >
    )
}

export default ProductPage