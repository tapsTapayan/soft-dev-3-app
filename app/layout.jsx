import './globals.scss';

import { Montserrat } from 'next/font/google';

import { AuthProvider } from '@/providers/AuthContext';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AccountsProvider } from '@/providers/AccountsProvider';
import { UsernameProvider } from '@/providers/UsernamesProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '700', '900'],
});

export const metadata = {
  title: 'SoftDev 3 Labs',
  description: 'Create your own portfolio!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider>
          <AuthProvider>
            <AccountsProvider>
              <UsernameProvider>{children}</UsernameProvider>
            </AccountsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
