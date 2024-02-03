import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/AuthProvider';

const queryClient = new QueryClient();

export default function App({ Component, pageProps, session }) {
 return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
 );
}

