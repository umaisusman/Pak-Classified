import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../../redux/thunks/messageThunks";
import MessageList from "../MessagePage/MessageList";
import MessageInput from "../MessagePage/MessageInput";
import styles from "./ChatPage.module.css";
import io from "socket.io-client";
import { addMessage } from "../../redux/slices/messageSlice";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const messages = useSelector((state) => state.message.messages);
  const socketRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      dispatch(fetchMessages(selectedChat._id));
      socketRef.current = io.connect("http://localhost:4500");

      socketRef.current.emit("join chat", selectedChat._id);

      socketRef.current.on("message", (message) => {
        dispatch(addMessage(message));
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [dispatch, selectedChat]);

  const handleSendMessage = (content) => {
    const message = { content, chatId: selectedChat._id };
    dispatch(sendMessage(message));
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", message);
    }
  };

  return (
    <div className={styles.chatWindow}>
      {selectedChat ? (
        <>
          <MessageList messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      ) : (
        <div className={styles.noChatSelected}>No chat selected</div>
      )}
    </div>
  );
};

export default ChatWindow;
