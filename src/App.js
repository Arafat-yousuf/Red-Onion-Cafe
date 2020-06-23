import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import { AuthProvider, PrivateRoute } from './components/Login/useAuth';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';
import FeatureSet from './components/FeatureSet/FeatureSet';
import FoodMenu from './components/FoodMenu/FoodMenu';
import FoodDetails from './components/FoodDetails/FoodDetails';
import NotFound from './components/NotFound/NotFound';
import Delivary from './components/Delivary/Delivary';
import Login from './components/Login/Login';
import DelivaryStatus from './components/DelivaryStatus/DelivaryStatus';
function App() {
  const [cart , setCart] = useState([]);
  const [deliveryDetails , setDeliveryDetails] = useState({
    delivertodoor:null,road:null, flat:null, businessname:null, instruct: null
  });

  const [userEmail, setUserEmail] = useState(null);

  const handleDeliveryDetails = (data) => {
    setDeliveryDetails(data)
}
const getUserEmail = (email) => {
  setUserEmail(email)
}
const clearCart =  () => {
  return setCart([]);
}

const handleCart = (data) => {
  const alreadyAdded = cart.find(crt => crt.id === data.id );
  const newCart = [...cart,data]
  setCart(newCart);
  if(alreadyAdded){
    const reamingCarts = cart.filter(crt => crt.id !== data.id);
    setCart(reamingCarts);
  }else{
    const newCart = [...cart,data]
    setCart(newCart);
  }
 
}

const checkOutItem = (productId, productQuantity) => {
  const newCart = cart.map(item => {
    if(item.id === productId){
        item.quantity = productQuantity;
    }
    return item;
  })

  const filteredCart = newCart.filter(item => item.quantity > 0)
  setCart(filteredCart)
}

  return (
    <AuthProvider>
      <Router>
        <div className="mainapp" >
          <Switch>
            <Route exact path="/">
              <Header cart={cart} />
              <Banner />
              <FoodMenu cart={cart} />
              <FeatureSet />
              <Footer />
            </Route>
            <Route path="/food/:id">
              <Header cart={cart} />
              <Banner />
              <FoodDetails cart={cart} handleCart={handleCart} />
              <Footer />
            </Route>
            <PrivateRoute path="/checkout">
              <Header cart={cart} />
              <Delivary deliveryDetails={deliveryDetails} handleDeliveryDetails={handleDeliveryDetails} cart={cart} clearCart={clearCart} checkOutItem={checkOutItem} getUserEmail={getUserEmail} />
              <Footer />
            </PrivateRoute>
            <PrivateRoute path="/deliveryStatus">
              <Header cart={cart}/>
              <DelivaryStatus deliveryDetails={deliveryDetails}/>
              <Footer/>
            </PrivateRoute>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>

          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
