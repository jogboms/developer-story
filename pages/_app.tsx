import "../styles/globals.css";
import type { AppProps } from "next/app";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
