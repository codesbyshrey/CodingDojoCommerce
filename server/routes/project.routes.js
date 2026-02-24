// central place to wire Express routes to their controllers
const OrderController = require("../controllers/order.controller")
const ProductController = require("../controllers/product.controller")
const UserController = require("../controllers/user.controller")
const {authenticate} = require('../configs/jwt.config')

module.exports = (app) => {

    // --- user routes ---
    app.get("/api/user/testing", UserController.apiTestUser)
    app.get("/api/user/:id", UserController.oneUser)
    app.post("/api/user", UserController.createUser)
    app.put("/api/user/:id", UserController.updateUser)
    app.delete("/api/user/:id", UserController.deleteUser)
    // login / registration endpoints
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    // example of a protected route – requires valid JWT cookie
    app.get("/api/users", authenticate, UserController.allUser);  
    // clear auth cookie to "log out" the current user
    app.post('/api/logout', UserController.logout); 
    app.get("/api/userss", UserController.allUser);

    // --- product routes ---
    app.get("/api/product/testing", ProductController.apiTestProduct)
    app.get("/api/product", ProductController.allProduct)
    app.get("/api/product/:id", ProductController.oneProduct)
    app.get("/api/cart/:id", ProductController.oneProduct)
    app.post("/api/product", ProductController.createProduct)
    app.put("/api/product/:id", ProductController.updateProduct)
    app.delete("/api/product/:id", ProductController.deleteProduct)

    // --- order routes ---
    app.get("/api/order/testing", OrderController.apiTestOrder)
    app.get("/api/order", OrderController.allOrder)
    app.get("/api/order/:id", OrderController.oneOrder)
    app.post("/api/order", OrderController.createOrder)
    app.put("/api/order/:id", OrderController.updateOrder)
    app.delete("/api/order/:id", OrderController.deleteOrder)
}
