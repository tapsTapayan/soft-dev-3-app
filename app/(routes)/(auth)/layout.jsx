'use client';
import styles from './page.module.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AuthLayout({ children }) {
  return (
    <div className={styles.main}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
