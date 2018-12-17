import React, { Component } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

class MobileSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false
    };
  };

  sidebarToggler = () => {
    this.setState({
      toggler: !this.state.toggler
    });
  };

  render() {
    const { toggler } = this.state;

    return (
      <div className={classNames('sideWrapper', { 'toggler': toggler })}>

        <div className={classNames('sidebarContainer', { 'toggler': toggler })}>

          <div className='sideButton' onClick={this.sidebarToggler}>
            <div className='buttonBar'></div>
            <div className='buttonBar'></div>
            <div className='buttonBar'></div>
          </div>

          <div className='sidebarHeader'>
            <span>C.M.T</span>
          </div>

          <div className='welcomeHeader'>
            <p style={{ color: '#e0e0e0' }}>WELCOME</p>
            <i className='fas fa-globe fa-3x' style={{ color: '#e0e0e0' }}></i>
          </div>

          <ul className='tabContainer'>
            <li className='tab'>
              <Link href='/dashboard'>
                <a className='tabLink' onClick={this.sidebarToggler}>
                  <div className='linkIcon'><i className='fas fa-toolbox '></i></div>Dashboard
              </a>
              </Link>
            </li>
            <li className='tab' >
              <Link href='/blog'>
                <a className='tabLink' onClick={this.sidebarToggler}>
                  <div className='linkIcon'><i className='fas fa-comment '></i></div>Blog
              </a>
              </Link>
            </li>
            <li className='tab'>
              <Link href='/shop'>
                <a className='tabLink' onClick={this.sidebarToggler}>
                  <div className='linkIcon'><i className='fas fa-shopping-bag '></i></div>Shop
              </a>
              </Link>
            </li>
            <li className='tab'>
              <Link href='/more'>
                <a className='tabLink' onClick={this.sidebarToggler}><div className='linkIcon'><i className='fas fa-chart-bar'></i></div>More coming soon...</a>
              </Link>
            </li>
          </ul>

        </div>
        <style jsx>
          {`
          span {
            color: white;
          }

          .sideWrapper {
            display: none;
            position: relative;
            height: 80px;
            width: 100%;
            top: 0px;
            left: 0px;
            z-index: 10;
            transition: 0.4s;
          }

          .sideButton {
            position: absolute;
            height: 20px;
            width: 22px;
            top: 15px;
            right: 20px;
            border: 1px solid white;
            border-radius: 5px;
            padding-top: 3px;
            padding-left: 8px;
            padding-right: 8px;
            padding-bottom: 14px;
            background-color: white;
            cursor: pointer;
            z-index: 10;
          }

          .buttonBar {
            width: 100%;
            margin-top: 5px;
            border: 2px solid black;
            border-radius: 5px;
            box-sizing: border-box;
          }

          .sidebarContainer {
            visibility: hidden;
            position: relative;
            height: 80px;
            width: 100%;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: #222D32;
            overflow: hidden;
            transition: 0.4s;
          }

          .sidebarHeader {
            height: 50px;
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
            background-color: #367FA9;
            text-align: center;
            font-size: 30px;
            font-weight: bold;
          }

          .welcomeHeader {
            height: 120px;
            width: 100%;
            margin-top: 40px;
            color: white;
            font-size: 22px;
            text-align: center;  
          }

          .tabContainer {
            width: 100%;
            margin: 0px;
            margin-top: 30px;
            padding: 0px;
          }

          .tab {
            list-style-type: none;
          }

          .linkIcon {
            display: inline;
            padding-left: 5px;
            padding-right: 15px;
          }

          .tabLink {
            padding: 14px;
            color: #bad0d3;
            font-size: 14px;
            text-decoration: none;
            transition: 0.15s;
          }

          .tabLink:hover {
            color: white;
            text-decoration: none;
          }

          @media only screen and (min-width: 1000px) {
            .sideButton {
              display: none;
            }
          }

          @media only screen and (max-width: 999px) {
            .sideWrapper {
              display: block;
              box-shadow: 0px -8px 20px 1px black;
            }
            
            .sideWrapper.toggler {
              height: 550px;
            }

            .sidebarContainer {
              display: block;
              visibility: visible;
            }
            
            .sidebarContainer.toggler {
              visibility: visible;
              height: 550px;
            }

            .sidebarHeader {
              height: 80px;
            }

            .sideButton {
              display: block;
            }
          }
        `}
        </style>
      </div>
    );
  };
};

export default MobileSidebar;