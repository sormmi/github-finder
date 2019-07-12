import React, { Fragment } from 'react';
import spinner from './spinner.gif';
import './spinner.css';

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} alt='Loading...' className='spinner' />
    </Fragment>
  );
};

export default Spinner;
