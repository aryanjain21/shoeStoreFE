// import StripeCheckout from 'react-stripe-checkout';
// import { Formik, Form } from 'formik';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import PaymentCard from './paymentCard/paymentCard';

const Payment = () => {

    const stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    const [success, setSuccess] = useState(false);

    return (
        <Elements className='' stripe={stripeTestPromise}>
            {/* <Formik>
                <Form className='control_area'>
                    <div>
                        <h2>Payment Info</h2>
                    </div>
                    <div className={styles.column}>
                        <label className={styles.payment_label}>Email</label>
                        <Field className={styles.payment_field} value={user.email} type="text" placeholder="Enter your email" />
                    </div>
                    <div className={styles.column}>
                        <label className={styles.payment_label} >Amount in Rs.</label>
                        <Field className={styles.payment_field} value={cartValue} />
                    </div>
                    <div className={styles.column}>
                        <label className={styles.payment_label} >Debit Card</label>
                        <Field className={styles.payment_field} value="4242424242424242" />
                    </div>
                    <StripeCheckout
                        stripeKey={`${process.env.REACT_APP_STRIPE_KEY}`}
                        token={handleSubmit}
                        name="Checkout"
                        amount={500 * 100}
                        currency="INR"
                        email={'abc@gmail.com'}
                        ComponentClass="div"
                    >
                        <div style={{textAlign:'center'}}>
                            <button type="button" onClick={handleSubmit}>Pay</button>
                        </div>
                    </StripeCheckout>
                </Form>
            </Formik> */}
                    <>
        {!success && 
            <PaymentCard setSuccess={setSuccess} /> 
        }
            
        </>
        </Elements>

    )
}

export default Payment