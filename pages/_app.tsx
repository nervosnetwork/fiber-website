import type { AppProps } from 'next/app'
// import nextI18NextConfig from '../next-i18next.config.js'
import  Header  from "../components/Header";
import { Footer } from "../components/Footer";
const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
  <Header />
  <Component {...pageProps} />
  </>
)

// https://github.com/i18next/next-i18next#unserializable-configs
export default MyApp 
