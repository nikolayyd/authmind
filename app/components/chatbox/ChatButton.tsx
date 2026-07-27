import { FaRobot } from 'react-icons/fa';
import styles from './ChatButton.module.css';

interface ChatProps {
  onClick: () => void;
}

export const ChatButton = ({ onClick }: ChatProps) => {
  return <FaRobot className={styles.appearButton} onClick={onClick} />;
};
