import './cart-view.scss';
import Delete from '../../assets/icons/delete.svg';
import Heart from '../../assets/icons/heart.svg';
import QtyButton from '../../common/qty-button/qty-button';

const CartView = (props) => {

    const { cartData, removeItem, moveItemToWishlist } = props;

    return (
        <div className='cart_view_container'>
            {cartData.map((cart, index) => {
                return <div className='cart_details_section' key={index}>
                    <div className='product_details'>
                        <div className='product_image'>
                            <img src={cart._id.image} alt="product" />
                        </div>
                        <div className='details'>
                            <div className='title'>{cart._id.brand}-{cart._id.title}</div>
                            <div className='size'>Size: {cart._id.size}</div>
                            <div className='original_price'>MRP: <span>₹ {cart._id.price}</span>/Quantity</div>
                            <div className='price'>Total Price: ₹ {(((cart._id.price) - ((cart._id.price * cart._id.discount) / 100)) * cart.qty).toFixed(2)}</div>
                        </div>
                    </div>
                    <div className='btn_section'>
                        <div className='qty_btn_section'>
                            <QtyButton qty={cart.qty} productId={cart._id._id} />
                        </div>
                        <div className='mobile_btn'>
                            <span className='delete' onClick={() => removeItem(cart._id._id)}>
                                <img src={Delete} alt="delete" />
                            </span>
                            <span className='wishlist' onClick={() => moveItemToWishlist(cart._id._id)}>
                                <img src={Heart} alt="wishlist" />
                            </span>
                        </div>
                        <div className='desktop_btn'>
                            <div className='remove' onClick={() => removeItem(cart._id._id)}>Remove</div>
                            <div className='move_wishlist' onClick={() => moveItemToWishlist(cart._id._id)}>Move To Wishlist</div>
                        </div>
                    </div>
                </div>
            })
            }
        </div>
    );
};

export default CartView;