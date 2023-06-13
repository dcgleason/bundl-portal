import { useState, useEffect } from 'react';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    // Fetch messages from your API
    fetch('https://yay-api.herokuapp.com/messages')
      .then(response => response.json())
      .then(data => {
        setMessages(data);
        setCurrentMessage(data[0]?.text || '');
      });
  }, []);

  const handlePrev = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
      setCurrentMessage(messages[currentMessageIndex - 1].text);
    }
  };

  const handleNext = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
      setCurrentMessage(messages[currentMessageIndex + 1].text);
    }
  };

  const handleSave = () => {
    // Save the edited message
    const newMessages = [...messages];
    newMessages[currentMessageIndex].text = currentMessage;
    setMessages(newMessages);

    // Send a request to your API to update the message
    fetch(`https://your-api-url/messages/${currentMessageIndex}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: currentMessage }),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col w-1/2 space-y-8">
        <textarea
          className="resize-none border rounded-md"
          value={currentMessage}
          onChange={e => setCurrentMessage(e.target.value)}
          maxLength={3500}
          rows={10}
        />

        {messages[currentMessageIndex]?.image && (
          <img src={messages[currentMessageIndex].image} alt="Message" />
        )}

        <div className="flex justify-between">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handlePrev}>
            Previous
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSave}>
            Save
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
