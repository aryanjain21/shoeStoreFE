import './address-select.scss';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/button/button';
import Unchecked from '../../assets/icons/radio_unchecked.svg';
import Checked from '../../assets/icons/radio_checked.svg';
import { useState } from 'react';

const AddressSelect = (props) => {

    const { addressData } = props;

    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleRadioBtn = (item) => {
        if(!checked) {
            setSelectedAddress(item);
            setChecked(true);
        } else if(checked && selectedAddress !== item) {
            setSelectedAddress(item);
        }
    }

    const handleContinue = () => {
        navigate('/payment')
    }

    return (
        <div className='address_select_container'>
            {addressData.addressList.map((address, index) => (<div className='inner_wrapper' key={index}>
                <img src={(checked && selectedAddress===address._id) ? Checked : Unchecked} alt="radio" 
                onClick={() => handleRadioBtn(address._id)} />
                <div className='address_list_container'>
                    <div className='top_section'>
                        <div className='person_name'>{address.name}</div>
                        <div className='mobile_number'>{address.mobileNumber}</div>
                    </div>
                    <div className='address_section'>
                        <div className='street'>{address.street} {address.landmark} - {address.city}</div>
                        <div className='area'>{address.state} - {address.pincode}</div>
                    </div>
                </div>
            </div>))}
            {checked && <div className='btn_area'>
                <Button clickHandler={handleContinue}>Continue</Button>
            </div>}
            <div className='info_txt'>
                If you want to update address details please <span onClick={() => navigate('/address')}>click here</span>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        addressData: state.addressList,
        loader: state.loader
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchAddressList: (data) => dispatch(fetchAddressList(data)) 
//     }
// }

export default connect(mapStateToProps, null)(AddressSelect);