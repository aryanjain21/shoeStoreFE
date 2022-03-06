import './product-info.scss';
import { connect } from 'react-redux';
import ProductDetails from '../../components/product-details/product-details';
// import ProductCard from '../../common/product-card/product-card';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services';
import { fetchProductList } from '../../redux/product/action.js';
import { fetchCartList } from '../../redux/cart/action';
import { fetchWishlist } from '../../redux/wishlist/action';
import { useState } from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

const ProductInfo = (props) => {

    // const responsive = {
    //     superLargeDesktop: {
    //         // the naming can be any, depends on you.
    //         breakpoint: { max: 4000, min: 3000 },
    //         items: 5
    //     },
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 3
    //     },
    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2
    //     },
    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1
    //     }
    // };

    const { productData, fetchProductList, fetchCartList, fetchWishlist } = props;
    const param = useParams();

    const [productInfo, setProductInfo] = useState({});

    const getProductDetails = () => {
        getProduct({ productId: param.productId }).then(resp => {
            if (resp.data.status === 200) {
                setProductInfo(resp.data.data);
            }
        });
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
            <div className='details_section'>
                <ProductDetails productInfo={productInfo} fetchCartList={fetchCartList} fetchWishlist={fetchWishlist} />
            </div>
            {/* <div className='product_section'>
                <Carousel responsive={responsive}>
                    <ProductCard products={productData?.product?.products?.slice(0, 10)} isCarousel />
                </Carousel>
            </div> */}
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