import './product-info.scss';
import { connect } from 'react-redux';
import ProductDetails from '../../components/product-details/product-details';
import ProductCard from '../../common/product-card/product-card';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services';
import { fetchProductList } from '../../redux/product/action.js';
import { useState } from 'react';

const ProductInfo = (props) => {

    const { productData, fetchProductList } = props;
    const param = useParams();

    const [productInfo, setProductInfo] = useState({});

    const getProductDetails = () => {
        getProduct({ productId: param.productId }).then(resp => {
            if(resp.data.status === 200) {
                setProductInfo(resp.data.data);
            }
        });
    }

    useEffect(() => {
        getProductDetails();
    }, [param.productId])

    useEffect(() => {
        if('undefined' === typeof productData?.product?.products || productData?.product?.products?.length === 0) {
            fetchProductList();
        }
    }, [])


    return (
        <div className='product_info_container'>
            <div className='details_section'>
                <ProductDetails productInfo={productInfo} />
            </div>
            <div className='product_section'>
                <ProductCard products={productData?.product?.products?.slice(0, 10)} />
            </div>
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
        fetchProductList: (data) => dispatch(fetchProductList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);