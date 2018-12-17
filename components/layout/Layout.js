import React from 'react';

import Aux from '../hoc/Auxx';
import Header from './header/Header';
import Sidebar from './sidebar/sidebar';
import MobileSidebar from './mobilesidebar/MobileSidebar';

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <Aux>
        <MobileSidebar />
        <Sidebar />
        <Header />

        <div className='layout'>
          {children}
        </div>

        <style jsx global>
          {`
            html {
              font-family: Arial, Helvetica, sans-serif;
            }

            body {
              background-color: #ededed;
            }

            a {
              height: 100%;
              width: 100%;
              display: block;
              color: white;
              outline: none;
            }

            a:hover {
              text-decoration: none;
            }

            .layout {
              height: 100%;
              width: 100%;
              box-sizing: border-box;
              padding-top: 30px;
              padding-left: 250px;
            }

            @media only screen and (max-width: 999px) {
              .layout {
                padding-left: 0px;
              }
          `}
        </style>
      </Aux>
    );
  };
};

export default Layout;