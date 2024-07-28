import React from 'react';
import styles from './Message.module.css';

const MessageList = ({ messages }) => {
  return (
    <div className={styles.messageList}>
      {messages.map((message) => (
        <div key={message._id} className={styles.messageItem}>
          <div className={styles.sender}>{message.sender.name}</div>
          <div className={styles.content}>{message.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
