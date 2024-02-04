// ChatBox.jsx
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const ChatBox = ({ onContactAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed bottom-0 right-0 mb-4 mr-4 ${isOpen ? 'block' : 'hidden'}`}>
      {/* Contact button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full fixed bottom-10 right-10"
        onClick={() => setIsOpen(true)}
      >
        Contact
      </button>

      {/* Chat box */}
      <div className="w-64 p-4 bg-white rounded-lg shadow-lg">
        {/* Your chat box content */}
        <p>Chat with us!</p>
        {/* Close button */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
