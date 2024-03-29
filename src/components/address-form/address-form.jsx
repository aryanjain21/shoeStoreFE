import './address-form.scss';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../../common/button/button';
import { addAddress, updateAddress } from '../../services';

const AddressForm = (props) => {

    const { editAddress=false, setEditAddress, editData,setEditData, fetchAddressList, setAddressModal } = props;

    const InitialValues = {
        name: editData.name ? editData.name : '',
        mobileNumber: editData.mobileNumber ? editData.mobileNumber : '',
        street: editData.street ? editData.street : '',
        landmark: editData.landmark ? editData.landmark : '',
        city: editData.city ? editData.city : '',
        state: editData.state ? editData.state : '',
        pincode: editData.pincode ? editData.pincode : '',
        country: editData.country ? editData.country : ''
    }

    const ValidationSchema = yup.object({
        name: yup
            .string()
            .trim()
            .required('Please enter name'),
        mobileNumber: yup
            .string()
            .trim()
            .required('Please enter mobile number')
            .max(10, 'Please enter valid mobile number')
            .matches(
                /^[0]?[789]\d{9}$/,
                'Please enter valid mobile number'
            ),
        street: yup
            .string()
            .trim()
            .required('Please enter street'),
        landmark: yup
            .string()
            .trim(),
        city: yup
            .string()
            .trim()
            .required('Please enter city'),
        state: yup
            .string()
            .trim()
            .required('Please enter state'),
        pincode: yup
            .string()
            .trim()
            .required('Please enter password')
            .matches(
                /^[1-9][0-9]{5}$/,
                'Please enter valid pincode'
            ),
        country: yup
            .string()
            .trim()
            .required('Please enter country'),
    });

    return (
        <div className='address_form_container'>
            <Formik
                initialValues={InitialValues}
                validationSchema={ValidationSchema}
                onSubmit={(values) => {
                    if (editAddress) {
                        let editAddressData = values;
                        editAddressData.addressId = editData._id;
                        updateAddress(editAddressData).then(resp => {
                            if(resp.data.status === 200) {
                                fetchAddressList();
                            }
                        }).catch(error => {
                            console.error('Update Address error', error)
                        }).finally(() => {
                            setAddressModal(false);
                            setEditAddress(false);
                            setEditData({});
                        })
                    } else {
                        addAddress(values).then(resp => {
                            fetchAddressList();
                        }).catch(error => {
                            console.error('Add Address error', error)
                        }).finally(() => {
                            setAddressModal(false);
                            setEditAddress(false)
                        })
                    }
                }}>
                <Form>
                    <div className='control_area'>
                        <div className='form_control'>
                            <div className='label'>Name</div>
                            <div className='form_input'>
                                <Field type="text" name='name' placeholder='Fullname' />
                            </div>
                            <ErrorMessage className='error' name="name" component="div" />
                        </div>
                        <div className='form_control'>
                            <div className='label'>Mobile Number</div>
                            <div className='form_input'>
                                <Field type="number" name='mobileNumber' placeholder='Mobile number' />
                            </div>
                            <ErrorMessage className='error' name="mobileNumber" component="div" />
                        </div>
                        <div className='form_control'>
                            <div className='label'>Street</div>
                            <div className='form_input'>
                                <Field type="text" name='street' placeholder='Flat no, street, area' />
                            </div>
                            <ErrorMessage className='error' name="street" component="div" />
                        </div>
                        <div className='form_control'>
                            <div className='label'>Landmark(Optional)</div>
                            <div className='form_input'>
                                <Field type="text" name='landmark' placeholder='Landmark(Optional)' />
                            </div>
                        </div>
                        <div className='form_control'>
                            <div className='label'>City</div>
                            <div className='form_input'>
                                <Field type="text" name='city' placeholder='City' />
                            </div>
                            <ErrorMessage className='error' name="city" component="div" />
                        </div>
                        <div className='form_control'>
                            <div className='label'>State</div>
                            <div className='form_input'>
                                <Field type="text" name='state' placeholder='State' />
                            </div>
                            <ErrorMessage className='error' name="state" component="div" />
                        </div>
                        <div className='form_control'>
                            <div className='label'>Pincode</div>
                            <div className='form_input'>
                                <Field type="text" name='pincode' placeholder='Pincode' />
                            </div>
                            <ErrorMessage className='error' name="pincode" component="div" />
                        </div>
                        <div className='form_control'>
                            <div className='label'>Country</div>
                            <div className='form_input'>
                                <Field type="text" name='country' placeholder='Country' />
                            </div>
                            <ErrorMessage className='error' name="country" component="div" />
                        </div>
                    </div>
                    <div className='btn_area'>
                        <Button type={'button'}>{editAddress ? 'Update' : 'Save'}</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default AddressForm;