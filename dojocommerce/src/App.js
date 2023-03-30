import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './views/Login'
import Register from './views/Register'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './views/HomePage'
import Checkout from './views/Checkout'
import ProductPage from './views/ProductPage'
import Cart from './views/Cart'
import HomePageLong from './views/HomePageLong';
import DisplayPants from './views/DisplayPants';
import DisplayShirt from './views/DisplayShirt';
import DisplayShort from './views/DisplayShort';

function App() {
  return (
    <div>
      <div className="wireframe">
        <Link to="/"> <h1> Welcome to Dojo Commerce </h1> </Link>
        <hr />
        <br />
        <h3 className='nav'> eCommerce Clothing
          <Link to="/test/shirt"> Shirts </Link>|
          <Link to="/test/pants"> Pants </Link>|
          <Link to="/test/short">Shorts </Link>|
          Search Option
          <Link to='/test/cart'> Cart </Link>
        </h3>
      </div>


      <Link to="test/checkout"> Checkout Page Test </Link> || LONG ||
      <Link to="/test/long"> Long Home Page </Link> ||
      <Link to="/test/login"> Login Page Test </Link> ||
      <Link to="/test/register"> Register Page Check</Link>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test/cart" element={<Cart />} />
        <Route path="/test/checkout" element={<Checkout />} />
        <Route path="/test/login" element={<Login />} />
        <Route path="/test/register" element={<Register />} />
        <Route path="/test/product/:id" element={<ProductPage />} />
        <Route path="/test/long" element={<HomePageLong />} />
        <Route path="/test/pants" element={<DisplayPants />} />
        <Route path="/test/shirt" element={<DisplayShirt />} />
        <Route path="/test/short" element={<DisplayShort />} />
      </Routes>
    </div>
  );
}

export default App;
