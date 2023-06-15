import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { MyContext } from './_app';


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
 
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [bookID, setBookID] = useState(null);
  const [recipient, setRecipient] = useState(null);
 

  useEffect(() => {
    const localUserID = localStorage.getItem('userID');
    console.log('localUserID from my provider: ', localUserID);
  
    fetch(`https://yay-api.herokuapp.com/book/${localUserID}/messages`, {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data book id:', data.bookId);
      console.log('Data messages:', data.messages);
  
      // Convert the Map object to an array
      const messagesArray = Object.values(data.messages);
  
      // Set the messages to the state
      setMessages(messagesArray);
      setBookID(data.bookId);
      setRecipient(data.recipient);
  
      // Set the initial current message
      if (messagesArray.length > 0) {
        setCurrentMessage(messagesArray[0].msg);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);




  const handlePrev = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
      setCurrentMessage(messages[currentMessageIndex - 1].msg);
    }
  };

  const handleNext = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
      setCurrentMessage(messages[currentMessageIndex + 1].msg);
    }
  };

  const handleSave = () => {
    // Save the edited message
    const newMessages = [...messages];
    newMessages[currentMessageIndex].msg = currentMessage;
    setMessages(newMessages);

    // Send a request to your API to update the message
    fetch(`https://yay-api.herokuapp.com/book/${bookID}/message/${newMessages[currentMessageIndex]._id}`, { // Replace {bookId} with the actual book ID
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg: currentMessage }),
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
          submissions to {recipient}'s Bundl
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
  
        {/* Add this line to display the counter */}
        <p className="text-center mt-4">
          Message {currentMessageIndex + 1} of {messages.length}
        </p>
      </div>
    </div>
  );
  
}
