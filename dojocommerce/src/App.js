import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './views/LoginPage'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './views/HomePage'
import Checkout from './views/Checkout'
import ProductPage from './views/ProductPage'
import Cart from './views/Cart'
import HomePageLong from './views/HomePageLong';

function App() {
  return (
    <div>
      <div className="wireframe">
        <Link to="/"> <h1> Welcome to Dojo Commerce </h1> </Link>
        <hr />
        <br />
        <h3 className='nav'> eCommerce Clothing
          <Link to="/"> Shirts </Link>|
          <Link to="/"> Pants </Link>|
          <Link to="/">Shorts </Link>|
          Search Option
          <Link to='/test/cart'> Cart </Link>
        </h3>
      </div>

      <Link to="/test/product/id:"> Product Page Test </Link> ||
      <Link to="/test/login"> Login Page Test </Link> ||
      <Link to="test/checkout"> Checkout Page Test </Link> ||
      <Link to="/test/long"> Long Home Page </Link>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test/cart" element={<Cart />} />
        <Route path="/test/checkout" element={<Checkout />} />
        <Route path="/test/login" element={<LoginPage />} />
        <Route path="/test/product/id:" element={<ProductPage />} />
        <Route path="/test/long" element={<HomePageLong />} />
      </Routes>
    </div>
  );
}

export default App;
