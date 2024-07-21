'use client';
import RegisterCard from '@/components/RegisterCard';
import styles from './page.module.scss';
import { Image } from '@chakra-ui/react';

function Registration() {
  return (
    <div className={styles.frame}>
      <RegisterCard />
      <Image
        w="30vw"
        className={styles.backdrop}
        src="/backdrop_2.png"
        alt="backdrop image"
      />
    </div>
  );
}

export default Registration;
