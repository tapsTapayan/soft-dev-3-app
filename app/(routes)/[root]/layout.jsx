'use client';
import styles from './page.module.scss';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { SkeletonText } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingScreen from '@/components/Loading';

export default function UserLayout({ children }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.push('/sign-in');
  }, [user, loading]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className={styles.page}>
      <Header type="menu" />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <SkeletonText
            mt="4"
            startColor="#229CD020"
            endColor="#9FD9F220"
            noOfLines={8}
            spacing="8"
            skeletonHeight="5"
            isLoaded={user ?? false}
          >
            {children}
          </SkeletonText>
        </div>
      </div>
    </div>
  );
}
