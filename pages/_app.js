import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
