import './footer.scss';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';

const Footer = ({ userData }) => {

    const navigate = useNavigate();

    return (
        <div className='footer_container'>
            <div className='top_scroll' onClick={() => window?.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })}>
                Back to top
            </div>
            <div className='menu_link'>
                <div className='link_section'>
                    <div className='link' onClick={() => navigate('/home')}>Home</div>
                    {userData && userData.user && userData.user.token && <div className='link' onClick={() => navigate('/cart')}>Cart</div>}
                    {userData && userData.user && userData.user.token && <div className='link' onClick={() => navigate('/change-password')}>Change Password</div>}
                    <div className='link' onClick={() => navigate('/product')}>Product</div>
                    {userData && userData.user && userData.user.token &&<div className='link' onClick={() => navigate('/wishlist')}>Wishlist</div>}
                </div>
                <div className='last_section'>
                    <img src={Logo} alt="Nice Pair" />
                    <div className='txt'>Copyright © 2022 - All rights reserved</div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userData: state.user,
    }
}

export default connect(mapStateToProps)(Footer);