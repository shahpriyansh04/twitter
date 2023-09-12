import { AuthContextProvider } from "@/lib/auth";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
