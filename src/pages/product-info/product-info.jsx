import './product-info.scss';
import { connect } from 'react-redux';
import ProductDetails from '../../components/product-details/product-details';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services';
import { fetchProductList } from '../../redux/product/action.js';
import { fetchCartList } from '../../redux/cart/action';
import { fetchWishlist } from '../../redux/wishlist/action';
import { useState } from 'react';
import Loader from '../../assets/icons/loader.gif';

const ProductInfo = (props) => {

    const { productData, fetchProductList, fetchCartList, fetchWishlist } = props;
    const param = useParams();

    const [productInfo, setProductInfo] = useState({});
    const [loader, setLoader] = useState(false);

    const getProductDetails = () => {
        setLoader(true);
        getProduct({ productId: param.productId }).then(resp => {
            if (resp.data.status === 200) {
                setProductInfo(resp.data.data);
            }
        }).catch(error => {
            console.error('getProductDetails error', error);
        }).finally(() => setLoader(false));
    }

    useEffect(() => {
        getProductDetails();
        // eslint-disable-next-line
    }, [param.productId])

    useEffect(() => {
        if ('undefined' === typeof productData?.product?.products || productData?.product?.products?.length === 0) {
            fetchProductList();
        }
        // eslint-disable-next-line
    }, [])


    return (
        <div className='product_info_container'>
            {loader ?
                <div className='loader'>
                    <img src={Loader} alt="Loading..." />
                </div>
                :
                <div className='details_section'>
                    <ProductDetails productInfo={productInfo} fetchCartList={fetchCartList} fetchWishlist={fetchWishlist} />
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        productData: state.product,
        loader: state.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProductList: (data) => dispatch(fetchProductList(data)),
        fetchWishlist: () => dispatch(fetchWishlist()),
        fetchCartList: () => dispatch(fetchCartList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);