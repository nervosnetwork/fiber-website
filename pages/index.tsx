import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { useEffect } from "react";
const Section1 = dynamic(() => import('../components/Section1'), { ssr: false });
const Section2 = dynamic(() => import('../components/Section2'), { ssr: false });
const Section3 = dynamic(() => import('../components/Section3'), { ssr: false });
const Section4 = dynamic(() => import('../components/Section4'), { ssr: false });
const Table = dynamic(() => import('../components/Table'), { ssr: false });
const Satoshi = localFont({
  src: "../public/font/Satoshi-Light.woff",
  display: "swap",
});
const Cabinet = localFont({
  src: "../public/font/CabinetGrotesk-Bold.woff",
  display: "swap",
});
const Homepage = () => {
  useEffect(()=>{
    window.setTimeout(()=>{    document.querySelector('#main')?.scrollTo(0,0)
    }
  ,100)
    
  },[])
  return (
    <>
      <main id="main" className={Satoshi.className}>
        <Section1 />
        <Section2 />
        <Section3 />
       
        <Table />
       
        <Section4 />
        <section className={"roadmap "+Cabinet.className} id="roadmap">
          <div className="roadmap_main">
            <div className="meteor_line">
              <svg
                width="1205"
                height="84"
                viewBox="0 0 1205 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1200 79L17.2126 79C8.34156 79 2.53722 69.7069 6.42926 61.7352L34.1293 5"
                  stroke="url(#paint0_linear_4_189)"
                  strokeWidth="10"
                  stroke-linecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4_189"
                    x1="599"
                    y1="79"
                    x2="599"
                    y2="5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#00CC9B" />
                    <stop offset="1" stop-color="#00CC9B" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2>Roadmap </h2>
            <dl>
              <dt>
                <span>2024 Q3</span>
              </dt>
              <dd>- Fiber Network testnet launch, including multi-hop routing and watchtower service.</dd>
              <dt>
                <span>2024 Q4</span>
              </dt>
              <dd>- Improve RPC and SDK. <br />- Refine Fiber Network node and contract functionalities (e.g. more flexible RPC and contract invocation methods for upper-layer applications to address liquidity issues).</dd>
              <dt>
                <span>2025 Q1</span>
              </dt>
              <dd>- Fiber Network mainnet launch</dd>
            </dl>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })

export default Homepage;
