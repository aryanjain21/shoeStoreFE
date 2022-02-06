import './product-card.scss';
import Button from '../button/button';
import Shoe from '../../assets/images/shoe1.jpg';
import Buy from '../../assets/icons/buy.svg';

const ProductCard = (props) => {

    const { products } = props;

    return (
        <div className='product_card_container'>
            {(products.length > 0) && products.map((product, index) => (<div className='product_wrapper'>
                <div className='product_image_section'>
                    <img src={Shoe} alt="product" />
                </div>
                <div className='product_discription'>
                    <div className='product_details'>
                        <div className='wishlist_area'><img src={Buy} alt="buy" /></div>
                        <div className='title'>{product.name}</div>
                        <div className='price_section'>
                            <div className='original_price'>MRP <span>2000</span></div>
                            <div className='discount_price'>{product.price} <span>(incl. all tax)</span></div>
                        </div>
                    </div>
                    <div className='btn_area'>
                        <Button>Buy Now <span className='buy_icon'><img src={Buy} alt="buy" /></span></Button>
                    </div>
                </div>
            </div>)
            )}
        </div>
    );
}

export default ProductCard;