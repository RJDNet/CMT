import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Router from 'next/router';
import axios from 'axios';

import { connect } from 'react-redux';
import { getKey, genKey } from '../redux/actions/dashActions';
import { getPosts } from '../redux/actions/blogActions';
import { getProducts } from '../redux/actions/shopActions';

import Layout from '../components/layout/Layout';
import Apikey from '../components/common/apikey';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false
    };
    this.accDelete = this.accDelete.bind(this);
    this.generateKey = this.generateKey.bind(this);
  };

  componentDidMount() {
    this.props.getKey();
  };

  checkTogglerOn = () => {
    this.setState({
      check: true
    });
  };

  checkTogglerOff = () => {
    this.setState({
      check: false
    });
  };

  generateKey() {
    this.props.genKey();
  };

  accDelete() {
    axios.delete('/auth/delete')
      .then(() => {
        Router.push('/auth/logout');
      });
  };

  render() {
    const { check } = this.state;
    const { pkey } = this.props.pkey;

    let theKey;

    if (pkey === null || undefined) {
      theKey = <span style={{ color: '#bcbcbc' }}>Loading Key...</span>;
      setTimeout(() => {
        theKey = <span>No Key Found</span>;
      }, 2000);
    } else {
      theKey = <Apikey apikey={pkey.key} />
    }

    return (
      <Layout>
        <div className='dashContainer'>
          <h1 className='dashTitle'>Dashboard</h1>

          <h3>Account Management</h3>

          <p>Here you can change different details for your account such as editing, deleting and obtaining your public API key.</p>

          <div className='apiContainer'>
            <div className='apiKeyContainer'>
              <p className='apiTitle'>Api Key: </p>
              <div className='keyContainer'>{theKey}</div>
            </div>
            <button className='genBut' onClick={this.generateKey}>Generate new key</button>
            <p>You can use this api key on your own website or app to get data of your blog posts or shop products from the public graphql endpoint.</p>
          </div>

          <div className='accountContainer'>
            <span className='accountSettingsTitle'>If you would like to delete your account,</span>
            <button className='dashDelBut' onClick={this.checkTogglerOn}>CLICK HERE</button>
            <span className='accountSettingsTitle'>.</span>
          </div>

          <div className={classNames('delCheckContainer', { check })}>
            <div className='delCheckBox'>
              <p className='titleCheck'>Are you sure?</p>
              <div className='butContainer'>
                {/* <Link href='/auth/logout'> */}
                <button className='yesBut' onClick={this.accDelete}>Yes</button>
                {/* </Link> */}
                <button className='noBut' onClick={this.checkTogglerOff}>No</button>
              </div>
            </div>
          </div>

        </div>
        <style jsx>
          {`
            h3 {
              margin: 0px;
              padding: 0px;
            }

            p {
              margin-top: 30px;
              padding: 0px;
              font-size: 14px;
            }

            span {
              font-size: 14px;
            }

            .dashContainer {
              padding: 70px;
            }

            .accountContainer {
              margin-top: 40px;
            }

            .accountSettingsTitle {
              margin: 0px;
              padding: 0px;
            }

            .apiContainer {
              margin-top: 40px;
              margin-bottom: 10px;
              padding-top: 30px;
              padding-left: 30px;
              padding-right: 30px;
              padding-bottom: 10px;
              border: 1px solid #bcbcbc;
              border-radius: 6px;
            }

            .apiKeyContainer {
              height: 40px;
              width: 100%;
            }

            .apiTitle {
              display: inline-block;
              width: 60px;
              height: 30px;
              float: left;
              margin: 0px;
              padding: 0px;
              padding-top: 10px;
            }

            .keyContainer {
              float: left;
              display: inline-block;
              height: 40px;
              width: 350px;
              padding-top: 10px;
              padding-left: 10px;
              border: 1px solid #bcbcbc;
              border-radius: 6px;
              box-sizing: border-box;
              font-family: Oxygen, sans-serif;
              font-size: 14px;
            }

            .delCheckContainer {
              position: fixed;
              display: none;
              height: 100%;
              width: 100%;
              top: 0px;
              left: 0px;
              margin: 0px auto;
              padding: 0px;
              background-color: rgba(0,0,0,0.5);
              z-index: 150;
            }

            .delCheckContainer.check {
              display: block;
            }

            .dashTitle {
              width: 100%;
              text-align: center;
            }

            .dashDelBut {
              margin: 0px;
              margin-left: 3px;
              padding: 0px;
              color: red;
              border: none;
              background-color: transparent;
              cursor: pointer;
            }

            .dashDelBut:hover {
              color: darkred;
            }

            .delCheckBox {
              height: 130px;
              width: 300px;
              margin: 0px auto;
              margin-top: 300px;
              padding: 20px;
              background-color: white;
            }

            .titleCheck {
              position: relative;
              width: 100%;
              text-align: center;
              font-size: 17px;
            }

            .yesBut {
              width: 100px;
              box-sizing: border-box;             
              margin-top: 20px;
              margin-left: 40px;
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

            .yesBut:hover {
              background-color: #24b721;
            }

            .yesBut:active {
              box-shadow: 2px 2px #9ab299;
              transform: translate(1px, 1px);
            }

            .noBut {
              width: 100px;
              box-sizing: border-box;             
              margin-top: 20px;
              margin-left: 20px;
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

            .noBut:hover {
              background-color: #cc4426;
            }

            .noBut:active {
              box-shadow: 2px 2px #b79f9a;
              transform: translate(1px, 1px);
            }

            .genBut {
              width: 100px;
              box-sizing: border-box;             
              margin-top: 20px;
              margin-left: 0px;
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

            @media only screen and (max-width: 999px) {
              .genBut {
                display: none;
              }

              .apiContainer {
                display: none;
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

Dashboard.propTypes = {
  pkey: PropTypes.object.isRequired,
  getKey: PropTypes.func.isRequired,
  genKey: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  pkey: state.pkey
});

export default connect(mapStateToProps, { genKey, getKey })(Dashboard);