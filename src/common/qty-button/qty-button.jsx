import { useState } from 'react';
import './qty-button.scss';
import { connect } from 'react-redux';
import { updateQty } from '../../services';
import { fetchCartList } from '../../redux/cart/action'; 

const QtyButton = (props) => {

    const { qty=1, productId, fetchCartList } = props;
    const [productQty, setProductQty] = useState(qty);

    const handleQtyBtn = (qty, btnFlag) => {
        let newQty = qty;
        if(btnFlag) {
            newQty += 1;
        } else {
            if(newQty > 1) {
                newQty -= 1;
            }
        }
        setProductQty(newQty);
        updateQty({productId: productId, qty: newQty}).then(resp => {
            if(resp.data.status === 200) {
                fetchCartList();
            }
        }).catch(error => {
            console.log('updateQty error>>>', error.response)
        });
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
        fetchCartList: () => dispatch(fetchCartList()) 
    }
}

export default connect(null, mapDispatchToProps)(QtyButton);