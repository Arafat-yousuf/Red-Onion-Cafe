import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Images/logo2.png';
import './Header.css';
import { useAuth } from '../Login/useAuth';
import {Cart3} from 'react-bootstrap-icons';
import { getDatabaseCart } from '../../Utilities/localCart';
import { useEffect } from 'react';
const Header = (props) => {
    const auth = useAuth();
    //console.log(props.returningUser);
    const [cartSize,setCartSize] = useState(0);
    //let cartSize = Object.keys(cart).length;

    useEffect(() =>{
        const cart = getDatabaseCart();
        setCartSize(Object.keys(cart).length);
    })
    //console.log(cartSize);

    return (
        <nav className="navbar navbar-expand navbar-light bg-white py-2 fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="OH! that's HOT! that's HOT!!!" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item active">
                        <Link to="/checkout" className="nav-link"><Cart3 size="30px"/>
                            <span className="badge bg-light">{cartSize}</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        {
                            auth.user ?  
                             <Link to="/checkout" className="nav-link">{auth.user.displayName}</Link> 
                            :
                            <Link to="/login" className="nav-link" onClick={() => props.handleReturningUser(true)}>Login</Link> 
                        }
                    </li>
                    <li className="nav-item">
                        {
                            auth.user ? 
                            <Link to="/" className="nav-link">
                                <button onClick={() => {auth.signOut()}} className="btn btn-danger">Sign Out</button>
                            </Link>
                            :
                            <Link to="/login" className="nav-link">
                                <button className="btn btn-danger" onClick={() => props.handleReturningUser(false)}>Sign Up</button>
                            </Link>
                        }
                       
                    </li>
                </ul>

            </div>
        </nav>
        
    );
};

export default Header;