import './order-summary.scss';
import Button from '../../common/button/button';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../common/modal/modal';
import AddressSelect from '../address-select/address-select';
import { addressList } from '../../redux/address/action';
import { getAllAddress } from '../../services';

const OrderSummary = (props) => {

    const {amountData} = props;

    const dispatch = useDispatch();

    const [bagTotal, setBagTotal] = useState(0);
    const [addressModal, setAddressModal] = useState(false);

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
    }, [amountData]);

    const fetchAddressList = () => {
        getAllAddress().then(resp => {
            let list = resp.data.data;
            dispatch(addressList(list));
            setAddressModal(true);
            localStorage.setItem('setAmount', JSON.stringify({ cartAmount: amountData?.cartValue, total: bagTotal }));
        }).catch(error => {
            setAddressModal(false)
            console.error('fetchAddressList error>>>', error.response);
        })
    }

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
                <Button clickHandler={fetchAddressList}>
                    Checkout Now
                </Button>
            </div>
            <Modal showModal={addressModal} title={'Select Address'} closeHandler={() => setAddressModal(false)}>
                <AddressSelect />
            </Modal>
        </div>
    );
};

export default OrderSummary;