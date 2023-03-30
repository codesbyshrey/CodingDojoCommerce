const OrderController = require("../controllers/order.controller")
const ProductController = require("../controllers/product.controller")
const UserController = require("../controllers/user.controller")
const {authenticate} = require('../configs/jwt.config')

module.exports = (app) => {

    app.get("/api/user/testing", UserController.apiTestUser)
    app.get("/api/user/:id", UserController.oneUser)
    app.post("/api/user", UserController.createUser)
    app.put("/api/user/:id", UserController.updateUser)
    app.delete("/api/user/:id", UserController.deleteUser)
    //original material
    // new login registration backend
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.get("/api/users", authenticate, UserController.allUser);  
    app.post('/api/logout', UserController.logout); 
    app.get("/api/userss", UserController.allUser);

    // product controller
    app.get("/api/product/testing", ProductController.apiTestProduct)
    app.get("/api/product", ProductController.allProduct)
    app.get("/api/product/:id", ProductController.oneProduct)
    app.get("/api/cart/:id", ProductController.oneProduct)
    app.post("/api/product", ProductController.createProduct)
    app.put("/api/product/:id", ProductController.updateProduct)
    app.delete("/api/product/:id", ProductController.deleteProduct)

    // order controller
    app.get("/api/order/testing", OrderController.apiTestOrder)
    app.get("/api/order", OrderController.allOrder)
    app.get("/api/order/:id", OrderController.oneOrder)
    app.post("/api/order", OrderController.createOrder)
    app.put("/api/order/:id", OrderController.updateOrder)
    app.delete("/api/order/:id", OrderController.deleteOrder)
}
