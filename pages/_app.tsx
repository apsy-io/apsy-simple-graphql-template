import { AppProps } from "next/dist/shared/lib/router/router";
import AuthenticationProvider from "src/providers/AuthenticationProvider";
import AuthorizationProvider from "src/providers/AuthorizationProvider";
import SnackProvider from "src/providers/SnackProvider";
import { onSWRError, onSWRErrorRetry } from "src/utils/http/onError";
import { SWRConfig } from "swr";

import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SWRConfig
        value={{
          errorRetryCount: 0,
          onError: onSWRError,
          onErrorRetry: onSWRErrorRetry,
          revalidateOnFocus: false,
          revalidateOnMount: true,
        }}
      >
        <SnackProvider>
          <AuthorizationProvider>
            <AuthenticationProvider>
              <Component {...pageProps} />
            </AuthenticationProvider>
          </AuthorizationProvider>
        </SnackProvider>
      </SWRConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
