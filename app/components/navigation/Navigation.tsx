'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '@/public/logo.svg';
import styles from './Navigation.module.css';

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.leftWrapper}>
          <Image
            src={logo}
            alt="Logo"
            style={{ width: '64px', height: '64px' }}
            className={styles.logo}
            priority
          />
          <Link
            className={`${styles.item} ${pathname === '/' ? styles.active : ''}`}
            href="/"
          >
            Home
          </Link>
        </div>

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
