import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const history = useHistory();

  useEffect(() => {
    history.push('/login');
  });
  return ('');
}

export default HomePage;
