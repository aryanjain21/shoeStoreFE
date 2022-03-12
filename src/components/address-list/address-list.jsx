import Button from '../../common/button/button';
import './address-list.scss';
import { deleteAddress } from '../../services';

const AddressList = (props) => {

    const { addressData, handleEdit, fetchAddressList } = props;

    const handleRemove = (addressId) => {
        deleteAddress({ addressId: addressId }).then(resp => {
            if (resp.data.status === 200) {
                fetchAddressList();
            }
        })
    }

    return (
        (addressData.addressList.length > 0) ?
            addressData.addressList.map((address, index) => {
                return <div className='address_list_container' key={index}>
                    <div className='top_section'>
                        <div className='person_name'>{address.name}</div>
                        <div className='mobile_number'>{address.mobileNumber}</div>
                    </div>
                    <div className='address_section'>
                        <div className='street'>{address.street} {address.landmark} - {address.city}</div>
                        <div className='area'>{address.state} - {address.pincode}</div>
                    </div>
                    <div className='btn_section'>
                        <div className='edit_btn'><Button clickHandler={() => handleEdit(address)}>Edit</Button></div>
                        <div className='remove_btn'><Button clickHandler={() => handleRemove(address._id)}>Remove</Button></div>
                    </div>
                </div>
            })
            : null
    );
}

export default AddressList;