import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addPost } from '../redux/actions/blogActions';

import Layout from '../components/layout/Layout';
import PostsContainer from '../components/common/postsContainer';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      text: this.state.text
    };

    this.props.addPost(newPost);
    this.setState({
      title: '',
      text: ''
    });
  };

  render() {
    const { message } = this.props.message;

    return (
      <Layout>
        <div className='postContainer'>
          <h2>Create a new post</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              className='postInput'
              type='text'
              name='title'
              value={this.state.title}
              placeholder='Title...'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
            <textarea
              className='taInput'
              type='text'
              name='text'
              value={this.state.text}
              placeholder='Enter your post body here...'
              onChange={this.handleInputChange}
              autoComplete='off'
            />
            <button className='subBut'>Submit</button>
            <span className='postMessage'>{message}</span>
          </form>

          <div className='getPostsContainer'>
            <h2>Your posts</h2>
            <PostsContainer />
          </div>
        </div>

        <style jsx>
          {`
            .postMessage {
              padding: 10px;
              font-family: Oxygen, sans-serif;
              font-weight: 800;
            }

            h2 {
              margin: 0px;
              padding: 0px;
            }

            .postContainer {
              width: 100%;
              padding: 70px;
              box-sizing: border-box;
            }
            
            .postLabel {
              display: block;
            }

            .postInput {
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
              white-space: pre-wrap;
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

            .getPostsContainer {
              width: 100%;
              box-sizing: border-box;
              margin-top: 50px;
            }

            @media only screen and (max-width: 999px) {
              .postContainer {
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

Blog.propTypes = {
  addPost: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  message: state.message
});

export default connect(mapStateToProps, { addPost })(Blog);