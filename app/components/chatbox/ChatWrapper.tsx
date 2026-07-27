'use client';
import { useState } from 'react';
import { ChatBox } from './ChatBox';
import { ChatButton } from './ChatButton';
import styles from './ChatWrapper.module.css';

export const ChatWrapper = () => {
  const [hidingChat, setHidingChat] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <ChatBox isHiding={hidingChat} />
      <ChatButton
        onClick={() => {
          setHidingChat(!hidingChat);
        }}
      />
    </div>
  );
};
