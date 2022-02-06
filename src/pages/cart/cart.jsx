import './cart.scss';
import CartView from '../../components/cart-view/cart-view';
import OrderSummary from '../../components/order-summary/order-summary';

const Cart = () => {

    return (
        <div className='cart_section'>
            <div className='cart_view'>
                <CartView />
            </div>
            <div className='order_summary'>
                <OrderSummary />
            </div>
        </div>
    );
};

export default Cart;