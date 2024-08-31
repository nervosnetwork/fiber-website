import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { useEffect } from "react";
const Section1 = dynamic(() => import("../components/Section1"), {
  ssr: false,
});
const Section2 = dynamic(() => import("../components/Section2"), {
  ssr: false,
});
const Section3 = dynamic(() => import("../components/Section3"), {
  ssr: false,
});
const Section4 = dynamic(() => import("../components/Section4"), {
  ssr: false,
});
const Section5 = dynamic(() => import("../components/Section5"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer"), {
  ssr: false,
});
const Table = dynamic(() => import("../components/Table"), { ssr: false });
const Satoshi = localFont({
  src: "../public/font/Satoshi-Light.woff",
  display: "swap",
});
const Cabinet = localFont({
  src: "../public/font/CabinetGrotesk-Bold.woff",
  display: "swap",
});
const Homepage = () => {
  // useEffect(() => {
  //   window.setTimeout(() => {
  //     document.querySelector("#main")?.scrollTo(0, 0);
  //   }, 100);
  // }, []);
  return (
    <>
      <main id="main" className={Satoshi.className}>
        <Section1 />
        <Section2 />
        <Section3 />

        <Table />

        <Section4 />
        <Section5 />
        
        <Footer />
      </main>
    </>
  );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })

export default Homepage;
