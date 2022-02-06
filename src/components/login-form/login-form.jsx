import './login-form.scss';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../../common/button/button';

const LoginForm = (props) => {

    const { fetchUserDetails } = props;

    const InitialValues = {
        email: '',
        password: ''
    }

    const ValidationSchema = yup.object({
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
                Sign In
            </div>
            <Formik
                initialValues={InitialValues}
                validationSchema={ValidationSchema}
                onSubmit={(values) => {
                    console.log('Login form', values)
                    let resp = fetchUserDetails(values);
                }}>
                <Form className='control_area'>
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
                            <Field /*type={showPassword ? 'text' : 'password'}*/ name='password' placeholder='Password' />
                            {/* <div className='icon_area' onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword ? ShowPassword : HidePassword} alt='eye' />
                            </div> */}
                        </div>
                        <ErrorMessage className='error' name="password" component="div" />
                    </div>
                    <div className='btn_area'>
                        <Button type={'button'}>Sign In</Button>
                    </div>
                </Form>
            </Formik>
            <div>
                <Button type={'link'}>Create your Account</Button>
            </div>
        </div>
    );
}

export default LoginForm;