import Button from '../../common/button/button';
import './address-list.scss';

const AddressList = (props) => {

    const { addressData, handleRemove, handleEdit } = props;

    return (
        addressData.loader ? <h4>Loading....</h4> :
            (addressData.addressList.length > 0) ?
                addressData.addressList.map((address, index) => {
                    return <div className='address_list_container' key={index}>
                        <div className='top_section'>
                            <div className='person_name'>Name</div>
                            <div className='mobile_number'>9876543210</div>
                        </div>
                        <div className='address_section'>
                            <div className='street'>{address.line1} - {address.city}</div>
                            <div className='area'>{address.state} - {address.postal_code}</div>
                        </div>
                        <div className='btn_section'>
                            <div className='edit_btn'><Button clickHandler={() => handleEdit(address)}>Edit</Button></div>
                            <div className='remove_btn'><Button>Remove</Button></div>
                        </div>
                    </div>
                })
                : null
    );
}

export default AddressList;