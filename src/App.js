import React, { useState } from 'react';
import Header from './components/header';
import Home from './components/home';

function App() {
  const [homeKey, setHomeKey] = useState(0);

  const handleHomeClick = () => {
    setHomeKey(prev => prev + 1); // Force re-mount
  };

  return (
    <>
      <Header onHomeClick={handleHomeClick} />
      <Home key={homeKey} />
    </>
  );
}

export default App;
