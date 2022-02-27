import './product-card.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import FillHeart from '../../assets/icons/fill_heart.svg';
import { moveToCart } from '../../services';

const ProductCard = (props) => {

    const { products = [], hidebtn, isCarousel, isWhishlist, removeProduct, fetchWishlist, fetchCartList } = props;

    const navigate = useNavigate();

    const handleNavigation = (id) => {
        if (isWhishlist) {
            navigate(`/buy/${id}`);
        } else {
            navigate(`/product`);
        }
    }

    const handleBtnClick = (id) => {
        if (isWhishlist) {
            moveToCart({productId: id}).then(resp => {
                fetchWishlist();
                fetchCartList();
            })
        } else {
            navigate(`/buy/${id}`)
        }
    }

    return (
        <div className={`product_card_container ${isWhishlist ? 'wishlist_data' : ''}`}>
            {isCarousel ?
                <Carousel showArrows={true} centerMode={true} width='60%' autoPlay={true} swipeScrollTolerance selectedItem={3}>
                    {(products.length > 0) && products.map((product, index) => {
                        return <div className={`product_wrapper ${hidebtn ? 'product_without_btn' : ''}`} key={index}>
                            <div className='product_image_section' onClick={() => handleNavigation(product._id)}>
                                <img src={product.image} alt="product" />
                            </div>
                            <div className='product_discription'>
                                <div className='product_details'>
                                    <div className='brand'>{product.brand}</div>
                                    <div className='title' onClick={() => handleNavigation(product._id)}>{product.title}</div>
                                    <div className='price_section'>
                                        <div className='discount_price'><span className='strike_through'>MRP ₹{product.price}</span> <span className='discount'>({product.discount}% off)</span></div>
                                        <div className='discount_price mrp_price'>Rs. {(product.price - (product.price * (product.discount / 100))).toFixed(2)}</div>
                                    </div>
                                </div>
                                {!hidebtn && <div className='btn_area'>
                                    <Button clickHandler={() => { navigate(`/buy/${product._id}`) }}>Buy Now</Button>
                                </div>}
                            </div>
                        </div>
                    })}
                </Carousel>
                :
                (products.length > 0) && products.map((product, index) => (<div className={`product_wrapper ${hidebtn ? 'product_without_btn' : ''}`} key={index}>
                    <div className='product_image_section' onClick={() => handleNavigation(product._id)}>
                        <img src={product.image} alt="product" />
                    </div>
                    <div className='product_discription'>
                        <div className='product_details'>
                            {isWhishlist && <div className='wished_icon' onClick={() => removeProduct({ productId: product._id })}>
                                <img src={FillHeart} alt="filled" />
                            </div>}
                            <div className='brand'>{product.brand}</div>
                            <div className='title' onClick={() => handleNavigation(product._id)}>{product.title}</div>
                            <div className='price_section'>
                                <div className='discount_price'><span className='strike_through'>MRP ₹{product.price}</span> <span className='discount'>({product.discount}% off)</span></div>
                                <div className='discount_price mrp_price'>Rs. {(product.price - (product.price * (product.discount / 100))).toFixed(2)}</div>
                            </div>
                        </div>
                        {!hidebtn && <div className='btn_area'>
                            <Button clickHandler={() => handleBtnClick(product._id)}>{isWhishlist ? 'Move to Cart' : 'Buy Now'}</Button>
                        </div>}
                    </div>
                </div>)
                )}
        </div >
    );
}

export default ProductCard;