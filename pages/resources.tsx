import Buttons from "components/Buttons";
import { Footer } from "components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";

const Homepage = () => {
  const router = useRouter();

  return (
    <>
      <main className="resources">
        <div className="resources_main">
        <div className="intro">
            <p>By building off-chain channels on Nervos CKB, we aim to combine the successful experience of the Lightning Network with CKB's technical advantages to create a fast, low-cost, and decentralized multi-asset real-time payment network.</p>
        </div>
        <div className="intro_box">
            <img src="images/intro_1.svg" />
            <dl>
                <dt>Scalability</dt>
                <dd>Through off-chain payment channels and multi-hop routing, Fiber Network can achieve high-throughput transaction processing, meeting the needs of large-scale users. </dd>
            </dl>
        </div>
        <div className="intro_box">
            <img src="images/intro_2.svg" />
            <dl>
                <dt>Low Cost</dt>
                <dd>By reducing the frequency of on-chain transactions, Fiber Network lowers transaction fees, making micropayments feasible and efficient. </dd>
            </dl>
        </div>
        <div className="intro_box">
            <img src="images/intro_3.svg" />
            <dl>
                <dt>Fast</dt>
                <dd>The instant confirmation of off-chain transactions provides a split second payment confirmation experience suitable for various instant payment scenarios. </dd>
            </dl>
        </div>
        <div className="intro_box">
            <img src="images/intro_4.svg" />
            <dl>
                <dt>Multi-Asset Support</dt>
                <dd>Fiber Network supports payments in a variety of digital assets, offering users a broader range of payment options.</dd>
            </dl>
        </div>
        <div className="intro_box">
            <img src="images/intro_5.svg" />
            <dl>
                <dt>Interoperability</dt>
                <dd>Fiber Network supports interoperability with the Bitcoin Lightning Network, providing support for cross-chain payments and asset transfers.</dd>
            </dl>
        </div>
        <Footer />
        </div>
      </main>
    </>
  );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })

export default Homepage;
