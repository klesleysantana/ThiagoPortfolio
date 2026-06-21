import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-family-sans' });

export const metadata = {
  title: 'Thiago | Portfolio',
  description: 'Portfólio de projetos e trabalhos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
