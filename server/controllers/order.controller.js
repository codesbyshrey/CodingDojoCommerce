const { User, Product, Order } = require('../models/project.model');

// basic ping endpoint to confirm the order controller is wired correctly
module.exports.apiTestOrder = (req, res) => {
    res.json({ message: "Order controller is working" })
}

// list all orders currently stored in MongoDB
module.exports.allOrder = (req, res) => {
    Order.find()
        .then(OrderList => res.json(OrderList))
        .catch(err => res.status(400).json(err))
}

// retrieve a single order by id
module.exports.oneOrder = (req, res) => {
    Order.findOne({ _id: req.params.id })
        .then(oneOrder => res.json(oneOrder))
        .catch(err => res.status(400).json(err))
}

// create a new order using posted request body
module.exports.createOrder = (req, res) => {
    const newOrder = req.body
    Order.create(newOrder)
        .then(addedOrder => res.json(addedOrder))
        .catch(err => res.status(400).json(err))
}

// update an existing order document
module.exports.updateOrder = (req, res) => {
    Order.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedOrder => res.json(updatedOrder))
        .catch(err => res.status(400).json(err))
}

// delete an order document
module.exports.deleteOrder = (req, res) => {
    Order.deleteOne({ _id: req.params.id })
        .then(message => res.json(message))
        .catch(err => res.status(400).json(err))
}
