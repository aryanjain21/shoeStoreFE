import { useEffect } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../../common/product-card/product-card';
import { fetchWishlist, removeProduct } from '../../redux/wishlist/action';
import { useState } from 'react';

const Wishlist = (props) => {

    const { wishlistData, fetchWishlist, removeProduct } = props;
    const [wishlistProduct, setWishlistProduct] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    useEffect(() => {
        let editedWishlist = [];
        wishlistData?.wishlist?.products?.forEach((element, index) => {
            editedWishlist.push(element._id);
        });
        setWishlistProduct(editedWishlist)
    }, [wishlistData?.wishlist?.products?.length]);

    return (
        <div className='wishlist_container'>
            <div>
                <ProductCard products={wishlistProduct} isWhishlist removeProduct={removeProduct} />
            </div>
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
        removeProduct: (data) => dispatch(removeProduct(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);