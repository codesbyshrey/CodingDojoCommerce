# CodingDojoCommerce
 eCommerce Website for MERN Project Week
 - [Kimly Quac](https://github.com/kquac00)
 - [Em Bang Long Nguyen](https://github.com/longnguyen2912)
 - Shreyas Sriram

Coding Dojo MERN Stack Project Week (Full Time Program)

## Description

- Trello Board for Public View: https://trello.com/w/codingdojo66
- Full‑stack MERN e‑commerce demo with authentication, product catalog, cart, and simple order flow.
- Frontend is a React single‑page app (`dojocommerce`) styled with Bootstrap and Material UI components.
- Backend is an Express + MongoDB API (`server`) secured with JWT and HTTP‑only cookies.

## Tech Stack

- **Frontend**: React (Create React App), React Router, Axios, React‑Bootstrap, Material UI
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **Auth**: JSON Web Token (JWT) stored in HTTP‑only cookies

## New Features to Learn

- Login/Registration with JSON Web Token, Cookie‑Parser, Cookies
- MongoDB One‑to‑Many (and potentially Many‑to‑Many) Schema design
- Material UI styling and card‑based product layout

## Project Goal

- MVP by 3/31 to present for CodingDojo MERN Stack Project Week
- Minimum Viable Product to demonstrate:
  - Basic auth flow (register → login → access protected routes)
  - Product browsing and detail pages
  - Simple cart / order listing

## Project Structure (High‑Level)

- `server/`
  - `server.js` – Express app setup, middleware, CORS, route registration.
  - `configs/mongoose.config.js` – MongoDB Atlas connection.
  - `configs/jwt.config.js` – JWT verification middleware for protected routes.
  - `models/project.model.js` – `User`, `Product`, and `Order` Mongoose schemas.
  - `controllers/*.controller.js` – CRUD + auth logic for users, products, and orders.
  - `routes/project.routes.js` – All API endpoints mounted on the Express app.
- `dojocommerce/`
  - `src/App.js` – Top‑level routes and navigation.
  - `src/views/*.jsx` – Page‑level components (Home, Login, Register, ProductPage, category views, Cart, Checkout).

## How to Use (Local Development)

1. **Clone the repository** into an empty folder.
2. **Install frontend dependencies**:
   - Open a terminal in the `dojocommerce` folder.
   - Run:
     - `npm install`
3. **Install backend dependencies**:
   - Open a second terminal in the `server` folder.
   - Run:
     - `npm install`
4. **Create a `.env` file in `server/` and add at least**:
   - `PORT=8000`
   - `DB=<your_database_name>`
   - `ATLAS_USERNAME=<your_mongodb_atlas_username>`
   - `ATLAS_PASSWORD=<your_mongodb_atlas_password>`
   - `JWT_SECRET=<random_long_secret_for_tokens>`
   - (Optional) any additional secrets you want to use.
5. **Start the backend (API)**:
   - From the `server` folder:
     - `nodemon server.js` (or `node server.js` if you prefer).
6. **Start the frontend (React app)**:
   - From the `dojocommerce` folder:
     - `npm start`
   - Visit `http://localhost:3000` in your browser.

> The backend expects to be available at `http://localhost:8000` and CORS is configured to accept requests from the React dev server at `http://localhost:3000`.

## Using the Website

1. Homepage includes a **random featured product**. The featured product changes on each refresh.
2. Use the top navigation and test links to:
   - Browse shirts, pants, and shorts.
   - View a single product detail page.
   - Add items to a simple in‑memory cart on the homepage.
3. Use the **Register** and **Login** pages to:
   - Create a new user account (data stored in MongoDB).
   - Log in and receive a JWT in a HTTP‑only cookie for accessing protected routes.

## API Overview (Quick Reference)

- **Users**
  - `POST /api/register` – Register a new user.
  - `POST /api/login` – Log in an existing user, sets `usertoken` cookie.
  - `POST /api/logout` – Clear the auth cookie.
  - `GET /api/users` – Return all users (protected by JWT middleware).
- **Products**
  - `GET /api/product` – List all products.
  - `GET /api/product/:id` – Fetch a single product.
  - `POST /api/product` – Create a product.
  - `PUT /api/product/:id` – Update a product.
  - `DELETE /api/product/:id` – Delete a product.
- **Orders**
  - `GET /api/order` – List all orders.
  - `GET /api/order/:id` – Fetch a single order.
  - `POST /api/order` – Create an order.
  - `PUT /api/order/:id` – Update an order.
  - `DELETE /api/order/:id` – Delete an order.

## Design & Walkthrough Documentation

For a deeper explanation of how the app is put together (architecture, data models, and an end‑to‑end flow walkthrough), see:

- [Design & Implementation Walkthrough](README.walkthrough.md)

