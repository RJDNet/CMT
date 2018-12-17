import React from 'react';
import Link from 'next/link';

export default () => (
  <div className='landingBack'>
    <div className='landingContainer'>
      <p className='landingLogo'>C.M.T</p>

      <div className='buttonContainer'>
        <Link href='/signin'><button className='signinlandingButton'>SIGN IN</button></Link>
        <Link href='/signup'><button className='signuplandingButton'>SIGN UP</button></Link>
      </div>
    </div>

    <div className='landingHeader'>Content Management Toolbox</div>

    <div className='landingInfoContainer'>
      <p className='landingInfo'>
        This app is built with NextJS which uses ReactJS for the front end, includes Server side rendering (SSR, good for SEO and fast initial page load), and provides code splitting among many other useful features.
      </p>

      <p className='landingInfo'>
        For the backend, it uses NodeJS and the ExpressJS framework for the creation of a REST api. It also uses PassportJS for Authentication/Authorization, providing the email/password option for signin/signup and also OAuth 2.0 providing the ability to signin with third parties such as with a google account.
      </p>

      <p className='landingInfo'>
        The app also allows image fetching/uploading/editing/deleting via utilizing the cloudinary api and provides a public GraphQL endpoint for efficient fetching of data from outside sources (such as a website) by providing a public API key.
      </p>

      <p className='landingInfo'>
        You can create another account, or log in with the default admin account if you wish.
      </p>

      <p className='landingInfo'>
        username: admin@admin.com
        <br />
        password: admin
      </p>

      <p className='landingInfo'>Note: The admin account can't be interacted with as it is used in conjunction with the Artra Website. If you would like to test the functionality yourself, please create a mock account.</p>

    </div>

    <style jsx>
      {`
        p {
          margin: 0px;
          padding: 0px;
        }

        .landingBack {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #fafafa;
        }

        .landingContainer {
          height: 60px;
          width: 100%;
          font-family: Oxygen;
          background-color: #fafafa;
        }

        .landingLogo {
          display: inline-block;
          height: 60px;
          width: 60px; 
          margin-top: 0px;
          margin-bottom: 0px;
          margin-left: 50px;
          margin-right: 0px;
          color: black;
          font-Size: 26px;
          text-align: left;
          font-weight: bold;
          line-height: 65px;
        }

        .buttonContainer {
          display: inline-block;
          height: 60px;
          float: right;
          margin-right: 20px;
        }

        .signinlandingButton {
          position: relative;
          display: inline-block;
          height: 35px;
          width: 90px;
          margin: 5px;
          margin-top: 15px;
          color: black;
          font-size: 11px;
          font-weight: bold;
          background-color: rgba(0,0,0,0);
          border: 1px solid black;
          border-radius: 4px;
          cursor: pointer;
          outline: none;
        }

        .signuplandingButton {
          position: relative;
          display: inline-block;
          height: 35px;
          width: 90px;
          margin: 5px;
          margin-top: 15px;
          color: white;
          font-size: 11px;
          font-weight: bold;
          background-color: red;
          border: 1px solid red;
          border-radius: 4px;
          cursor: pointer;
          outline: none;
        }

        .landingHeader {
          width: 100%;
          margin-top: 100px;
          font-size: 40px;
          font-weight: bold;
          text-align: center;
        }

        .landingInfoContainer {
          width: 100%; 
          max-width: 600px;
          margin: 30px auto;
          padding: 20px;
          box-sizing: border-box;
          color: #494949;
          font-size: 15px;
          text-align: left;
        }

        .landingInfo {
          padding: 20px;
          box-sizing: border-box;
          color: #494949;
          font-size: 15px;
          text-align: left;
        }

        .signinlandingButton:hover {
          color: white;
          background-color: black;
        }

        .signuplandingButton:hover {
          background-color: darkred;
          border: 1px solid darkred;
        }

        @media screen and (max-width: 400px) {
          .landingLogo {
            margin-left: 10px;
          }

          .buttonContainer {
            margin-right: 10px; 
          }
        }
      `}
    </style>
  </div>
);
