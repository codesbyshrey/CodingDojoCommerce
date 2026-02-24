## CodingDojoCommerce – Design & Walkthrough

This document explains **how the application is structured** and walks through the **core flows** (auth, browsing, and orders). It is meant to complement the main `README.md`.

---

## 1. High‑Level Architecture

+ **Frontend (`dojocommerce/`)**
  + React SPA (Create React App).
  + React Router is used to define all page‑level routes in `App.js`.
  + Axios is used to communicate with the backend API.
  + Styling is a mix of Bootstrap, React‑Bootstrap components, and Material UI cards/layout.

+ **Backend (`server/`)**
  + Express application configured in `server.js`.
  + MongoDB Atlas connection configured once in `configs/mongoose.config.js`.
  + Mongoose models for `User`, `Product`, and `Order` live in `models/project.model.js`.
  + Controllers encapsulate logic for each resource (`user.controller.js`, `product.controller.js`, `order.controller.js`).
  + Routes are wired in a single place: `routes/project.routes.js`.
  + JWT‑based auth is handled via a cookie and `configs/jwt.config.js`.

+ **Communication**
  + The React client runs at `http://localhost:3000`.
  + The Express API runs at `http://localhost:8000`.
  + CORS is configured so the frontend can call the backend with credentials.

---

## 2. Data Model Overview

All domain models are defined in `server/models/project.model.js` and share the same MongoDB connection.

### 2.1 User

Key fields:

- `firstName`, `lastName`, `email`, `password`
- `email` has a regex validator to ensure it looks like a real email.
- `password` is required and must be at least 8 characters.

Important behaviors:

- A virtual field `confirmPassword` is defined on the schema. It is used only for validation and is **not** persisted to MongoDB.
- A `pre('validate')` hook ensures `password` and `confirmPassword` match.
- A `pre('save')` hook hashes the plain‑text password with bcrypt before the document is stored.

### 2.2 Product

Represents a single item in the store:

- `name`, `description`, `price`, `image`, `category` (all required).
- `category` is used both for filtering lists and for computing "Related Items" on the product detail page.

### 2.3 Order

Represents a purchase event:

- `user`: ObjectId reference to a `User`.
- `products`: array of ObjectId references to `Product`.
- `total`: numeric total for the order.
- `status`: string status (defaults to `"pending"`).
- `timestamp`: date the order was created (defaults to current time).

---

## 3. Backend Flow

### 3.1 Express Application (`server/server.js`)

1. Loads environment variables with `dotenv`.
2. Initializes MongoDB connection by requiring `configs/mongoose.config.js`.
3. Sets up middleware:
   - `cookieParser()` to read cookies from requests.
   - `express.json()` and `express.urlencoded()` to parse JSON and form bodies.
   - `cors({ credentials: true, origin: "http://localhost:3000" })` so the React app can send cross‑origin requests with cookies.
4. Defines a simple protected route `/api/users` as an example, using the JWT `authenticate` middleware.
5. Imports and applies all routes from `routes/project.routes.js`.
6. Starts the server on `process.env.PORT`.

### 3.2 Routes (`server/routes/project.routes.js`)

This file connects URL patterns to controller functions:

- **User endpoints**
  - `GET /api/user/testing` → controller test endpoint.
  - `GET /api/user/:id` → fetch a single user.
  - `POST /api/user` → create a user.
  - `PUT /api/user/:id` → update a user.
  - `DELETE /api/user/:id` → delete a user.
  - `POST /api/register` → registration flow.
  - `POST /api/login` → login flow.
  - `GET /api/users` → list all users; protected with `authenticate`.
  - `POST /api/logout` → clear auth cookie.

- **Product endpoints**
  - `GET /api/product/testing` → controller test endpoint.
  - `GET /api/product` → list all products.
  - `GET /api/product/:id` → fetch a single product.
  - `GET /api/cart/:id` → currently mapped to the same handler as `oneProduct`.
  - `POST /api/product` → create a product.
  - `PUT /api/product/:id` → update a product.
  - `DELETE /api/product/:id` → delete a product.

- **Order endpoints**
  - `GET /api/order/testing` → controller test endpoint.
  - `GET /api/order` → list all orders.
  - `GET /api/order/:id` → fetch one order.
  - `POST /api/order` → create an order.
  - `PUT /api/order/:id` → update an order.
  - `DELETE /api/order/:id` → delete an order.

### 3.3 Authentication (`user.controller.js` and `jwt.config.js`)

- **Registration**
  1. `POST /api/register` receives `firstName`, `lastName`, `email`, `password`, `confirmPassword`.
  2. Basic field presence check is performed.
  3. The database is queried for an existing user with the same email.
  4. If valid, `User.create` is called; Mongoose hooks:
     - Validate that password and confirmPassword match.
     - Hash the password.
  5. A JWT is signed with the new user’s `_id` and returned in an HTTP‑only cookie.

- **Login**
  1. `POST /api/login` receives `email` and `password`.
  2. Looks up the user by email.
  3. Compares the provided password with the hashed password stored in MongoDB using bcrypt.
  4. If valid, signs a JWT and stores it in an HTTP‑only cookie (`usertoken`).

- **Protected routes**
  - `configs/jwt.config.js` exports `authenticate`, which reads the `usertoken` cookie and verifies it using `JWT_SECRET`.
  - On success, `next()` is called, and the route handler runs.
  - On failure, a 401 response with `{ verified: false }` is returned.

---

## 4. Frontend Flow

### 4.1 Routing (`dojocommerce/src/App.js`)

`App.js` is the top‑level component that wires all the views:

- Header section with:
  - Brand title linking to `/`.
  - Quick category links to `/test/shirt`, `/test/pants`, `/test/short`, and `/test/cart`.
- A React‑Bootstrap `Navbar` with links to checkout, login, and registration test routes.
- `<Routes>` configuration:
  - `/` → `HomePage`
  - `/test/cart` → `Cart`
  - `/test/checkout` → `Checkout`
  - `/test/login` → `Login`
  - `/test/register` → `Register`
  - `/test/product/:id` → `ProductPage`
  - `/test/pants` → `DisplayPants`
  - `/test/shirt` → `DisplayShirt`
  - `/test/short` → `DisplayShort`
  - `/test/cartpage` → `CartPage`

### 4.2 Home Page (`HomePage.jsx`)

Responsibilities:

- On mount:
  - Calls `GET http://localhost:8000/api/product`.
  - Stores full list in `displayProduct`.
  - Picks a random product from the list and stores it in `randomProduct`.
- Renders:
  - Featured product section:
    - Large image and details for `randomProduct`.
    - "Add Product to Cart" button, which pushes the product into a local `cart` array.
    - A simple cart listing (names and prices) and a placeholder total.
    - A "Checkout" button which currently just navigates to `/test/login`.
  - Product grid:
    - For each product in `displayProduct`, shows a Material UI card with image, name, category, description, price, and "Add Product to Cart" button.
  - At the bottom, renders `CartPage cart={cart}` to show the same cart items in a separate component.

This cart is **front‑end only** (in‑memory state) and not yet persisted to the backend.

### 4.3 Product Detail Page (`ProductPage.jsx`)

Responsibilities:

- Uses `useParams` to read `id` from the URL.
- On mount/when `id` changes:
  - Calls `GET http://localhost:8000/api/product/:id`.
  - Stores response in `oneProduct`.
  - Scrolls to the top of the page.
- Renders:
  - Large view of the selected product.
  - "Add to Cart" link that currently navigates to `/test/cart`.
  - Related items section:
    - If the product category is a shirt → embeds `DisplayShirt`.
    - If shorts → embeds `DisplayShort`.
    - If pants → embeds `DisplayPants`.

### 4.4 Category Pages (`DisplayPants.jsx`, `DisplayShirt.jsx`, `DisplayShort.jsx`)

Each category component:

- Fetches the full product list via `GET /api/product`.
- Filters the list by `category`:
  - Pants: `"pants"` or `"pant"`.
  - Shirts: `"shirt"` or `"shirts"`.
  - Shorts: `"short"` or `"shorts"`.
- Displays Material UI cards for each matching item, with a link to the corresponding product detail page.
- Provides a link to the cart (`/test/cart`) as a placeholder for adding items.

### 4.5 Cart and Orders (`Cart.jsx`, `CartPage.jsx`)

- **`CartPage.jsx`**
  - Purely presentational.
  - Receives `cart` as a prop and lists the `name` of each item.
  - Shows an empty state message if `cart` is falsy.

- **`Cart.jsx`**
  - Fetches data from `GET /api/order` and stores it in `cartProducts`.
  - Renders:
    - An `EmptyCart` component at the top (static message and link home).
    - A placeholder "Update" button and "Remove This Item" button.
    - Checkout buttons:
      - One that links to `/test/checkout`.
      - One that pushes the user to registration at `/test/register`.
    - A "Current Orders" section listing properties of each order (`user`, `products`, `total`, `status`).
  - This file is a good starting point for evolving a real persisted cart and order history.

### 4.6 Authentication Views (`Login.jsx`, `Register.jsx`)

- **`Register.jsx`**
  - Controlled form with `firstName`, `lastName`, `email`, `password`, `confirmPassword`.
  - On submit:
    - Sends `POST /api/register` with the form data.
    - On success, logs the response and navigates to `/test/login`.
    - On error, logs error details and navigates back to `/`.

- **`Login.jsx`**
  - Controlled form with `email` and `password`.
  - On submit:
    - Sends `POST /api/login`.
    - On success, logs the response and navigates to `/`.
    - On error, logs the error body.

Note: JWT cookies are set by the backend; the frontend does not manage tokens directly.

---

## 5. Suggested Demo Walkthrough

This is a simple script for presenting the project:

1. **Landing on the Homepage**
   - Explain the featured product and that it changes on refresh.
   - Scroll to the product grid and show the variety of items and pricing.

2. **Browsing by Category**
   - Click into "Shirts", "Pants", or "Shorts" and show how only those items appear.
   - Click a product to open its detail page and highlight the related items section.

3. **Using the Cart (Front‑End)**
   - From the homepage, add a couple of items to the cart using "Add Product to Cart".
   - Point out the inline cart listing and the separate `CartPage` summary.

4. **User Registration & Login**
   - Go to the registration page, create a new user, then log in with those credentials.
   - Explain that a JWT cookie is issued and used by the backend to protect routes such as `/api/users`.

5. **Orders**
   - Show the `Cart` view and its "Current Orders" listing.
   - Explain how this ties back to the `Order` model on the backend and the `/api/order` endpoints.

---

## 6. Future Improvements (Ideas)

Some natural next steps if you want to evolve the project further:

- Persist the cart to the backend and connect it more tightly to `Order` creation.
- Wire auth state on the frontend to conditionally show/hide certain routes.
- Improve error and validation messages in the React forms.
- Add admin views for managing products and orders.

