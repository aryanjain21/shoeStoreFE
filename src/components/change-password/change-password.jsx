import React, { useState } from 'react';
import '../login-form/login-form.scss';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ShowPassword from '../../assets/icons/open_eye.svg';
import HidePassword from '../../assets/icons/close_eye.svg';
import Button from '../../common/button/button';
import { changePassword } from '../../services';

const ChangePasswordForm = () => {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false)

    const InitialValues = {
        password: '',
        newPassword: ''
    }

    const ValidationSchema = yup.object({
        password: yup
            .string()
            .trim()
            .required('Please enter password')
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                'Password must contain at least one number, one special character & length must be 6 to 16 character/digits.'
            ),
        newPassword: yup
            .string()
            .trim()
            .required('Please enter new password')
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                'Password must contain at least one number, one special character & length must be 6 to 16 character/digits.'
            )
            .notOneOf([yup.ref('password'), null], 'Your new password can not be same as existing password.')
    });

    return (
        <div className='login_form_container'>
            <div className='title'>
                Change Password
            </div>
            <Formik
                initialValues={InitialValues}
                validationSchema={ValidationSchema}
                onSubmit={(values) => {
                    console.log(values)
                    changePassword(values).then(resp => {
                        console.log('resp', resp)
                        if (resp.status === 200) {
                            localStorage.removeItem('setUser');
                            console.log('resp', resp)
                            window?.location?.reload();
                        }
                    }).catch(error => {
                        console.error('changePassword error>>>', error.response);
                    });
                }}
            >
                <Form className='control_area'>
                    <div className='form_control'>
                        <div className='label'>Current Password</div>
                        <div className='form_input'>
                            <Field type={showOldPassword ? 'text' : 'password'} name='password' placeholder='Current Password' />
                            <div className='icon_area' onClick={() => setShowOldPassword(!showOldPassword)}>
                                <img src={showOldPassword ? ShowPassword : HidePassword} alt='eye' />
                            </div>
                        </div>
                        <ErrorMessage className='error' name="password" component="div" />
                    </div>
                    <div className='form_control'>
                        <div className='label'>New Password</div>
                        <div className='form_input'>
                            <Field type={showNewPassword ? 'text' : 'password'} name='newPassword' placeholder='New Password' />
                            <div className='icon_area' onClick={() => setShowNewPassword(!showNewPassword)}>
                                <img src={showNewPassword ? ShowPassword : HidePassword} alt='eye' />
                            </div>
                        </div>
                        <ErrorMessage className='error' name="newPassword" component="div" />
                    </div>
                    <div className='btn_area'>
                        <Button type={'button'}>Save</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default ChangePasswordForm;