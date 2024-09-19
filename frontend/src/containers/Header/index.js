import React from 'react';
import { NavLink } from "react-router-dom";
import Logo from '../../components/Logo';
import "./style.scss";
import Login from '../../components/Login';

const Header = () => {
    return (
       <header>
        <nav className='navbar'>
            <ul className='navbar-left'>
                <li>
                    <NavLink to="/">
                    <Logo />
                    </NavLink>
                </li>
            </ul>
            <Login/>
        </nav>
       </header>
    );
};

export default Header;
