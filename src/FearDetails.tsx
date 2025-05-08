import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function FearDetails() {
  const location = useLocation();
  const fear = location.state as { text: string; createdAt: Date };
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = e.currentTarget.elements.namedItem('chatInput') as HTMLInputElement;
    const userText = userMessage.value;
    userMessage.value = '';

    // Add user message to chat
    setChatMessages([...chatMessages, `You: ${userText}`]);

    // Call OpenAI API for a response
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `The user is afraid of: "${fear.text}". Provide advice or encouragement.`,
        max_tokens: 100,
      }),
    });
    const data = await response.json();
    const aiResponse = data.choices[0].text.trim();

    // Add AI response to chat
    setChatMessages((prev) => [...prev, `AI: ${aiResponse}`]);
  };

  return (
    <div className="fear-details">
      <h1>{fear.text}</h1>
      <p>Created on: {new Date(fear.createdAt).toLocaleString()}</p>
      <textarea
        className="notes"
        placeholder="Add notes or progress here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="chatbox">
        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <form onSubmit={handleChatSubmit}>
          <input type="text" name="chatInput" placeholder="Ask for advice..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default FearDetails;