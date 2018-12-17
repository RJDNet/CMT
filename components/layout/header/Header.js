import React, { Component } from 'react';
// import Router from 'next/router';

class Header extends Component {
  // signOut() {
  //   Router.push('/logout');
  // };

  render() {
    return (
      <div className='headerContainer'>
        <div className='logger'>
          {/* <button className='signoutBut' onClick={this.signOut}>SIGN OUT<div className='signoutIcon'><i className="fas fa-sign-in-alt "></i></div></button> */}
          <a href='/logout' className='signoutBut'>SIGN OUT<div className='signoutIcon'><i className="fas fa-sign-in-alt "></i></div></a>
        </div>

        <style jsx>
          {`
          span {
            color: white;
          }

          .headerContainer {
            position: fixed;
            height: 50px;
            width: 100%;
            box-sizing: border-box;
            background-color: #3C8DBC;
            z-index: 5;
          }

          .logger {
            float: right;
          }

          .signoutBut {
            height: 50px;
            padding: 15px;
            box-sizing: border-box;
            color: white;
            font-size: 14px;
            font-weight: bold;
            text-decoration: none;
            background-color: Transparent;
            border: none;
            cursor: pointer;
          }

          .signoutBut:hover {
            color: #EAEAEA;
          }

          .signoutIcon {
            display: inline;
            padding-left: 10px;
            padding-right: 5px;
          }

          @media only screen and (max-width: 999px) {
            .headerContainer {
              position: fixed;
              bottom: 0px;
              box-shadow: 0px 8px 20px 1px black;
            }

            .logger {
              width: 100%;
              float: none;
              text-align: center;
            }

            .signoutBut {
              font-size: 17px;
              font-weight: bold;
              text-decoration: none;
            }

            .signoutIcon {
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
      </div>
    );
  };
};

export default Header;
