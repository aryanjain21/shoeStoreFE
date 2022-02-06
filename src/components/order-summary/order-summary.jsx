import './order-summary.scss';
import Button from '../../common/button/button';

const OrderSummary = (props) => {

    return (
        <div className='order_summary_container'>
            <div className='bag_section'>
                <div className='amount_section'>
                    <div className='lbl'>Bag Total</div>
                    <div className='amount'>Rs. 5250</div>
                </div>
                <div className='amount_section'>
                    <div className='lbl'>Bag Discount</div>
                    <div className='discount'>- Rs. 250</div>
                </div>
                <div className='amount_section'>
                    <div className='lbl'>Delivery</div>
                    <div className='discount'>Free</div>
                </div>
            </div>
            <div className='total_section'>
                <div className='order_total'>
                    <div className='lbl'>Order Total</div>
                    <div className='total_amt'>Rs. 5000</div>
                </div>
            </div>
            <div className='btn_area'>
                <Button>
                    Checkout Now
                </Button>
            </div>
        </div>
    );
};

export default OrderSummary;