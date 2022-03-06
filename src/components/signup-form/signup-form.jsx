import '../login-form/login-form.scss';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../../common/button/button';
import { signUp } from '../../services';
import ShowPassword from '../../assets/icons/open_eye.svg';
import HidePassword from '../../assets/icons/close_eye.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';

const SignUpForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const InitialValues = {
        fullName: '',
        email: '',
        password: ''
    }

    const ValidationSchema = yup.object({
        fullName: yup
            .string()
            .trim()
            .required('Please enter name'),
        email: yup
            .string()
            .trim()
            .required('Please enter email')
            .email('Please enter a valid email'),
        password: yup
            .string()
            .trim()
            .required('Please enter password')
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                'Password must contain at least one number, one special character & length must be 6 to 16 character/digits.'
            )
    });

    return (
        <div className='login_form_container'>
            <div className='title'>
                Create Your Account
            </div>
            <Formik
                initialValues={InitialValues}
                validationSchema={ValidationSchema}
                onSubmit={(values) => {
                    signUp(values).then(resp => {
                        toast.success(resp.data.message);
                        setTimeout(() => {
                            if ('undefined' !== typeof window) {
                                window.location.href = '/home';
                            }
                        }, 500);
                    }).catch((error) => {
                        toast.error(error?.response?.data?.message);
                    })
                }}>
                <Form className='control_area'>
                    <div className='form_control'>
                        <div className='label'>Name</div>
                        <div className='form_input'>
                            <Field type="text" name='fullName' placeholder='Name' />
                        </div>
                        <ErrorMessage className='error' name="fullName" component="div" />
                    </div>
                    <div className='form_control'>
                        <div className='label'>Email Id</div>
                        <div className='form_input'>
                            <Field type="text" name='email' placeholder='Eg:abc@gmail.com' />
                        </div>
                        <ErrorMessage className='error' name="email" component="div" />
                    </div>
                    <div className='form_control'>
                        <div className='label'>Password</div>
                        <div className='form_input'>
                            <Field type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' />
                            <div className='icon_area' onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword ? ShowPassword : HidePassword} alt='eye' />
                            </div>
                        </div>
                        <ErrorMessage className='error' name="password" component="div" />
                    </div>
                    <div className='btn_area'>
                        <Button type={'button'}>Sign Up</Button>
                    </div>
                </Form>
            </Formik>
            <div className='account_link'>
                Already have account? <Button type={'link'} redirectionLink={'/login'}>Login</Button>
            </div>
        </div>
    );
}

export default SignUpForm;