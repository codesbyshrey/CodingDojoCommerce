import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// //import logo from './logo.svg';
// import './App.css';
// import LoginPage from './views/LoginPage'
// import {Routes, Route, Link} from 'react-router-dom'
// import HomePage from './views/HomePage'
// import Checkout from './views/Checkout'
// import ProductPage from './views/ProductPage'
// import Cart from './views/Cart'

// function App() {
//   return (
//     <div>
//       <h1> WELCOME TO DOJO COMMERCE </h1>
//       <p> Kimly - home page </p>
//       <p> Long - loginreg wrap up</p>
//       <p> Shreyas - github - then cart/checkout?</p>

//       <Link to="/test/product"> Product Page Test </Link>
//       <Link to="test/cart"> Cart Page Test </Link>
//       <Link to="/test/login"> Login Page Test </Link>
//       <Link to="test/checkout"> Checkout Page Test </Link>

//       <Routes>
//         <Route path="/" element={<HomePage />} /> 
//         <Route path="/test/cart" element={<Cart />} />
//         <Route path="/test/checkout" element={<Checkout />} />
//         <Route path="/test/login" element={<LoginPage />} />
//         <Route path="/test/product" element={<ProductPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
