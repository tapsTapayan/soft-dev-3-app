'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoLogOutSharp } from 'react-icons/io5';

import { logout } from '@/firebase/auth';
import { useNavContext } from '@/providers/NavProvider';
import { Button, IconButton, Progress, useToast } from '@chakra-ui/react';

import styles from './index.module.scss';
import { useAuthContext } from '@/providers/AuthContext';

function Navbar() {
  const router = useRouter();
  const toast = useToast();
  const { userDetails } = useAuthContext();
  const { active } = useNavContext(false);
  const [loading, setLoading] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const handleRedirect = (link, router) => {
    setLoading(true);
    router.push(link);
  };

  const handleLogout = (router, toast) => {
    setIsLogging(true);
    try {
      logout().then(() =>
        toast({
          title: 'Logged-out Successfully',
          description: 'Please wait till the page reloads',
          status: 'success',
          position: 'top',
          duration: 3000,
        })
      );
    } catch (e) {
      toast({
        title: 'There was a problem logging out',
        description: 'Please reload the page and try again.',
        status: 'error',
        position: 'top',
        duration: 3000,
      });
    }
  };

  return (
    <div className={styles.navbar}>
      {loading ? (
        <div className={styles.loading}>
          <Progress size="xs" hasStripe isIndeterminate />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.wrapper}>
        <div className={styles.links}>
          <Button
            isDisabled={isLogging || loading}
            variant="ghost"
            borderRadius={0}
            onClick={
              !active
                ? () => {}
                : () => handleRedirect(`/${userDetails.username}`, router)
            }
            className={!active ? styles.active : styles.inactive}
          >
            Home
          </Button>
          <Button
            isDisabled={isLogging || loading}
            variant="ghost"
            borderRadius={0}
            onClick={
              active == 'designs'
                ? () => {}
                : () =>
                    handleRedirect(`/${userDetails.username}/designs`, router)
            }
            className={active == 'projects' ? styles.active : styles.inactive}
          >
            My Projects
          </Button>
          <Button
            isDisabled={isLogging || loading}
            variant="ghost"
            borderRadius={0}
            onClick={
              active == 'projects'
                ? () => {}
                : () =>
                    handleRedirect(`/${userDetails.username}/projects`, router)
            }
            className={active == 'payroll' ? styles.active : styles.inactive}
          >
            My Designs
          </Button>
        </div>
      </div>
      <Button
        isDisabled={isLogging || loading}
        variant="ghost"
        borderRadius={0}
        onClick={
          active == 'profile'
            ? () => {}
            : () => handleRedirect(`/${userDetails.username}/profile`, router)
        }
        className={active == 'profile' ? styles.active : styles.inactive}
      >
        My Profile
        <IconButton
          isLoading={isLogging}
          spinnerPlacement="center"
          icon={<IoLogOutSharp color="#229CD0" />}
          zIndex={2}
          variant="ghost"
          onClick={() => handleLogout(router, toast)}
        />
      </Button>
    </div>
  );
}

export default Navbar;
