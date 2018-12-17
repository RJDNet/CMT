import React from 'react';
import Link from 'next/link';

export default () => {
  return (
    <div className='sideWrapper'>
      <div className='sidebarContainer'>
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
              <a className='tabLink'>
                <div className='linkIcon'><i className='fas fa-toolbox '></i></div>Dashboard
            </a>
            </Link>
          </li>
          <li className='tab' >
            <Link href='/blog'>
              <a className='tabLink'>
                <div className='linkIcon'><i className='fas fa-comment '></i></div>Blog
            </a>
            </Link>
          </li>
          <li className='tab'>
            <Link href='/shop'>
              <a className='tabLink'>
                <div className='linkIcon'><i className='fas fa-shopping-bag '></i></div>Shop
            </a>
            </Link>
          </li>
          <li className='tab'>
            <Link href='/more'>
              <a className='tabLink'><div className='linkIcon'><i className='fas fa-chart-bar'></i></div>More coming soon...</a>
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
          position: fixed;
          height: 100%;
          width: 250px;
          z-index: 10;
        }

        .sidebarContainer {
          height: 100%;
          width: 250px;
          position: fixed;
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
          font-size: 15px;
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

        @media only screen and (max-width: 999px) {
          .sideWrapper {
            display: none;
          }
        }
      `}
      </style>
    </div>
  );
};