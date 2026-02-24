import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import DisplayPants from './DisplayPants'
import DisplayShirt from './DisplayShirt'
import DisplayShort from './DisplayShort'


const ProductPage = () => {
    // holds the product being viewed
    const [oneProduct, setOneProduct] = useState([])

    // read id from the URL (/test/product/:id)
    const { id } = useParams()

    // when id changes, load that specific product from the API
    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then(response => {
                setOneProduct(response.data)
                window.scrollTo(0,0)
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
                    {/* navigates to the cart page – cart data itself is handled elsewhere */}
                    <Link to='/test/cart'>Add to Cart </Link>
                </ul>
            </div>
            <h3 className='extraPadding'> Related Items: </h3>
            {
                oneProduct && (oneProduct.category === "shirt" || oneProduct.category === "shirts") &&
                <div>
                    <DisplayShirt />
                </div>
            }
            {
                oneProduct && (oneProduct.category === "short" || oneProduct.category === "shorts") &&
                <div>
                    <DisplayShort />
                </div>
            }
            {
                oneProduct && (oneProduct.category === "pants" || oneProduct.category === "pant") &&
                <div>
                    <DisplayPants />
                </div>
            }
        </div >
    )
}

export default ProductPage