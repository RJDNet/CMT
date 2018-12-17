import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { deleteProduct, editProduct } from '../../redux/actions/shopActions';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      category: '',
      price: '',
      bkTitle: '',
      bkText: '',
      bkCategory: '',
      bkPrice: '',
      image: '',
      imagePreviewUrl: '',
      imagePreviewUrlBk: '',
      editable: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  };

  componentDidMount() {
    this.setState({
      title: this.props.product.title,
      text: this.props.product.text,
      category: this.props.product.category,
      price: this.props.product.price,
      bkTitle: this.props.product.title,
      bkText: this.props.product.text,
      bkCategory: this.props.product.category,
      bkPrice: this.props.product.price,
      image: this.props.product.image.secure_url,
      imagePreviewUrl: this.props.product.image.secure_url,
      imagePreviewUrlBk: this.props.product.image.secure_url
    });
  };

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editToggler = () => {
    this.setState({
      editable: !this.state.editable
    });
  };

  cancelToggler = () => {
    this.setState({
      title: this.state.bkTitle,
      text: this.state.bkText,
      category: this.state.bkCategory,
      price: this.state.bkPrice,
      imagePreviewUrl: this.state.imagePreviewUrlBk,
      editable: !this.state.editable
    });
  };

  onDeleteClick(id) {
    this.props.deleteProduct(id);
  };

  onSubmitHandler(e) {
    e.preventDefault();

    const editProduct = {
      id: this.props.product._id,
      title: this.state.title,
      text: this.state.text,
      category: this.state.category,
      price: this.state.price,
      image: this.state.image
    };

    this.props.editProduct(editProduct);
    this.setState({
      imagePreviewUrlBk: this.state.imagePreviewUrl,
      editable: !this.state.editable
    })
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
    const { product } = this.props;
    const { title, text, category, price, editable, imagePreviewUrl } = this.state;

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={{ width: '220px', height: '220px' }} src={imagePreviewUrl} />);
    }

    return (
      <div className='productCard'>
        <p className={classNames('productTitle', { 'edit': editable })}>{title}</p>
        <p className={classNames('productText', { 'edit': editable })}>{text}</p>
        <p className={classNames('productCategory', { 'edit': editable })}>{category}</p>
        <p className={classNames('productPrice', { 'edit': editable })}>£{price}</p>

        {/* -----------Editing Product----------- */}
        <form className={classNames('editForm', { 'edit': editable })} onSubmit={this.onSubmitHandler}>
          <input
            className='editProductTitle'
            type='text'
            name='title'
            onChange={this.handleInputChange}
            value={title} />
          <textarea
            className='editProductText'
            type='text'
            name='text'
            onChange={this.handleInputChange}
            value={text} />
          <input
            className='editProductCategory'
            type='text'
            name='category'
            onChange={this.handleInputChange}
            value={category} />
          <input
            className='editProductPrice'
            type='text'
            name='price'
            onChange={this.handleInputChange}
            value={price} />

          <button className={classNames('saveBut', { 'edit': editable })}>Save</button>
        </form>
        <button type='button' className={classNames('cancelBut', { 'edit': editable })} onClick={this.cancelToggler}>Cancel</button>
        {/* -----------Editing Product----------- */}

        <button type='button' className={classNames('editBut', { 'edit': editable })} onClick={this.editToggler}>Edit</button>
        <button type='button' className={classNames('deleteBut', { 'edit': editable })} onClick={this.onDeleteClick.bind(this, product._id)}>Delete</button>




        {/* Image Upload */}
        <div className='productImagePreviewContainer'>
          {$imagePreview}
        </div>

        <input
          style={{ display: 'none' }}
          type='file'
          onChange={this.fileSelectedHandler}
          ref={fileInput => this.fileInput = fileInput}
        />
        <button className={classNames('productImagePickBut', { 'edit': editable })} type='button' onClick={() => this.fileInput.click()}>Change Image</button>
        {/* Image Upload */}

        <style jsx>
          {`
            p {
              margin: 0px;
              padding: 8px;
            }

            .productCard {
              position: relative;
              margin-top: 15px;
              padding: 10px;
              box-sizing: border-box;
              border: 1px solid #bcbcbc;
              border-radius: 6px;
              background-color: white;
            }

            .productTitle {
              display: block;
              margin-top: 50px;
              font-size: 18px;
              font-weight: bold;
              visibility: visible; 
              opacity: 1;
            } 

            .productTitle.edit {
              display: none;
              visibility: hidden; 
              opacity: 0;
            }

            .productText {
              display: block;
              font-size: 15px;
            }

            .productText.edit {
              display: none;
              visibility: hidden; 
              opacity: 1;
            }

            .productCategory {
              display: block;
              font-size: 15px;
            }

            .productCategory.edit {
              display: none;
              visibility: hidden; 
              opacity: 1;
            }

            .productPrice {
              display: block;
              font-size: 15px;
            }

            .productPrice.edit {
              display: none;
              visibility: hidden; 
              opacity: 1;
            }
            
            .editProductTitle {
              display: block;
              width: 100%;
              margin-top: 60px;
              margin-bottom: 20px;
              padding: 10px;
              box-sizing: border-box;
              border: 1px solid #bcbcbc;
              border-radius: 6px;
              font-family: Oxygen, sans-serif;
              font-size: 14px;
              animation: fade 0.5s;
              visibility: visible;
              opacity: 1;
            }

            .editProductTitle.edit {
              display: none; 
              visibility: hidden;
              opacity: 0;
            }

            .editProductText {
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
              animation: fade 0.5s;
              visibility: visible;
              opacity: 1;
            }

            .editProductText.edit {
              display: none; 
              visibility: hidden;
              opacity: 0;
            }

            .editProductCategory {
              display: block;
              width: 100%;
              margin-top: 60px;
              margin-bottom: 20px;
              padding: 10px;
              box-sizing: border-box;
              border: 1px solid #bcbcbc;
              border-radius: 6px;
              font-family: Oxygen, sans-serif;
              font-size: 14px;
              animation: fade 0.5s;
              visibility: visible;
              opacity: 1;
            }

            .editProductCategory.edit {
              display: none; 
              visibility: hidden;
              opacity: 0;
            }

            .editProductPrice {
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
              animation: fade 0.5s;
              visibility: visible;
              opacity: 1;
            }

            .editProductPrice.edit {
              display: none; 
              visibility: hidden;
              opacity: 0;
            }

            .productDate {
              color: #707070;
              font-size: 12px;
            }

            .editBut {
              position: absolute;
              display: block;
              top: 0px;
              right: 100px;
              width: 80px;
              box-sizing: border-box;             
              margin-top: 10px;
              margin-left: 10px;
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

            .editBut.edit {
              display: none;
            }

            .deleteBut {
              position: absolute;
              display: block;
              top: 0px;
              right: 10px;
              width: 80px;
              box-sizing: border-box;             
              margin-top: 10px;
              margin-left: 10px;
              padding: 11px;
              background-color: #aa3920;
              box-shadow: 3px 3px #b79f9a;
              border: none;
              border-radius: 3px;
              color: white;
              font-size: 13px;
              font-weight: bold;
              cursor: pointer;
              outline: none;
              transition: 0.2s;
            }

            .deleteBut.edit {
              display: none;
            }

            .saveBut {
              position: absolute;
              display: none;
              top: 0px;
              right: 100px;
              width: 80px;
              box-sizing: border-box;             
              margin-top: 10px;
              margin-left: 10px;
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

            .saveBut.edit {
              display: block;
            }

            .cancelBut {
              position: absolute;
              display: none;
              top: 0px;
              right: 10px;
              width: 80px;
              box-sizing: border-box;             
              margin-top: 10px;
              margin-left: 10px;
              padding: 11px;
              background-color: #aa3920;
              box-shadow: 3px 3px #b79f9a;
              border: none;
              border-radius: 3px;
              color: white;
              font-size: 13px;
              font-weight: bold;
              cursor: pointer;
              outline: none;
              transition: 0.2s;
            }

            .cancelBut.edit {
              display: block;
            }

            .editForm {
              display: none;
            }

            .editForm.edit {
              display: block;
            }

            .editBut:hover {
              background-color: #24b721;
            }

            .deleteBut:hover {
              background-color: #cc4426;
            }

            .editBut:active {
              box-shadow: 2px 2px #9ab299;
              transform: translate(1px, 1px);
            }

            .deleteBut:active {
              box-shadow: 2px 2px #b79f9a;
              transform: translate(1px, 1px);
            }

            .saveBut:hover {
              background-color: #24b721;
            }

            .cancelBut:hover {
              background-color: #cc4426;
            }

            .saveBut:active {
              box-shadow: 2px 2px #9ab299;
              transform: translate(1px, 1px);
            }

            .cancelBut:active {
              box-shadow: 2px 2px #b79f9a;
              transform: translate(1px, 1px);
            }

            .productImagePreviewContainer {
              height: 220px;
              width: 220px;
              
              margin: 20px auto;
              box-sizing: border-box;
              border: 1px solid #a0a0a0;
              background-color: #cccccc;
              color: white;
              text-align: center;
              font-size: 12px;
              line-height: 140px;
            }

            .productImagePickBut {
              display: none;
              width: 147px;
              box-sizing: border-box;             
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

            .productImagePickBut.edit {
              display: block;
            }

            .productImagePickBut:hover {
              background-color: #24b721;
            }

            .productImagePickBut:active {
              box-shadow: 2px 2px #9ab299;
              transform: translate(1px, 1px);
            }

            @keyframes fade {
              0% {
                  opacity: 0;
              }
          
              100% {
                  opacity: 1;
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
      </div>
    );
  };
};

Product.propTypes = {
  editProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

export default connect(null, { deleteProduct, editProduct })(Product);