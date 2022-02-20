import './cart.scss';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import CartView from '../../components/cart-view/cart-view';
import OrderSummary from '../../components/order-summary/order-summary';
import { fetchCartList } from '../../redux/cart/action';
import { removeFromCart, moveToWishlist, emptyCart } from '../../services';

const Cart = (props) => {

    const { cartData, fetchCartList } = props;
    let cart = (cartData?.cartList?.products?.length > 0) ? cartData.cartList.products : [];

    useEffect(() => {
        fetchCartList();
    }, []);

    const removeItem = (productId) => {
        removeFromCart({ productId: productId }).then(resp => {
            if (resp.data.status === 200) {
                fetchCartList();
            }
        }).catch(error => {
            console.log('removeItem error>>>', error.response)
        });
    }

    const moveItemToWishlist = (productId) => {
        moveToWishlist({ productId: productId }).then(resp => {
            if (resp.data.status === 200) {
                fetchCartList();
            }
        }).catch(error => {
            console.log('moveItemToWishlist error>>>', error.response)
        });
    }

    const handleEmptyCart = () => {
        emptyCart().then(resp => {
            if (resp.data.status === 200) {
                fetchCartList();
            }
        }).catch(error => {
            console.log('handleEmptyCart error>>>', error.response)
        });
    }

    return (
        <div className='cart_section'>
            <div className='cart_view'>
                {(cart.length > 0) && <div className='link'>
                    <a href='javascrip:void(0);' onClick={handleEmptyCart}>Empty Cart</a>
                </div>}
                <CartView cartData={cart} removeItem={removeItem} moveItemToWishlist={moveItemToWishlist} />
            </div>
            <div className='order_summary'>
                <OrderSummary amountData={cartData?.cartList?.products?.length > 0 && cartData.cartList} />
            </div>
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
        fetchCartList: () => dispatch(fetchCartList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);