import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CaveEntry from './CaveEntry';
import CollectedFears from './CollectedFears';
import FearDetails from './FearDetails';


function App() {
  const [loading, setLoading] = useState(false);
  const [fears, setFears] = useState<{ text: string; createdAt: Date }[]>([]);
  const [echoedWord, setEchoedWord] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEnterCave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/collected-fears');
    }, 4000);
  };

  const handleStoneClick = (fear: { text: string; createdAt: Date }) => {
    navigate('/fear-details', { state: fear });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, fear: string, setFear: React.Dispatch<React.SetStateAction<string>>) => {
    e.preventDefault();
    if (fear.trim()) {
      setFears([...fears, { text: fear, createdAt: new Date() }]); // Add the fear to the state
      setEchoedWord(fear); // Set the echoed word
      setFear(''); // Clear the input field
      setTimeout(() => setEchoedWord(null), 3000); // Clear the echoed word after 3 seconds
    }
  };

  return (
    <div className="cave-background">
      {loading ? (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <Routes>
          <Route
  path="/"
  element={
    <CaveEntry
      handleEnterCave={handleEnterCave}
      handleSubmit={handleSubmit}
      submittedFears={fears}
    />
  }
/>
          <Route
            path="/collected-fears"
            element={<CollectedFears fears={fears} handleStoneClick={handleStoneClick} />}
          />
          <Route
            path="/fear-details"
            element={
              <>
                <FearDetails />
                <button className="back-button" onClick={() => navigate('/collected-fears')}>
                  Back
                </button>
              </>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
