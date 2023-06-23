import { useState, useEffect } from 'react';
import Image from 'next/image';
import placeholder from '../images/placeholder.png'
import jwt_decode from 'jwt-decode';


//messages[currentMessageIndex].img_file  --> source for image

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
  const [userID, setUserID] = useState(null);
  const [recipient, setRecipient] = useState(null);
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const localUserID = decodedToken.userId; 
    setUserID(localUserID);

   
    console.log('localUserID from my provider: ', localUserID);
  
    fetch(`https://yay-api.herokuapp.com/book/${localUserID}/messages`, {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data messages:', data.messages);
  

      const messagesArray = Object.values(data.messages).filter(message => message.msg !== "");
  
      // Set the messages to the state
      setMessages(messagesArray);
    
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
    fetch(`https://yay-api.herokuapp.com/book/${userID}/message/${newMessages[currentMessageIndex].uuid}`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg: currentMessage }),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 md:px-0">
      <div className="flex flex-col w-full md:w-1/2 space-y-8">
        <h2 className="text-center text-2xl font-bold underline">
          Review{' '}
          <span className="italic font-bold">
            {messages.length}
          </span>{' '}
          submissions to {recipient}'s Bundl
        </h2>
  
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <textarea
            className="resize-none border rounded-md"
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
            maxLength={3500}
            rows={20}
            style={{ width: '100%', height: '600px' }}
          />
  
          {currentMessage.length <= 1750 ? (
            messages[currentMessageIndex]?.img_file ? (
              <Image src={placeholder} alt="Author's submission" width={400} height={400} />
            ) : (
              <textarea
                className="resize-none border rounded-md"
                placeholder="Enter a quote here..."
                rows={20}
                style={{ width: '100%', height: '600px' }}
              />
            )
          ) : (
            <div className="border border-gray-300 rounded-md p-4 text-center" style={{ width: '100%', height: '600px' }}>
              The message is too long to fit a picture. It must be less than 1750 to fit a picture in the book.
            </div>
          )}
        </div>
  
        <div className="flex justify-between mt-4 space-x-2 md:space-x-0">
          <button className="px-4 py-2 bg-blue-500 text-white rounded w-full md:w-auto" onClick={handlePrev}>
            Previous
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded w-full md:w-auto" onClick={handleSave}>
            Save
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded w-full md:w-auto" onClick={handleNext}>
            Next
          </button>
        </div>
  
        {/* Add these lines to display the counter and author's name */}
        <p className="text-center mt-4">
          Message {currentMessageIndex + 1} of {messages.length}
        </p>
        <p className="text-center mt-2">
          Author: {messages[currentMessageIndex]?.name}
        </p>
      </div>
    </div>
  );
  
  
}
