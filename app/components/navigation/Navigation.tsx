'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div>
      <nav className={styles.nav}>
        <Link
          className={`${styles.item} ${pathname === '/' ? styles.active : ''}`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`${styles.item} ${pathname === '/sign-in' ? styles.active : ''}`}
          href="/sign-in"
        >
          Sign In
        </Link>
      </nav>
    </div>
  );
};
