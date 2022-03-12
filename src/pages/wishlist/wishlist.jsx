import { useEffect } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../../common/product-card/product-card';
import { fetchWishlist, removeProduct } from '../../redux/wishlist/action';
import { fetchCartList } from '../../redux/cart/action';
import { useState } from 'react';
import Loader from '../../assets/icons/loader.gif';

const Wishlist = (props) => {

    const { wishlistData, fetchWishlist, removeProduct, fetchCartList } = props;
    const [wishlistProduct, setWishlistProduct] = useState([]);

    useEffect(() => {
        fetchWishlist();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let editedWishlist = [];
        wishlistData?.wishlist?.products?.forEach((element, index) => {
            editedWishlist.push(element._id);
        });
        setWishlistProduct(editedWishlist)
        // eslint-disable-next-line
    }, [wishlistData?.wishlist?.products?.length]);

    return (
        <div style={{height: "90vh"}}>
            {wishlistData.loader ?
                <div className='loader'>
                    <img src={Loader} alt="Loading..." />
                </div>
                :
                <ProductCard products={wishlistProduct} fetchWishlist={fetchWishlist} fetchCartList={fetchCartList} isWhishlist removeProduct={removeProduct} />
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        wishlistData: state.wishlist,
        loader: state.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchWishlist: () => dispatch(fetchWishlist()),
        removeProduct: (data) => dispatch(removeProduct(data)),
        fetchCartList: () => dispatch(fetchCartList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);