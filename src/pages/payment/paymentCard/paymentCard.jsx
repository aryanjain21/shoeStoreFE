import React from "react";
import './paymentCard.scss';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { payment } from "../../../services";
import Button from '../../../common/button/button';
import { fetchCartList } from '../../../redux/cart/action';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const PaymentCard = ({ setSuccess, fetchCartList }) => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const totalAmount = JSON.parse(localStorage.getItem('setAmount'));
        console.log(totalAmount.total);
        let obj = {
          id,
          amount: parseInt(totalAmount.total),
        };
        const response = await payment(obj);

        if (response.data.success) {
          console.log("Successful Payment");
          fetchCartList();
          setSuccess(true);
          navigate(`/order-status/${response.data.data.orderId}`)
        }
      } catch (error) {
        console.log("Error in Payment", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <Button
            type={"button"}>
            Pay
          </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartList: () => dispatch(fetchCartList()),
  };
};

export default connect(null, mapDispatchToProps)(PaymentCard);
