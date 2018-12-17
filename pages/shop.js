import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addProduct, getProducts } from '../redux/actions/shopActions';

import Layout from '../components/layout/Layout';
// import Product from '../components/common/product';
import ProductsContainer from '../components/common/productsContainer';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      category: '',
      price: '',
      image: '',
      imagePreviewUrl: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  };

  componentDidMount() {
    this.props.getProducts();
  };

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      title: this.state.title,
      text: this.state.text,
      category: this.state.category,
      price: this.state.price,
      image: this.state.image
    };

    this.props.addProduct(newProduct);
    this.setState({
      title: '',
      text: '',
      price: '',
      category: '',
      image: '',
      imagePreviewUrl: ''
    });
  };

  fileSelectedHandler(e) {
    let files = e.target.files;

    this.setState({
      imagePreviewUrl: URL.createObjectURL(e.target.files[0])
    });

    const fr = new FileReader();
    fr.readAsDataURL(files[0]);
    fr.onload = (e) => {
      this.setState({
        image: e.target.result
      });
    }
  };

  render() {
    // Map over products
    // const { products } = this.props.product;
    const { message } = this.props.message;
    // let productContent;

    // productContent = products.map(product =>
    //   <Product key={product._id} product={product} />
    // );

    // Image previewer
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={{ width: '220px', height: '220px' }} src={imagePreviewUrl} />);
    };

    return (
      <Layout>
        <div className='productContainer'>
          <h2>Create a new product</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              className='productInput'
              type='text'
              name='title'
              value={this.state.title}
              placeholder='Product Title...'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
            <textarea
              className='taInput'
              type='text'
              name='text'
              value={this.state.text}
              placeholder='Enter your product description here...'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
            <input
              className='productInput'
              type='text'
              name='category'
              value={this.state.category}
              placeholder='Product Category...'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
            <input
              className='priceInput'
              type='text'
              name='price'
              value={this.state.price}
              placeholder='Product Price...'
              onChange={this.handleInputChange}
              autoComplete='off'
            />

            {/* Image Upload */}
            <input
              style={{ display: 'none' }}
              type='file'
              onChange={this.fileSelectedHandler}
              ref={fileInput => this.fileInput = fileInput}
            />
            <button className='imagePickBut' type='button' onClick={() => this.fileInput.click()}>Choose an image</button>

            <div className='imagePreviewContainer'>
              {$imagePreview}
            </div>
            <p className='imagePickText'>*Images will be transformed to 220x220 pixels</p>
            {/* Image Upload */}

            <button type='submit' className='subBut'>Submit</button>
            <span className='productMessage'>{message}</span>
          </form>

          <div className='getProductsContainer'>
            <h2>Your products</h2>
            {/* {productContent} */}
            <ProductsContainer />
          </div>
        </div>

        <style jsx>
          {`
            .productMessage {
              padding: 10px;
              font-family: Oxygen, sans-serif;
              font-weight: 800;
            }

            h2 {
              margin: 0px;
              padding: 0px;
            }

            .productContainer {
              width: 100%;
              padding: 70px;
              box-sizing: border-box;
            }
            
            .productLabel {
              display: block;
            }

            .productInput {
              display: block;
              width: 100%;
              margin-top: 20px;
              margin-bottom: 20px;
              padding: 10px;
              box-sizing: border-box;
              border: 1px solid #bcbcbc;
              border-radius: 6px;
              font-family: Oxygen, sans-serif;
              font-size: 14px;
            }

            .taInput {
              display: block;
              min-height: 150px;
              width: 100%;
              min-width: ;
              max-width:;
              margin-top: 20px;
              margin-bottom: 20px;
              padding: 10px;
              box-sizing: border-box;
              border: 1px solid #bcbcbc;
              border-radius: 6px;
              font-family: Oxygen, sans-serif;
              font-size: 14px;
            }

            .priceInput {
              display: block;
              width: 100%;
              margin-top: 20px;
              margin-bottom: 20px;
              padding: 10px;
              box-sizing: border-box;
              border: 1px solid #bcbcbc;
              border-radius: 6px;
              font-family: Oxygen, sans-serif;
              font-size: 14px;
            }

            .subBut {
              width: 80px;
              box-sizing: border-box;             
              padding: 11px;
              background-color: #2673cc;
              box-shadow: 3px 3px #c5d0dd;
              border: none;
              border-radius: 3px;
              color: white;
              font-size: 13px;
              font-weight: bold;
              cursor: pointer;
              outline: none;
              transition: 0.2s;
            }

            .subBut:hover {
              background-color: #4e92e0;
            }

            .subBut:active {
              box-shadow: 2px 2px #c5d0dd;
              transform: translate(1px, 1px);
            }

            .break {
              width: 100%;
              margin-top: 30px;
              margin-bottom: 50px;
              border-top: 1px solid #c4c4c4;
            }

            .getProductsContainer {
              width: 100%;
              box-sizing: border-box;
              margin-top: 50px;
            }

            .imagePickBut {
              width: 147px;
              box-sizing: border-box;   
              margin: 0px auto;          
              padding: 11px;
              background-color: #22a91f;
              box-shadow: 3px 3px #9ab299;
              border: none;
              border-radius: 3px;
              color: white;
              font-size: 13px;
              font-weight: bold;
              cursor: pointer;
              outline: none;
              transition: 0.2s;
            }

            .imagePickBut:hover {
              background-color: #24b721;
            }

            .imagePickBut:active {
              box-shadow: 2px 2px #9ab299;
              transform: translate(1px, 1px);
            }

            .imagePickText {
              font-size: 13px;
              font-weight: bold;
              margin-bottom: 60px;
            }

            .imagePreviewContainer {
              height: 220px;
              width: 220px;
              margin-top: 20px;
              margin-bottom: 20px;
              box-sizing: border-box;
              border: 1px solid #a0a0a0;
              background-color: #cccccc;
              color: white;
              text-align: center;
              font-size: 12px;
              line-height: 140px;
            }

            @media only screen and (max-width: 999px) {
              .productContainer {
                padding-top: 5px;
                padding-left: 5px;
                padding-right: 5px;
              }
            }

            a:focus, a:active, 
            button::-moz-focus-inner,
            input[type="reset"]::-moz-focus-inner,
            input[type="button"]::-moz-focus-inner,
            input[type="submit"]::-moz-focus-inner,
            select::-moz-focus-inner,
            input[type="file"] > input[type="button"]::-moz-focus-inner {
            border: 0;
            outline : 0;
          `}
        </style>
      </Layout>
    );
  };
};

Shop.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  message: state.message
});

export default connect(mapStateToProps, { addProduct, getProducts })(Shop);