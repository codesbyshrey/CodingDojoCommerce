import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/product')
      .then(response => {
        setProductList(response.data);
      })
      .catch(error => {
        console.error(error.response.data);
      });
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {productList.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <img src={product.image} alt={product.name} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
