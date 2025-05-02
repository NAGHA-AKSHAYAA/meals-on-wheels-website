import React, { useState } from 'react';
import Header from './components/header';
import Home from './components/home';
import Vision from './components/vision';
import Contact from './components/contact';
import Service from './components/service';

function App() {
  const [homeKey, setHomeKey] = useState(0);

  const handleHomeClick = () => {
    setHomeKey(prev => prev + 1); // Force re-mount
  };

  return (
    <>
      <Header onHomeClick={handleHomeClick} />
      <div className="page-content">
        <Home key={homeKey} />
        <Vision />
        <Contact />
        <Service/>
      </div>
    </>
  );
}

export default App;
