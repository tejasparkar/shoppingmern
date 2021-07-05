import './bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer';
import './App.css';
import Header from './components/Header';
import React from 'react';
import Homescreen from './screens/Homescreen';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/Register';
import UserProfle from './screens/UserProfile';
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen';
import ConfirmOrder from './screens/ConfirmOrder';
import OrderScreen from './screens/OrderScreen';
function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <main>
          <Container>
            <Route path="/" component={Homescreen} exact />
            <Route path="/product/:id" component={ProductDetails}  />
            <Route path="/cart/:id?" component={Cart}  />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen}  />
            <Route path="/profile" component={UserProfle} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/order/:id" component={OrderScreen} exact />
            <Route path="/confirmorder" component={ConfirmOrder} />
            
          </Container>
        </main>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
