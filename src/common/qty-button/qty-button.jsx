import { useState } from 'react';
import './qty-button.scss';
import { connect } from 'react-redux';
import { updateQty } from '../../services';
import { fetchCartList, updateProductQty } from '../../redux/cart/action';
import { toast } from 'react-toastify';

const QtyButton = (props) => {

    const { qty=1, productId, fetchCartList, updateProductQty } = props;
    const [productQty, setProductQty] = useState(qty);

    const handleQtyBtn = (qty, btnFlag) => {
        let newQty = qty;
        if(btnFlag) {
            newQty += 1;
        } else {
            if(newQty > 1) {
                newQty -= 1;
            } else {
                toast.warn('Minimum one quantity required.')
                return;
            }
        }
        setProductQty(newQty);
        updateProductQty({productId: productId, qty: newQty});
    }

    return (
        <div className='qty_button_section'>
            <div className='btn_area'>
                <div className='minus_btn' onClick={() => handleQtyBtn(productQty, false)}>-</div>
                <div className='qty_count'>{productQty}</div>
                <div className='plus_btn' onClick={() => handleQtyBtn(productQty, true)}>+</div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCartList: () => dispatch(fetchCartList()),
        updateProductQty: (data) => dispatch(updateProductQty(data))
    }
}

export default connect(null, mapDispatchToProps)(QtyButton);