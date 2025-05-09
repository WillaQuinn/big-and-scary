import React from 'react';

function CollectedFears({ fears, handleStoneClick }: { fears: { text: string; createdAt: Date }[], handleStoneClick: (fear: { text: string; createdAt: Date }) => void }) {
  return (
    <div className="fear-collection">
      {fears.length === 0 ? (
        <p>No fears collected yet.</p>
      ) : (
        fears.map((fear, index) => (
          <img
            key={index}
            src={`/stones/stone${(index % 2) + 1}.png`}
            alt=""
            className="stone"
            onClick={() => handleStoneClick(fear)}
          />
        ))
      )}
    </div>
  );
}

export default CollectedFears;