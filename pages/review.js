import { useState, useEffect } from 'react';


var json = [
  {
    "id": 1,
    "text": "This is the first message. It's a pretty short message, but it gets the point across.",
    "image": "https://example.com/images/1.jpg"
  },
  {
    "id": 2,
    "text": "This is the second message. It's a bit longer than the first message. It has a bit more detail and provides a bit more information.",
    "image": "https://example.com/images/2.jpg"
  },
  {
    "id": 3,
    "text": "This is the third message. It's the longest message so far. It has a lot of detail and provides a lot of information. It's a very informative message.",
    "image": "https://example.com/images/3.jpg"
  },
  {
    "id": 4,
    "text": "This is the fourth message. It's a short message again, just like the first message.",
    "image": "https://example.com/images/4.jpg"
  },
  {
    "id": 5,
    "text": "This is the fifth message. It's a medium-length message, not too short and not too long.",
    "image": "https://example.com/images/5.jpg"
  }
]

export default function MessagesPage() {
  const [messages, setMessages] = useState( []);
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
        <h2 className="text-center text-2xl font-bold underline">
          Review{' '}
          <span className="italic font-bold">
            {messages.length}
          </span>{' '}
          number of submissions to {messages[0]?.recipient}'s Bundl
        </h2>
  
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