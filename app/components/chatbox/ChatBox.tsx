import styles from './ChatBox.module.css';
import { FaPaperPlane } from 'react-icons/fa';
import { ChatMessage } from './ChatMessage';

interface ChatBoxProps {
  isHiding: boolean;
}

export const ChatBox = ({ isHiding }: ChatBoxProps) => {
  return (
    <div
      className={`${styles.container} ${isHiding ? styles.containerHidden : ''}`}
    >
      <div className={styles.chatArea}>
        <ChatMessage
          text="**Hi!** This is test message from AI"
          isUser={false}
        />
        <ChatMessage text="Text answer from user" isUser={true} />
      </div>
      <div className={styles.questionWrapper}>
        <input
          className={styles.questionInput}
          type="text"
          placeholder="Enter your question here..."
        />
        <FaPaperPlane className={styles.submitQuestion} />
      </div>
    </div>
  );
};
