import React, { useEffect } from 'react';
import './header.scss';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Wishlist from '../../assets/icons/heart.svg';
import Cart from '../../assets/icons/cart.svg';
import User from '../../assets/icons/user.svg';
import Logo from '../../assets/images/logo.jpg';
import { fetchCartList } from '../../redux/cart/action';
import { fetchWishlist } from '../../redux/wishlist/action';
import {fetchProductList} from '../../redux/product/action';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Header = (props) => {

    const { cartData, wishlistData, fetchCartList, fetchWishlist, fetchProductList } = props;

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [search, setSearch] = useState('');

    const searchItem = useLocation().search;
    const value = new URLSearchParams(searchItem).get('search');

    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem('setUser'));
        if (userInfo && userInfo.token) {
            fetchCartList();
            fetchWishlist();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (value) {
            fetchProductList({search: value})
        }
        // eslint-disable-next-line
    }, [value])

    const handleLogin = () => {
        let userInfo = JSON.parse(localStorage.getItem('setUser'));
        if (!userInfo) {
            navigate('/login');
        } else {
            setShowMenu((prevState) => !prevState);
        }
    }

    const handleSignOut = () => {
        toast.success('Sign out sucessfully.')
        localStorage.removeItem('setUser');
        setTimeout(() => {
            navigate('/home');
            window?.location?.reload();
        }, 100);
    }

    const handleSearch = (e) => {
        if(e.keyCode === 13) {
            navigate(`/product?search=${search}`);
        }
    }

    return (
        <div className='header_container'>
            <div className='header_wrapper'>
                <div className='logo' onClick={() => navigate('/home')}>
                    <div className='logo_image'>
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className='logo_txt'>
                        Nice Pair
                    </div>
                </div>
                <div className='search_bar'>
                    <input type="search" value={search} onKeyUp={(e) => handleSearch(e)} onChange={(e) => setSearch(e?.target?.value)} placeholder='Search your product by name or brand' />
                </div>
                <div className='last_section'>
                    <div className='icon wishlist_icon' onClick={() => navigate('/wishlist')}>
                        <img src={Wishlist} alt="wishlist" />
                        {wishlistData.productInWIshlist > 0 && <div className='wishlist_count'>{wishlistData.productInWIshlist}</div>}
                    </div>
                    <div className='icon cart_icon' onClick={() => navigate('/cart')}>
                        <img src={Cart} alt="cart" />
                        {cartData?.cartList?.productInCart > 0 && <div className='cart_count'>{cartData.cartList.productInCart}</div>}
                    </div>
                    <div className='icon login' onClick={handleLogin}>
                        <img src={User} alt="user" />
                    </div>
                    {showMenu && <div className='show_menu' onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
                        <div className='options' onClick={() => navigate('/address')}>Address</div>
                        {/* <div className='options'>Edit Profile</div> */}
                        <div className='options' onClick={() => navigate('/change-password')}>ChangePassword</div>
                        <div className='options' onClick={handleSignOut}>Sign Out</div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        cartData: state.cartList,
        wishlistData: state.wishlist
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCartList: () => dispatch(fetchCartList()),
        fetchWishlist: () => dispatch(fetchWishlist()),
        fetchProductList: (data) => dispatch(fetchProductList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);