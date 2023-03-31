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
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function App() {
  return (
    <div>
      <header className="wireframe">

        <div>
          <Link to="/"> <h1> Welcome to Dojo Commerce </h1> </Link>
        </div>
        <h3 className="wireframelink">
          <Link to="/test/shirt"> Shirts </Link>|
          <Link to="/test/pants"> Pants </Link>|
          <Link to="/test/short">Shorts </Link>|
          <Link to='/test/cart'> Cart </Link>
        </h3>
      </header>

      <div className="testpages">
      <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand> DojoCommerce </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" />
          <Nav className="mr-auto">
            <LinkContainer to="/test/checkout">
              <Nav.Link> Checkout Test </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/test/login">
              <Nav.Link> Login Test </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/test/register">
              <Nav.Link> Register Test </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
      </div>
      <br/>
      <hr/>

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
