const { Product } = require('../models/project.model');

module.exports.apiTestProduct = (req, res) => {
    res.json({ message: "Product controller is working" })
}

module.exports.allProduct = (req, res) => {
    Product.find()
        .then(ProductList => res.json(ProductList))
        .catch(err => res.status(400).json(err))
}

module.exports.oneProduct = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(oneProduct => res.json(oneProduct))
        .catch(err => res.status(400).json(err))
}

module.exports.createProduct = (req, res) => {
    const newProduct = req.body
    Product.create(newProduct)
        .then(addedProduct => res.json(addedProduct))
        .catch(err => res.status(400).json(err))
}

module.exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(message => res.json(message))
        .catch(err => res.status(400).json(err))
}
