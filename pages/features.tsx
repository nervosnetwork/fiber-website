import Footer from "components/Footer";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
const Intro = dynamic(() => import('../components/Intro'), { ssr: false });

const Satoshi = localFont({
    src: "../public/font/Satoshi-Light.woff",
    display: "swap",
  });
  const Cabinet = localFont({
    src: "../public/font/CabinetGrotesk-Bold.woff",
    display: "swap",
  });
const Features = () => {

  return (
    <>
      <main className={"resources "+Satoshi.className}>
        <div className="resources_main">
          <Intro />
          <div className="intro_box">
            <img src="images/intro_calability.svg" />
            <dl>
              <dt className={Cabinet.className}>Scalability</dt>
              <dd>
                Through off-chain payment channels and multi-hop routing, Fiber
                Network can achieve high-throughput transaction processing,
                meeting the needs of large-scale users.{" "}
                
              </dd>
            </dl>
          </div>
          <div className="intro_box">
            <img src="images/intro_low_cost.svg" />
            <dl>
              <dt className={Cabinet.className}>Low Cost</dt>
              <dd>
                By reducing the frequency of on-chain transactions, Fiber
                Network lowers transaction fees, making micropayments feasible
                and efficient.{" "}
              </dd>
            </dl>
          </div>
          <div className="intro_box">
            <img src="images/intro_fast.svg" />
            <dl>
              <dt className={Cabinet.className}>Fast</dt>
              <dd>
                The instant confirmation of off-chain transactions provides a
                split second payment confirmation experience suitable for
                various instant payment scenarios.{" "}
              </dd>
            </dl>
          </div>
          <div className="intro_box">
            <img src="images/intro_multi_asset.svg" />
            <dl>
              <dt className={Cabinet.className}>Multi-Asset Support</dt>
              <dd>
                Fiber Network supports payments in a variety of digital assets,
                offering users a broader range of payment options.
              </dd>
            </dl>
          </div>
          <div className="intro_box">
            <img src="images/intro_interoperability.svg" />
            <dl>
              <dt className={Cabinet.className}>Interoperability</dt>
              <dd>
                Fiber Network supports interoperability with the Bitcoin
                Lightning Network, providing support for cross-chain payments
                and asset transfers.
              </dd>
            </dl>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
};


export default Features;
