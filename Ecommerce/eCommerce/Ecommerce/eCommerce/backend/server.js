import express from 'express'
import data from './data.js';

const app = express();

app.get('/api/products/', (req, res) => {
    res.send(data.products) //send data to the front end
})
app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: "product not found"})
    }
    // res.send(data.product) //send data to the front end
})

const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`SERVER AT http://localhost:${port}`)})