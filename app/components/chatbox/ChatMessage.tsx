// /app/components/chatbox/ChatMessage.tsx

'use client';
import ReactMarkdown from 'react-markdown';
import styles from './ChatMessage.module.css';
interface ChatMessageProps {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}

export const ChatMessage = ({ text, isUser, isLoading }: ChatMessageProps) => {
  return (
    <div
      className={`${styles.messageRow} ${isUser ? styles.messageRowUser : styles.messageRowBot}`}
    >
      <div
        className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleBot}`}
      >
        {isLoading ? (
          <div className={styles.typingIndicator}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <ReactMarkdown>{text}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};
