import './cart.scss';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import CartView from '../../components/cart-view/cart-view';
import OrderSummary from '../../components/order-summary/order-summary';
import { fetchCartList } from '../../redux/cart/action';
import { fetchWishlist } from '../../redux/wishlist/action';
import { removeFromCart, moveToWishlist, emptyCart } from '../../services';
import { toast } from 'react-toastify';
import Loader from '../../assets/icons/loader.gif';
import EmptyCart from '../../assets/images/empty_cart.png';

const Cart = (props) => {

    const { cartData, fetchCartList, fetchWishlist } = props;
    let cart = (cartData?.cartList?.products?.length > 0) ? cartData.cartList.products : [];

    useEffect(() => {
        fetchCartList();
        // eslint-disable-next-line
    }, []);

    const removeItem = (productId) => {
        removeFromCart({ productId: productId }).then(resp => {
            if (resp.data.status === 200) {
                toast.success(resp.data.message);
                fetchCartList();
            }
        }).catch(error => {
            toast.error(error?.response?.data?.message);
            console.error('removeItem error>>>', error.response)
        });
    }

    const moveItemToWishlist = (productId) => {
        moveToWishlist({ productId: productId }).then(resp => {
            if (resp.data.status === 200) {
                toast.success(resp.data.message);
                fetchCartList();
                fetchWishlist();
            }
        }).catch(error => {
            toast.error(error?.response?.data?.message);
            console.error('moveItemToWishlist error>>>', error.response)
        });
    }

    const handleEmptyCart = () => {
        emptyCart().then(resp => {
            if (resp.data.status === 200) {
                toast.success(resp.data.message);
                fetchCartList();
            }
        }).catch(error => {
            toast.error(error?.response?.data?.message);
        });
    }

    return (
        <div className='cart_section'>
            {cartData.loader ?
                <div className='loader'>
                    <img src={Loader} alt="Loading..." />
                </div>
                :
                <>
                    {(cart.length > 0) ?
                        <>
                            <div className='cart_view'>
                                <div className='link'>
                                    <a href='javascrip:void(0);' onClick={handleEmptyCart}>Empty Cart</a>
                                </div>
                                <CartView cartData={cart} removeItem={removeItem} moveItemToWishlist={moveItemToWishlist} />
                            </div>
                            <div className='order_summary'>
                                <OrderSummary amountData={cartData?.cartList?.products?.length > 0 ? cartData.cartList : {}} />
                            </div>
                        </>
                        :
                        <div className='empty_cart'>
                            <img src={EmptyCart} alt='Empty Cart' />
                            <div className='info_txt'>Your cart is empty.</div>
                        </div>
                    }
                </>}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        cartData: state.cartList,
        loader: state.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCartList: () => dispatch(fetchCartList()),
        fetchWishlist: () => dispatch(fetchWishlist())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);