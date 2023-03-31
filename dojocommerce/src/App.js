import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartPage from './views/CartPage';
import Login from './views/Login'
import Register from './views/Register'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './views/HomePage'
import Checkout from './views/Checkout'
import ProductPage from './views/ProductPage'
import Cart from './views/Cart'
import DisplayPants from './views/DisplayPants';
import DisplayShirt from './views/DisplayShirt';
import DisplayShort from './views/DisplayShort';

function App() {
  return (
    <div>
      <div className="wireframe">
        <div>
          <Link to="/"> <h1> Welcome to Dojo Commerce </h1> </Link>
          <hr />
          <br />
        </div>
        <h3 className="wireframelink">
          <Link to="/test/shirt"> Shirts </Link>|
          <Link to="/test/pants"> Pants </Link>|
          <Link to="/test/short">Shorts </Link>|
          <Link to='/test/cart'> Cart </Link>
        </h3>
      </div>

      <div className="testpages">
        <Link to="test/checkout"> Checkout Page Test </Link> ||
        <Link to="/test/login"> Login Page Test </Link> ||
        <Link to="/test/register"> Register Page Check</Link>

      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test/cart" element={<Cart />} />
        <Route path="/test/checkout" element={<Checkout />} />
        <Route path="/test/login" element={<Login />} />
        <Route path="/test/register" element={<Register />} />
        <Route path="/test/product/:id" element={<ProductPage />} />
        <Route path="/test/pants" element={<DisplayPants />} />
        <Route path="/test/shirt" element={<DisplayShirt />} />
        <Route path="/test/short" element={<DisplayShort />} />
        <Route path="/test/cartpage" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
