import React from 'react';

import Layout from '../components/layout/Layout';

export default () => {
  return (
    <Layout>
      <h2 className='moreHeader'>More features coming soon!</h2>

      <style jsx>
        {`
        .moreHeader {
          margin-top: 160px;
          text-align: center;
        }  
      `}
      </style>
    </Layout>
  );
};