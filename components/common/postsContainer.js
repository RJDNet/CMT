import React, { Component } from 'react';
import Aux from '../hoc/Auxx';

import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/blogActions';

import Post from './post';

class PostsContainer extends Component {
  componentDidMount() {
    this.props.getPosts();
  };

  render() {
    const { posts } = this.props.post;
    const { loading, success, error } = this.props.fetching;

    if (error) {
      return <p>Error!</p>;
    };

    if (loading) {
      return <p style={{ color: '#bababa' }}>Loading...</p>;
    };

    if (success && posts.length > 0) {
      return (
        <Aux>
          {posts.map(post =>
            <Post key={post._id} post={post} />
          )}
        </Aux>
      );
    };

    if (success && posts.length === 0) {
      return <p>No Posts</p>;
    }

    return null;

  };
};

const mapStateToProps = state => ({
  post: state.post,
  fetching: state.fetching
});

export default connect(mapStateToProps, { getPosts })(PostsContainer);