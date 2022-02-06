import React from 'react';
import './header.scss';

const Header = (props) => {


    return (
        <div className='header_container'>
            <div className='header_wrapper'>
                <div className='logo'>Logo</div>
                <div className='search_bar'>
                    <input type="search" />
                </div>
                <div className='last_section'>
                    <div className='wishlist_icon'>Wishlist</div>
                    <div className='cart_icon'>Cart</div>
                    <div className='login'>Login</div>
                </div>
            </div>
        </div>
    );
};

export default Header;