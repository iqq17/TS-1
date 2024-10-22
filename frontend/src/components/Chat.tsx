import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulating initial messages
    const initialMessages: Message[] = [
      { id: '1', sender: 'Alice', content: 'Hello everyone!', timestamp: new Date(Date.now() - 300000) },
      { id: '2', sender: 'Bob', content: 'Hi Alice, how are you?', timestamp: new Date(Date.now() - 240000) },
    ];
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-4">Chat</h3>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.sender === 'You' ? 'text-right' : ''}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <p className="font-semibold">{message.sender}</p>
              <p>{message.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={sendMessage}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;