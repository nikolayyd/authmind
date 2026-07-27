// ChatMessage.tsx
import ReactMarkdown from 'react-markdown';
import styles from './ChatMessage.module.css';
import { useState } from 'react';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

// interface Message {
// }

export const ChatMessage = ({ text, isUser }: ChatMessageProps) => {
// const [messages, setMessages] = useState<Message[]>
    return (
    <div
      className={`${styles.messageRow} ${isUser ? styles.messageRowUser : styles.messageRowBot}`}
    >
      <div
        className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleBot}`}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};
