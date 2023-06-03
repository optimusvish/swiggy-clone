import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  return (
    <div className='error-page'>
        <h1>Oops!!</h1>
        <h2>Something went wrong!!</h2>
        <h3>Status: {error.status}</h3>
        <h3>{error.data}</h3>
    </div>
  )
}

export default Error;