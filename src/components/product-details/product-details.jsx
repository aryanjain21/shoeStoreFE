import './product-details.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/button/button';
import { addToCart, addToWishlist } from '../../services';
import { updateLength } from '../../redux/wishlist/action';
import { toast } from 'react-toastify';

const ProductDetails = (props) => {

    const { productInfo, fetchCartList, fetchWishlist } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = (productId) => {
        addToCart({ productId: productId }).then(resp => {
            if (resp.data.status === 200) {
                toast.success(resp.data.message);
                fetchCartList();
            }
        }).catch(error => {
            toast.error(error?.response?.data?.message);
        });
    }

    const handleAddToWishlist = (productId) => {
        addToWishlist({ productId: productId }).then(resp => {
            if (resp.data.status === 200) {
                toast.success(resp.data.message);
                dispatch(updateLength(resp.data.data));
            }
        }).catch(error => {
            toast.error(error?.response?.data?.message);
        });
    }

    return (
        <div className='product_details_container'>
            <div className='product_image'>
                <img src={productInfo.image} alt="product image" />
            </div>
            <div className='product_info'>
                <div className='title'>{productInfo.brand} - {productInfo.title}</div>
                <div className='original_price'>MRP: <span>₹ {productInfo.price}/-</span></div>
                <div className='price'>Price: <span>₹ {productInfo.price - ((productInfo.price * productInfo.discount)/100)}/-</span></div>
                <div className='tax_txt'>Inclusive of all taxes</div>
                <div className='size'>Size: {productInfo.size}</div>
                <div className='sub_title'>{productInfo.description}</div>
                <div className='btn_area'>
                    <div className='btn_section'>
                        <Button clickHandler={() => handleAddToCart(productInfo._id)}>
                            Add To Cart
                        </Button>
                    </div>
                    <div className='btn_section'>
                        <Button clickHandler={() => handleAddToWishlist(productInfo._id)}>
                            Add To Wishlist
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;