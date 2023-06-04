import React, { useState } from 'react';
import Logo from "../../images/logo-new.jpg"
import { Link } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={Logo} />
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/" className='header-link'>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className='header-link'>About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact" className='header-link'>Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/cart" className='header-link'>Cart</Link>
                    </li>
                    <li>
                        <button
                            className='login-button'
                            onClick={
                                () => setIsLoggedIn(!isLoggedIn)
                            }
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
