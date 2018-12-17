import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { deletePost, editPost } from '../../redux/actions/blogActions';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      bkTitle: '',
      bkText: '',
      editable: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  };

  componentDidMount() {
    this.setState({
      title: this.props.post.title,
      text: this.props.post.text,
      bkTitle: this.props.post.title,
      bkText: this.props.post.text
    });
  };

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler(e) {
    e.preventDefault();

    const editPost = {
      id: this.props.post._id,
      title: this.state.title,
      text: this.state.text
    };

    this.props.editPost(editPost);
    this.setState({
      editable: !this.state.editable
    })
  };

  onDeleteClick(id) {
    this.props.deletePost(id);
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
      editable: !this.state.editable
    });
  };

  render() {
    const { post } = this.props;
    const { title, text } = this.state;
    const { editable } = this.state;

    return (
      <div className='postCard'>
        <p className={classNames('postTitle', { 'edit': editable })}>{title}</p>
        <p className={classNames('postText', { 'edit': editable })}>{text}</p>

        {/* -----------Editing Post----------- */}
        <form className={classNames('editForm', { 'edit': editable })} onSubmit={this.onSubmitHandler}>
          <input
            className='editPostTitle'
            type='text'
            name='title'
            onChange={this.handleInputChange}
            value={this.state.title} />
          <textarea
            className='editPostText'
            type='text'
            name='text'
            onChange={this.handleInputChange}
            value={this.state.text} />

          <button className={classNames('saveBut', { 'edit': editable })}>Save</button>
        </form>
        <button className={classNames('cancelBut', { 'edit': editable })} onClick={this.cancelToggler}>Cancel</button>
        {/* -----------Editing Post----------- */}

        <p className='postDate'><Moment format='DD-MM-YYYY HH:mm'>{post.createdAt}</Moment></p>
        <button className={classNames('editBut', { 'edit': editable })} onClick={this.editToggler}>Edit</button>
        <button className={classNames('deleteBut', { 'edit': editable })} onClick={this.onDeleteClick.bind(this, post._id)}>Delete</button>

        <style jsx>
          {`
            p {
              margin: 0px;
              padding: 8px;
            }

            .postCard {
              position: relative;
              margin-top: 15px;
              padding: 10px;
              box-sizing: border-box;
              border: 1px solid #bcbcbc;
              border-radius: 6px;
              background-color: white;
            }

            .postTitle {
              display: block;
              margin-top: 50px;
              font-size: 18px;
              font-weight: bold;
              visibility: visible; 
              opacity: 1;
            } 

            .postTitle.edit {
              display: none;
              visibility: hidden; 
              opacity: 0;
            }

            .postText {
              display: block;
              font-size: 15px;
              white-space: pre-wrap;
            }

            .postText.edit {
              display: none;
              visibility: hidden; 
              opacity: 1;
            }
            
            .editPostTitle {
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

            .editPostTitle.edit {
              display: none; 
              visibility: hidden;
              opacity: 0;
            }

            .editPostText {
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
              white-space: pre-wrap;
              animation: fade 0.5s;
              visibility: visible;
              opacity: 1;
            }

            .editPostText.edit {
              display: none; 
              visibility: hidden;
              opacity: 0;
            }

            .postDate {
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

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

export default connect(null, { deletePost, editPost })(Post);