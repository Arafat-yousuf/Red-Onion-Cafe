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
import Inventory from './components/Inventory/Inventory';
function App() {

  const [returningUser,setReturningUser] = useState();
  const handleReturningUser = (state) => setReturningUser(state);


  return (
    <AuthProvider>
      <Router>
        <div className="mainapp" >
          <Switch>
            <Route exact path="/">
              <Header handleReturningUser ={handleReturningUser}/>
              <Banner />
              <FoodMenu/>
              <FeatureSet />
              <Footer />
            </Route>
            <Route path="/food/:id">
              <Header handleReturningUser ={handleReturningUser}/>
              <Banner />
              <FoodDetails/>
              <Footer />
            </Route>
            <PrivateRoute path="/checkout">
              <Header handleReturningUser ={handleReturningUser}/>
              <Delivary/>
              <Footer />
            </PrivateRoute>
            <PrivateRoute path="/deliveryStatus">
              <Header handleReturningUser ={handleReturningUser}/>
              <DelivaryStatus/>
              <Footer/>
            </PrivateRoute>
            <Route path="/login">
                <Login returningUser ={returningUser} handleReturningUser ={handleReturningUser}/>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>
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
