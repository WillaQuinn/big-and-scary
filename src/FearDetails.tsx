import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

function FearDetails() {
  const location = useLocation();
  const fear = location.state as { text: string; createdAt: Date } || { text: 'Unknown Fear', createdAt: new Date() };
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("API Key loaded:", apiKey);
    e.preventDefault();
    const userMessage = e.currentTarget.elements.namedItem('chatInput') as HTMLInputElement;
    const userText = userMessage.value;
    userMessage.value = '';

    // Add user message to chat
    setChatMessages((prev) => [...prev, `You: ${userText}`]);
    

    try {
      // Call OpenAI API for a response
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a supportive guide helping users work through their fears.`,
      },
      {
        role: 'user',
        content: `The user is afraid of: "${fear.text}". They said: "${userText}". Provide advice or encouragement.`,
      },
    ],
    max_tokens: 150,
  }),
});


      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();


      // Add AI response to chat
      setChatMessages((prev) => [...prev, `AI: ${aiResponse}`]);
      
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setChatMessages((prev) => [...prev, 'AI: Sorry, something went wrong.']);
      
    }
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