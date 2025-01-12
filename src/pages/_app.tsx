import RootLayout from "./layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }: any) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
