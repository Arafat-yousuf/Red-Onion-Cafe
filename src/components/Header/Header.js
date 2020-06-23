import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Images/logo2.png';
import './Header.css';
import { useAuth } from '../Login/useAuth';
const Header = (props) => {
    const auth = useAuth();
    return (
        <nav className="navbar navbar-expand navbar-light bg-white py-2 fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="OH! that's HOT! that's HOT!!!" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item active">
                        <Link to="/checkout" className="nav-link"><svg className="bi bi-cart3" width="30px" height="30px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /></svg>
                            <span className="badge bg-light">{props.cart.length}</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        {
                            auth.user ?  
                             <Link to="/checkout" className="nav-link">{auth.user.displayName}</Link> 
                            :
                            <Link to="/login" className="nav-link">Login</Link> 
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
                                <button className="btn btn-danger">Sign Up</button>
                            </Link>
                        }
                       
                    </li>
                </ul>

            </div>
        </nav>
        
    );
};

export default Header;