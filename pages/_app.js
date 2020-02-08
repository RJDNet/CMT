import React from 'react';
import App from 'next/app';

import { Provider } from 'react-redux';
import makeStore from '../redux/store';
import withRedux from "next-redux-wrapper";

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  };
};

export default withRedux(makeStore)(MyApp);