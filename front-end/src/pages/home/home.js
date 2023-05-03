import React from 'react';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const history = useHistory();

  return (
    <>
      <h1>Home Page</h1>
      <button
        type="button"
        onClick={
          () => history.push('/login')
        }
      >
        Go to Login Page

      </button>
    </>
  );
}

export default HomePage;
