import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrder } from "../../redux/order/action";
import "./orderConfirmation.scss";
import { useNavigate } from "react-router-dom";
import Button from "../../common/button/button.jsx";
import Loader from "../../assets/icons/loader.gif";

const OrderConfirmation = (props) => {
  const { fetchOrder, orderData } = props;

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder({ orderId: param.orderId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return (
    <div className="order_confirmation_container">
      {!orderData.loader ? (
        <div className="order_confirmation_wrapper">
          <div className="title">Congratulatios!!</div>
          <div className="sub_title">Order Placed Successfully!!</div>
          <div className="order_details_section">
            <div className="details_title">Order Details</div>
            <div className="section">
              {orderData &&
                orderData.orderList &&
                orderData.orderList.products &&
                orderData.orderList.products.length > 0 &&
                orderData.orderList.products.map((product, index) => (
                  <div className="product_details" key={index}>
                    <div className="img">
                      <img
                        src={product._id.image}
                        alt={`product-${index + 1}`}
                      />
                    </div>
                    <div className="name">
                      {product._id.brand} - {product._id.title}
                    </div>
                  </div>
                ))}
              <div className="id">
                orderId:&nbsp;<strong>{orderData?.orderList?.orderId}</strong>
              </div>
              <div>
                Mobile No:&nbsp;
                <strong>
                  {orderData?.orderList?.shippingAddress?.mobileNumber}
                </strong>
              </div>
              <div>
                Address:&nbsp;
                <strong>
                  {orderData?.orderList?.shippingAddress?.street},
                  {orderData?.orderList?.shippingAddress?.city},{" "}
                  {orderData?.orderList?.shippingAddress?.state},{" "}
                  {orderData?.orderList?.shippingAddress?.pincode},
                  {orderData?.orderList?.shippingAddress?.country},
                </strong>
              </div>
            </div>
          </div>
          <div className="btn_area">
            <Button
              type={"button"}
              clickHandler={() => {
                navigate("/product");
              }}
            >
              Shop Again
            </Button>
          </div>
        </div>
      ) : (
        <div className="loader">
          <img src={Loader} alt="Loading..." />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orderData: state.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (data) => dispatch(fetchOrder(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
