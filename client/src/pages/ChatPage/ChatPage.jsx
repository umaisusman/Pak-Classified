import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import styles from './ChatPage.module.css';

const App = () => {
  return (
      <div className={styles.app}>
        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <ChatList />
          </div>
          <ChatWindow />
        </div>
      </div>
  );
};

export default App;
