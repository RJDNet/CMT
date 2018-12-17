import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import axios from 'axios';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      error: null,
      errorTrans: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async handleSubmit(e) {
    e.preventDefault();

    const signupData = {
      email: this.state.email,
      pass: this.state.pass
    };

    const signinData = {
      email: this.state.email,
      pass: this.state.pass
    };

    axios
      .post('/auth/emailsignup', signupData).then(() => {
        axios
          .post('/auth/emailsignin', signinData).then(() => {
            Router.push('/dashboard');
          })
      }).catch(err => {
        const { message } = err.response.data;

        this.setState({
          error: message,
          errorTrans: true
        });
      });
  };

  googleSignin() {
    Router.push('/auth/google');
  };

  render() {
    const { error, errorTrans } = this.state;

    return (
      <div className='signupBack'>
        <Link href='/'><button className='backButton'>-BACK TO HOMEPAGE</button></Link>
        <div className='signupBodyContainer'>

          <div className='infoContainer'>
            <p className='infoHeader'>Sign up information</p>
            <p className='infoText'>You can sign up with either an email and password combination or connect your google account to this app and sign in with your google account.</p>

            <p className='infoText'>Within the dashboard, you can delete your account at any time you wish.</p>
          </div>

          <div className='signupContainer'>
            <p className='signupHeader'>Sign Up</p>

            <form onSubmit={this.handleSubmit}>

              <div className='inputContainer'>
                <p className='signupLabel'>Email</p>
                <input
                  className='signupInputs'
                  type='email'
                  name='email'
                  value={this.state.email}
                  autoComplete='off'
                  data-parse='lowercase'
                  placeholder='yourname@email.com'
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <div className='inputContainer'>
                <p className='signupLabel'>Password</p>
                <input
                  className='signupInputs'
                  type='password'
                  name='pass'
                  value={this.state.pass}
                  autoComplete="off"
                  placeholder='.....'
                  onChange={this.handleInputChange}
                  required
                />

                <p className={classNames('authError', { 'error': errorTrans })}>{error}</p>

              </div>

              <button className='emailSignupButton' type='submit'>Sign Up</button>
            </form>

            <p className='orLabel'>- or -</p>

            <button className='googleBut' onClick={this.googleSignin}>
              <img className='signupButton' src='/static/gbut.png' alt="google" />
            </button>
          </div>

        </div>

        <style jsx>
          {`
            .signupBack {
              position: absolute;
              width: 100%;
              height: 100%;
              background-color: #fafafa;
            }

            .backButton {
              position: relative;
              display: inline-block;
              height: 35px;
              width: 190px;
              margin: 5px;
              margin-top: 15px;
              color: black;
              font-size: 13px;
              font-weight: bold;
              border: none;
              cursor: pointer;
              outline: none;
            }

            .signupBodyContainer {
              height: 100%;
              width: 100%;
              max-height: 480px;
              max-width: 720px;
              margin: 150px auto;
            }

            .infoContainer {
              float: left;
              position: relative;
              display: inline-block;
              height: 100%;
              width: 100%;
              max-height: 480px;
              max-width: 360px;
              box-sizing: border-box;
              padding-top: 40px;
              padding-bottom: 40px;
            }

            .signupContainer {
              float:left;
              position: relative;
              display: inline-block;
              height: 100%;
              width: 100%;
              max-height: 480px;
              max-width: 360px;
              box-sizing: border-box;
              padding-top: 40px;
              padding-bottom: 40px;
              background-color: white;
              border: 1px solid #ccc;
              border-radius: 5px;
            }

            .signupHeader {
              width: 270px;
              margin: 0px auto;
              padding-bottom: 20px;
              font-Size: 22px;
              font-weight: bold;
              text-align: left;
            }

            .infoHeader {
              width: 270px;
              margin: 0px auto;
              padding-bottom: 20px;
              font-Size: 22px;
              font-weight: bold;
              text-align: left;
            }

            .infoText {
              padding: 15px;
              color: #494949;
              font-size: 15px;
            }

            .inputContainer {
              margin-top: 15px;
            }

            .emailSignupButton {
              position: relative;
              display: block;
              height: 45px;
              width: 270px;
              margin: 0px auto;
              margin-top: 20px;
              border: 1px solid red;
              background-color: red;
              color: white;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              outline: none;
            }

            .signupButton {
              position: relative;
              display: block;
              height: 45px;
              width: 270px;
              margin: 3px auto;
              cursor: pointer;
              outline: 0;
            }

            .googleBut {
              position: relative;
              display: block;
              margin: 0px auto;
              padding: 0px;
              box-sizing: border-box;
              background-color: Transparent;
              border: none;
              cursor: pointer;
            }

            .signupLabel {
              position: relative;
              display: block;
              height: 20px;
              width: 270px;
              margin: 3px auto;
              font-size: 13px;
              font-weight: 400;
            }

            .orLabel {
              margin: 0px;
              padding: 10px;
              font-Size: 14px;
              font-weight: 400;
              text-align: center;
            }

            .signupInputs {
              position: relative;
              display: block;
              height: 35px;
              width: 250px;
              margin: 3px auto;
              padding-left: 15px;
              color: #555;
              border: 1px solid #ccc;
              border-radius: 3px;
            }

            .emailSigninButton:hover {
              background-color: darkred;
            }

            .authError {
              height: 35px;
              width: 250px;
              margin: 3px auto;
              padding-top: 5px;
              color: red;
              text-align: center;
              visibility: hidden;
              opacity: 0;
              transition: 0.15s;
            }

            .authError.error {
              visibility: visible;
              opacity: 1;
            }

            .backButton:hover {
              color: red;
            }

            @media only screen and (max-width: 999px) {
              .signupBodyContainer {
                margin: 0px auto;
              }

              .infoContainer {
                height: 350px;
                display: block;
                float: none;
                margin: 0px auto;
              }

              .signupContainer {
                display: block;
                float: none;
                margin: 0px auto;
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
            }
          `}
        </style>
      </div>
    );
  };
};

export default Signup;