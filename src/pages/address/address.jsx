import { useEffect, useState } from 'react';
import './address.scss';
import AddressForm from '../../components/address-form/address-form';
import AddressList from '../../components/address-list/address-list';
import Modal from '../../common/modal/modal';
import { connect, useDispatch } from 'react-redux';
import { fetchAddressList } from '../../redux/address/action';

const Address = (props) => {

    const { addressData, loader, fetchAddressList } = props;

    const [addressModal, setAddressModal] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [editData, setEditData] = useState({});

    const openAddressModal = () => {
        setAddressModal((prevState) => !prevState)
    }

    const handleEdit = (data) => {
        console.log('handleEdit', data)
        setAddressModal(true);
        setEditAddress(true);
        setEditData(data);
    }

    const handleRemove = () => {

    }

    useEffect(() => {
        fetchAddressList();
    }, []);
    

    return (
        <>
            <div className='address_container'>
                <div className='link_section'>
                    <div className='add_link' onClick={openAddressModal}>Add Address</div>
                </div>
                <div className='saved_address'>
                    <AddressList {...props} handleRemove={handleRemove} handleEdit={handleEdit} />
                </div>
            </div>
            {addressModal && <Modal title={editAddress ? 'Update Address' : 'Add Address'} showModal={addressModal} closeHandler={openAddressModal}>
                <AddressForm editAddress={editAddress} setEditAddress={setEditAddress} editData={editData} fetchAddressList={fetchAddressList} setAddressModal={setAddressModal} />
            </Modal>}
        </>
    );
}

const mapStateToProps = state => {
    return {
        addressData: state.addressList,
        loader: state.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAddressList: (data) => dispatch(fetchAddressList(data)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);