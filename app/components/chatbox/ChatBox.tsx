// /app/components/chatbox/ChatBox.tsx

'use client';
import styles from './ChatBox.module.css';
import { useState, useRef } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { ChatMessage } from './ChatMessage';
import { useSessionStorage } from 'usehooks-ts';
import { askChatBot } from '@/lib/services/chat.service';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}

interface ChatBoxProps {
  isHiding: boolean;
  setIsHiding: React.Dispatch<React.SetStateAction<boolean>>;
}

const STORAGE_KEY = 'chatHistory';

export const ChatBox = ({ isHiding, setIsHiding }: ChatBoxProps) => {
  const [inputValue, setInputValue] = useState('');
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useSessionStorage<Message[]>(
    STORAGE_KEY,
    [
      {
        id: crypto.randomUUID(),
        text: '**Hi!** How can I help you?',
        isUser: false,
      },
    ],
    { initializeWithValue: false },
  );

  const scrollToBottom = () => {
    setTimeout(() => {
      chatAreaRef.current?.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: trimmed,
      isUser: true,
    };

    const loadingId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: loadingId, text: '', isUser: false, isLoading: true }, // временно loading съобщение
    ]);
    setInputValue('');
    scrollToBottom();

    try {
      const answer = await askChatBot(userMessage.text);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? { id: crypto.randomUUID(), text: answer, isUser: false }
            : msg,
        ),
      );
    } catch (err) {
      console.error(err);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
                id: crypto.randomUUID(),
                text: 'Something went wrong. Please try again.',
                isUser: false,
              }
            : msg,
        ),
      );
    }

    scrollToBottom();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div
      className={`${styles.container} ${isHiding ? styles.containerHidden : ''}`}
    >
      <div className={styles.headerChat}>
        <FaTimes
          onClick={() => setIsHiding(!isHiding)}
          className={styles.closeButton}
        />
      </div>
      <div ref={chatAreaRef} className={styles.chatArea}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            text={message.text}
            isUser={message.isUser}
            isLoading={message.isLoading}
          />
        ))}
      </div>
      <form className={styles.questionWrapper} onSubmit={handleSubmit}>
        <input
          className={styles.questionInput}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your question here..."
        />

        <button type="submit">
          <FaPaperPlane className={styles.submitQuestion} />
        </button>
      </form>
    </div>
  );
};
