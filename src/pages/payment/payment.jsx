import StripeCheckout from 'react-stripe-checkout';
import { Formik, Form } from 'formik';
import { payment } from '../../services';

const Payment = () => {
   
    const checkout = async (token) => {
        let obj = {
            token: token,
            amount: 500
        }
        payment(obj).then(resp => {
            console.log(resp);
        }).catch(error => {
            console.error('payment>>>', error);
        });
    }


    return (
        <div className=''>
            <Formik>
                <Form className='control_area'>
                    <div>
                        <h2>Payment Info</h2>
                    </div>
                    {/* <div className={styles.column}>
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
                    </div> */}
                    <StripeCheckout
                        stripeKey={`${process.env.REACT_APP_STRIPE_KEY}`}
                        token={checkout}
                        name="Checkout"
                        amount={500 * 100}
                        currency="INR"
                        email={'abc@gmail.com'}
                        ComponentClass="div"
                    >
                        <div style={{textAlign:'center'}}>
                            <button type="button" onClick={checkout}>Pay</button>
                        </div>

                    </StripeCheckout>
                </Form>
            </Formik>
        </div>

    )
}

export default Payment