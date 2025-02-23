import RootLayout from "./layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { NextComponentType } from "next";

config.autoAddCss = false;

type NextComponentWithLayout = NextComponentType & {
  layout?: React.ComponentType;
};

export default function App({ Component, pageProps }: AppProps & { Component: NextComponentWithLayout }) {
  const Layout = Component.layout || RootLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
