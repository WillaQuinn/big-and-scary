import React, { useState } from 'react';

function CaveEntry({
  handleEnterCave,
  handleSubmit,
  submittedFears,
}: {
  handleEnterCave: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, fear: string, setFear: React.Dispatch<React.SetStateAction<string>>) => void;
  submittedFears: { text: string; createdAt: Date }[];
}) {
  const [fear, setFear] = useState('');

  return (
    <div className="cave-entry">
      <h1 className="cave-title">
        <div>Enter things you’ve been avoiding.</div>
        <div style={{ marginTop: '1.5rem' }}>
          Tasks that have been lurking in the depths of your brain.
        </div>
      </h1>
      <form onSubmit={(e) => handleSubmit(e, fear, setFear)}>
        <input
          className="cave-input"
          type="text"
          value={fear}
          onChange={(e) => setFear(e.target.value)}
          placeholder="Enter your fear..."
        />
      </form>
      {submittedFears.length > 0 && (
        <button className="enter-button" onClick={handleEnterCave}>
          Enter the Cave
        </button>
      )}
    </div>
  );
}

export default CaveEntry;