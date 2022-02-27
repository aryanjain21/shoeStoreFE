import './footer.scss';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';

const Footer = () => {

    const navigate = useNavigate();

    return (
        <div className='footer_container'>
            <div className='top_scroll' onClick={() => window?.scrollTo(0, 0)}>
                Back to top
            </div>
            <div className='menu_link'>
                <div className='link_section'>
                    <div className='link' onClick={() => navigate('/home')}>Home</div>
                    <div className='link' onClick={() => navigate('/cart')}>Cart</div>
                    <div className='link' onClick={() => navigate('/change-password')}>Change Password</div>
                    <div className='link' onClick={() => navigate('/product')}>Product</div>
                    <div className='link' onClick={() => navigate('/wishlist')}>Wishlist</div>
                </div>
                <div className='last_section'>
                    <img src={Logo} alt="Nice Pair" />
                    <div className='txt'>Copyright © 2022 - All rights reserved</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;