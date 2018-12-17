import React from 'react';

import Aux from '../hoc/Auxx';

export default (props) => {
  return (
    <Aux>
      <span>{props.apikey}</span>
    </Aux>
  );
};
