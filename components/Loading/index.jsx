'use client';

import { Image, SlideFade } from '@chakra-ui/react';

import styles from './index.module.scss';

function LoadingScreen() {
  return (
    <SlideFade
      in={true}
      offsetY="20px"
      className={styles.wrapper}
      transition={{ exit: { delay: 0.2 }, enter: { duration: 0.3 } }}
    >
      <div className={styles.animator}>
        <Image src="/logo_solo.gif" alt="Animated Loading" width="40vmin"/>
      </div>
    </SlideFade>
  );
}

export default LoadingScreen;
