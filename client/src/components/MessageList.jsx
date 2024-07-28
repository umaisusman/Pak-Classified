import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((message) => (
        <li key={message._id}>
          <strong>{message.user.userName}</strong>: {message.content}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
