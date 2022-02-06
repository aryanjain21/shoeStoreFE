import './home.scss';
import ProductCard from '../../common/product-card/product-card';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProductList } from '../../redux/product/action.js';

const Home = (props) => {

    const { productData, fetchProductList } = props;
    // let { products = [] } = productData.product.products;
    console.log(productData.product.products)

    useEffect(() => {
        fetchProductList();
    }, []);

    return (
        <>
            <div className='names'><ProductCard products={productData.product.products} /></div>
        </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);