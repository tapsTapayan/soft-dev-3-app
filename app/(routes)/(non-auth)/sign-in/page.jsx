'use client';
import styles from './page.module.scss';
import { Image } from '@chakra-ui/react';
import AuthCard from '../../../../components/AuthCard';

function SignIn() {
  return (
    <div className={styles.frame}>
      <AuthCard />
      <Image
        w="30vw"
        className={styles.backdrop}
        src="/backdrop_3.png"
        alt="backdrop image"
      />
    </div>
  );
}

export default SignIn;
