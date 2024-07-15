'use client';;
import Image from 'next/image';
import styles from './index.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';
import { useScrollContext } from '@/providers/ScrollContext';

const logoSize = '(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 15vw';

const SimpleHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.simple}>
        <div className={styles.logo}>
          <Image
            src={'/logo_with_text.png'}
            alt="logo"
            sizes={logoSize}
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const LandingHeader = ({scrollY}) => {
  const router = useRouter();
  return (
    <div className={scrollY > 100 ? styles.header : styles.transparent}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src={'/logo_with_text.png'}
            alt="logo"
            sizes={logoSize}
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={styles.navigation}>
          <Link href={"about-us"} className={styles.links} onClick={()=>{}}>Our Team</Link>
          <Link href={"contact-us"} className={styles.links} onClick={()=>{}}>Contact Us</Link>
          <Button className={styles.button} onClick={()=>router.push("/register")}>Sign-up</Button>
        </div>
      </div>
    </div>
  );
};


export default function Header(props) {
  const { type } = props;

  const {scrollY} = useScrollContext();

  const Header =
    type == 'landing' ? (
      <LandingHeader scrollY={scrollY}/>
    ) : (
      <SimpleHeader />
    );
  return Header;
}
