import Buttons from "components/Buttons";
import { Footer } from "components/Footer";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import Link from "next/link";
import { useRouter } from "next/router";
const Satoshi = localFont({
    src: "../public/font/Satoshi-Light.woff",
    display: "swap",
  });
  const Cabinet = localFont({
    src: "../public/font/CabinetGrotesk-Bold.woff",
    display: "swap",
  });
const Homepage = () => {

  return (
    <>
      <main className={"tutorials "+Cabinet.className}>
        <section className="videos">
            <div className="title"><span>Tutorials</span></div>
            <img src="images/example.png" />
        </section>
        <section className="document">
        <div className="title"><span>Documentation</span></div>
          <ul>
            <li><Link href={'#'}>Light Paper</Link></li>
            <li><Link href={'#'}>RPC Documentation</Link></li>
            <li><Link href={'#'}>P2P Message Protocol</Link></li>
            <li><Link href={'#'}>Invoice Protocol</Link></li>
          </ul>
        </section>
         
          
          <Footer />
      </main>
    </>
  );
};


export default Homepage;
