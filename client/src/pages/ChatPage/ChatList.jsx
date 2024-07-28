import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, deleteChat } from '../../redux/thunks/chatThunks';
import { selectChat } from '../../redux/slices/chatSlice';
import styles from './ChatPage.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { getMe } from '../../redux/thunks/authThunks';

const ChatList = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  	console.log('chats:', chats)
  
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchChats());
    dispatch(getMe(localStorage.getItem('token')))
  }, [dispatch]);

  const handleSelectChat = (chat) => {
    dispatch(selectChat(chat));
  };

  const handleDeleteChat = (chatId) => {
    dispatch(deleteChat(chatId));
  };

  return (
    <div className={styles.chatList}>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`${styles.chatItem} ${selectedChat?._id === chat._id ? styles.selected : ''}`}
          onClick={() => handleSelectChat(chat)}
        >
          {chat.users[0].name === user.name? chat.users[1].name : chat.users[0].name}
          <img src={chat.users[0].image === user.name? chat.users[1].image : chat.users[0].image} alt="avatar" width={'50px'} className={styles.avatar} />
          <FaTrashAlt onClick={() => handleDeleteChat(chat._id)} className={styles.deleteIcon} />
        </div>
      ))}
    </div>
  );
};

export default ChatList;
