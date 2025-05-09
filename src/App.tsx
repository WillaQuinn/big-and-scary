import { useState, useEffect } from 'react';
import './App.css';
import quotes from './assets/CaveQuotes.json'; // Import the JSON file
import { Routes, Route, useNavigate } from 'react-router-dom';
import FearDetails from './FearDetails'; // Import the FearDetails component

function App() {
  const [fear, setFear] = useState('');
  const [submittedFears, setSubmittedFears] = useState<{ text: string; createdAt: Date }[]>([]);
  const [hoveredFear, setHoveredFear] = useState<string | null>(null);
  const [showCave, setShowCave] = useState(true);
  const [loading, setLoading] = useState(false);
  const [randomQuote, setRandomQuote] = useState<{ quote: string; author: string } | null>(null);
  const [stonePositions, setStonePositions] = useState<{ top: string; left: string }[]>([]);
  const [echoedWord, setEchoedWord] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // Pick a random quote for the loading screen
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);

      // Simulate a loading delay
      const timer = setTimeout(() => {
        setLoading(false);
        setShowCave(false); // Transition to the "Collected Fears" page
      }, 4000); // 4 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [loading]);

  useEffect(() => {
    // Generate random positions for the stones when the page loads
    const positions = submittedFears.map(() => ({
      top: `${Math.random() * 80 + 10}%`, // Random vertical position
      left: `${Math.random() * 80 + 10}%`, // Random horizontal position
    }));
    setStonePositions(positions);
  }, [submittedFears]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fear.trim()) {
      setSubmittedFears([...submittedFears, { text: fear, createdAt: new Date() }]); // Add fear with timestamp
      setEchoedWord(fear); // Set the echoed word
      setFear('');

      // Clear the echoed word after 3 seconds
      setTimeout(() => setEchoedWord(null), 3000);
    }
  };

  const handleEnterCave = () => {
    setLoading(true); // Show the loading screen
  };

  const handleStoneClick = (fear: { text: string; createdAt: Date }) => {
    navigate(`/fear-details`, { state: fear }); // Navigate to the fear details page
  };

  return (
    <div className="cave-background">
      {loading ? (
        <div className="loading-screen">
          <div className="twinkling-background"></div>
          <p className="quote">"{randomQuote?.quote}"</p>
          <p className="author">- {randomQuote?.author}</p>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              showCave ? (
                <>
                  <h1 className="cave-title">
                    <div>Enter things you’ve been avoiding.</div>
                    <div style={{ marginTop: '1.5rem' }}>
                      Tasks that have been lurking in the depths of your brain.
                    </div>
                  </h1>
                  <form onSubmit={handleSubmit}>
                    <input
                      className="cave-input"
                      type="text"
                      value={fear}
                      onChange={(e) => setFear(e.target.value)}
                    />
                  </form>
                  {echoedWord && (
                    <div className="fear-echo">
                      {echoedWord}
                    </div>
                  )}
                  {submittedFears.length > 0 && (
                    <button className="enter-button" onClick={handleEnterCave}>
                      Enter the Cave
                    </button>
                  )}
                </>
              ) : (
                <div className="fear-collection">
                  <div className="hovered-fear">{hoveredFear}</div>
                  {submittedFears.map((fear, index) => (
                    <img
                      key={index}
                      src={`/stones/stone${(index % 2) + 1}.png`}
                      alt=""
                      className="stone"
                      style={{
                        top: stonePositions[index]?.top,
                        left: stonePositions[index]?.left,
                        position: 'absolute',
                      }}
                      onMouseEnter={() => setHoveredFear(fear.text)}
                      onMouseLeave={() => setHoveredFear(null)}
                      onClick={() => handleStoneClick(fear)}
                    />
                  ))}
                  <button className="back-button" onClick={() => navigate('/')}>
                    Back
                  </button>
                </div>
              )
            }
          />
          <Route
            path="/fear-details"
            element={
              <>
                <FearDetails />
                <button className="back-button" onClick={() => navigate('/')}>
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
