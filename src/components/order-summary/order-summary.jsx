import './order-summary.scss';
import Button from '../../common/button/button';
import { useState } from 'react';
import { useEffect } from 'react';

const OrderSummary = (props) => {

    const {amountData} = props;
    const [bagTotal, setBagTotal] = useState(0);

    useEffect(() => {
        let totalAfterDiscount = 0;
        if (amountData?.products?.length) {
            amountData.products.forEach(element => {
                totalAfterDiscount += ((element._id.price - ((element._id.price * element._id.discount)/100)) * element.qty);
                setBagTotal(totalAfterDiscount.toFixed(2));
            });
        } else {
            setBagTotal(0);
        }
    }, [amountData])

    return (
        <div className='order_summary_container'>
            <div className='bag_section'>
                <div className='amount_section'>
                    <div className='lbl'>Bag Total</div>
                    <div className='amount'>Rs. {amountData?.cartValue || 0}</div>
                </div>
                <div className='amount_section'>
                    <div className='lbl'>Bag Discount</div>
                    <div className='discount'>- Rs. {amountData?.cartValue ? (amountData?.cartValue - bagTotal).toFixed(2) : 0}</div>
                </div>
                <div className='amount_section'>
                    <div className='lbl'>Delivery</div>
                    <div className='discount'>Free</div>
                </div>
            </div>
            <div className='total_section'>
                <div className='order_total'>
                    <div className='lbl'>Order Total</div>
                    <div className='total_amt'>Rs. {bagTotal}</div>
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