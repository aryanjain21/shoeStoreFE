import "./product-card.scss";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import Heart from "../../assets/icons/heart.svg";
import FillHeart from "../../assets/icons/fill_heart.svg";
import { moveToCart, addToWishlist } from "../../services";
import { toast } from "react-toastify";
import { updateLength } from "../../redux/wishlist/action";
import { useDispatch } from "react-redux";

const ProductCard = (props) => {
  const {
    products = [],
    hidebtn,
    isCarousel,
    isWhishlist,
    removeProduct,
    fetchWishlist,
    fetchCartList,
    pageName
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (id) => {
    if (isWhishlist || pageName === 'PRODUCT') {
      navigate(`/buy/${id}`);
    } else {
      navigate(`/product`);
    }
  };

  const handleBtnClick = (id) => {
    if (isWhishlist) {
      moveToCart({ productId: id })
        .then((resp) => {
          if (resp.data.status === 200) {
            toast.success(resp.data.message);
            fetchWishlist();
            fetchCartList();
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      navigate(`/buy/${id}`);
    }
  };

  const handleWishlist = (productId) => {
    addToWishlist(productId)
      .then((resp) => {
        if (resp.data.status === 200) {
          toast.success(resp.data.message);
          dispatch(updateLength(resp.data.data));
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div
      className={`product_card_container ${isWhishlist ? "wishlist_data" : ""}`}
    >
      {isCarousel ? (
        products.length > 0 &&
        products.map((product, index) => {
          return (
            <div
              className={`product_wrapper ${
                hidebtn ? "product_without_btn" : ""
              }`}
              key={index}
            >
              <div
                className="product_image_section"
                onClick={() => handleNavigation(product._id)}
              >
                <img src={product.image} alt="product" />
              </div>
              <div className="product_discription">
                <div className="product_details">
                  <div className="brand">{product.brand}</div>
                  <div
                    className="title"
                    onClick={() => handleNavigation(product._id)}
                  >
                    {product.title}
                  </div>
                  <div className="price_section">
                    <div className="discount_price">
                      <span className="strike_through">
                        MRP ₹{product.price}
                      </span>{" "}
                      <span className="discount">
                        ({product.discount}% off)
                      </span>
                    </div>
                    <div className="discount_price mrp_price">
                      Rs.{" "}
                      {(
                        product.price -
                        product.price * (product.discount / 100)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
                {!hidebtn && (
                  <div className="btn_area">
                    <Button
                      clickHandler={() => {
                        navigate(`/buy/${product._id}`);
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : products.length > 0 ? (
        <>
        {pageName !== 'HOME' && <div className="total_product">Total Available Product: <span>{products.length}</span></div>}
        {products.map((product, index) => (
          <div
            className={`product_wrapper ${
              hidebtn ? "product_without_btn" : ""
            }`}
            key={index}
          >
            <div
              className="product_image_section"
              onClick={() => handleNavigation(product._id)}
            >
              <img src={product.image} alt="product" />
            </div>
            <div className="product_discription">
              <div className="product_details">
                {isWhishlist ? (
                  <div
                    className="wished_icon"
                    onClick={() => removeProduct({ productId: product._id })}
                  >
                    <img src={FillHeart} alt="wished" />
                  </div>
                ) : (
                  <div
                    className="wished_icon"
                    onClick={() => handleWishlist({ productId: product._id })}
                  >
                    <img src={Heart} alt="wish" />
                  </div>
                )}
                <div className="brand">{product.brand}</div>
                <div
                  className="title"
                  onClick={() => handleNavigation(product._id)}
                >
                  {product.title}
                </div>
                <div className="price_section">
                  <div className="discount_price">
                    <span className="strike_through">MRP ₹{product.price}</span>{" "}
                    <span className="discount">({product.discount}% off)</span>
                  </div>
                  <div className="discount_price mrp_price">
                    Rs.{" "}
                    {(
                      product.price -
                      product.price * (product.discount / 100)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
              {!hidebtn && (
                <div className="btn_area">
                  <Button clickHandler={() => handleBtnClick(product._id)}>
                    {isWhishlist ? "Move to Cart" : "Buy Now"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        </>
      ) : (
        <div className="no_product">
          No Product available for matching filters.
        </div>
      )}
    </div>
  );
};

export default ProductCard;
