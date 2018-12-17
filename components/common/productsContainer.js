import React, { Component } from 'react';
import Aux from '../hoc/Auxx';

import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/shopActions';

import Product from './product';

class ProductsContainer extends Component {
  componentDidMount() {
    this.props.getProducts();
  };

  render() {
    const { products } = this.props.product;
    const { loading, success, error } = this.props.fetching;

    if (error) {
      return <p>Error!</p>;
    };

    if (loading) {
      return <p style={{ color: '#a0a0a0' }}>Loading...</p>;
    };

    if (success && products.length > 0) {
      return (
        <Aux>
          {products.map(product =>
            <Product key={product._id} product={product} />
          )}
        </Aux>
      );
    };

    if (success && products.length === 0) {
      return <p>No Products</p>;
    }

    return null;

  };
};

const mapStateToProps = state => ({
  product: state.product,
  fetching: state.fetching
});

export default connect(mapStateToProps, { getProducts })(ProductsContainer);