import type { AppProps } from 'next/app'
// import nextI18NextConfig from '../next-i18next.config.js'
import { Footer } from "../components/Footer";
import localFont from "next/font/local";
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../components/Header'), { ssr: false });

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
  <Header />
  <Component {...pageProps} />
  </>
)

// https://github.com/i18next/next-i18next#unserializable-configs
export default MyApp 
