'use client';;
import LoadingScreen from '@/components/Loading';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push('/welcome');
  };
  setTimeout(handleRedirect, 3000);

  return <LoadingScreen />;
}
