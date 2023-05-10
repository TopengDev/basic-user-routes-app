import GlobalState from "@/GlobalState";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalState>
      <Component {...pageProps} />;
    </GlobalState>
  );
}

export default App;
