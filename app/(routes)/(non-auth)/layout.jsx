'use client';
import styles from './page.module.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthContext } from '@/providers/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingScreen from '@/components/Loading';

export default function AuthLayout({ children }) {
  const { user, userDetails, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user && userDetails && !loading)
      router.push(`/${userDetails?.username}`);
  }, [user, loading]);
  return loading ? (
    <LoadingScreen />
  ) : (
    <div className={styles.main}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
