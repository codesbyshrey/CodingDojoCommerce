const { User, Product, Order } = require('../models/project.model');

module.exports.apiTestOrder = (req, res) => {
    res.json({ message: "Order controller is working" })
}

module.exports.allOrder = (req, res) => {
    Order.find()
        .then(OrderList => res.json(OrderList))
        .catch(err => res.status(400).json(err))
}

module.exports.oneOrder = (req, res) => {
    Order.findOne({ _id: req.params.id })
        .then(oneOrder => res.json(oneOrder))
        .catch(err => res.status(400).json(err))
}

module.exports.createOrder = (req, res) => {
    const newOrder = req.body
    Order.create(newOrder)
        .then(addedOrder => res.json(addedOrder))
        .catch(err => res.status(400).json(err))
}

module.exports.updateOrder = (req, res) => {
    Order.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedOrder => res.json(updatedOrder))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteOrder = (req, res) => {
    Order.deleteOne({ _id: req.params.id })
        .then(message => res.json(message))
        .catch(err => res.status(400).json(err))
}
