import './product.scss';
import { connect } from 'react-redux';
import ProductCard from '../../common/product-card/product-card';
import Filter from '../../components/filter/filter';
import { fetchProductList } from '../../redux/product/action';
import { useEffect } from 'react';

const Product = (props) => {

    const { productData, fetchProductList } = props;

    const filterOption = [
        {
            key: 'gender',
        },
        {
            key: 'size',
        },
        {
            key: 'brands',
        },
        {
            key: 'price',
        }
    ]

    useEffect(() => {
        if ('undefined' === typeof productData?.product?.products || productData?.product?.products?.length === 0) {
            fetchProductList();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='product_container'>
            <div className='inner_wrapper'>
                <div className='filter_section'>
                    <Filter filterOption={filterOption} fetchProductList={fetchProductList} />
                </div>
                <div>
                    <ProductCard products={productData?.product?.products} />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);