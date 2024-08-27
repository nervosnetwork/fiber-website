import Buttons from "components/Buttons";
import { Footer } from "components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";

const Homepage = () => {
  const router = useRouter();

  return (
    <>
      <main>
        <section id="#">
          <div className="meteor_t">
            <svg
              width="1440"
              height="4"
              viewBox="0 0 1440 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2H720"
                stroke="url(#paint0_linear_2_384)"
                stroke-width="3"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2_384"
                  x1="720"
                  y1="2.43259"
                  x2="0"
                  y2="2.43259"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00CC9B" />
                  <stop offset="1" stop-color="#00CC9B" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1>
            <span>Faster</span>
            <span>Cheaper</span>
            <span>P2P</span>
            <span>Multi-Asset Support</span>
            <span>Interoperability </span>
          </h1>
          <div className="meteor_b">
            <svg
              width="725"
              height="10"
              viewBox="0 0 725 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5L725 5.00006"
                stroke="url(#paint0_linear_2_380)"
                stroke-width="10"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2_380"
                  x1="725"
                  y1="5.43265"
                  x2="5"
                  y2="5.43259"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00CC9B" />
                  <stop offset="1" stop-color="#00CC9B" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2>Fiber Network is making Satoshi’s vision a reality. </h2>
          <div className="links">
            <div>
              <svg
                width="478"
                height="179"
                viewBox="0 0 478 179"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-14 2H463.904C472.746 2 478.552 11.2387 474.716 19.2058L398.5 177.5"
                  stroke="url(#paint0_linear_2_375)"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2_375"
                    x1="234.5"
                    y1="2"
                    x2="234.5"
                    y2="177.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#00CC9B" />
                    <stop offset="1" stop-color="#00CC9B" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="links_middle">
              <Buttons href="#" title="Lightpaper" />
              <Buttons href="#" title="Announcement" />
              <Buttons href="#" title="GitHub" />
            </div>
            <div>
              <svg
                width="478"
                height="179"
                viewBox="0 0 478 179"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M492 177.5L14.0963 177.5C5.2538 177.5 -0.551743 168.261 3.28427 160.294L79.5 1.99996"
                  stroke="url(#paint0_linear_2_378)"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2_378"
                    x1="243.5"
                    y1="177.5"
                    x2="243.5"
                    y2="1.99998"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF9900" />
                    <stop offset="1" stop-color="#FF9900" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </section>
        <section className="works">
          <div className="meteor_line">
            <svg
              width="1318"
              height="186"
              viewBox="0 0 1318 186"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1326.5 180.5L17.0963 180.5C8.25379 180.5 2.44826 171.261 6.28427 163.294L82.5 5"
                stroke="url(#paint0_linear_4_179)"
                stroke-width="10"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4_179"
                  x1="662.25"
                  y1="180.5"
                  x2="662.25"
                  y2="5.00005"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00CC9B" />
                  <stop offset="1" stop-color="#00CC9B" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2>How Fiber Network Works</h2>
          <img src="/images/howworks.png" />
        </section>
        <section className="feature" id="feature">
          <div className="meteor_line">
            <svg
              width="1440"
              height="4"
              viewBox="0 0 1440 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1440 2L3.32594e-05 2"
                stroke="url(#paint0_linear_4_180)"
                stroke-width="3"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4_180"
                  x1="0"
                  y1="1.56741"
                  x2="1440"
                  y2="1.56741"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF9900" />
                  <stop offset="1" stop-color="#FF9900" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="feature_main">
            <div className="feature_text">
              <h2>Highlighted Features</h2>
              <ul>
                <li>
                  <img src="/images/feature_1.png" height={50} />
                  Fast and Low-Cost Transactions
                </li>
                <li>
                  <img src="/images/feature_2.png" height={50} />
                  Multi-asset support 
                </li>
                <li>
                  <img src="/images/feature_3.png" height={50} />
                  Interoperability with Bitcoin Lightning Network
                </li>
                <li>
                  <Link href={"#"}>More</Link>
                </li>
              </ul>
            </div>
            <div className="feature_img"></div>
          </div>
          <div className="meteor_line">
            <svg
              width="100%"
              height="4"
              viewBox="0 0 1440 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2H1440"
                stroke="url(#paint0_linear_4_182)"
                stroke-width="3"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4_182"
                  x1="1440"
                  y1="2.43259"
                  x2="0"
                  y2="2.43259"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF9900" />
                  <stop offset="1" stop-color="#FF9900" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>
        <section className="feature_compare">
          <table>
            <tbody>
              <tr>
                <th>Feature</th>
                <td>
                  <span className="ln">Lightning Network</span>
                </td>
                <td>
                  <span className="fn">Fiber Network</span>
                </td>
              </tr>
              <tr>
                <th>Assets</th>
                <td>
                  <span className="ln">BTC Only</span>
                </td>
                <td>
                  <span className="fn">
                    Fiber NetworkCKB / User Defined Token
                  </span>
                </td>
              </tr>
              <tr>
                <th>Cross Chain Hub</th>
                <td>
                  <span className="ln">No</span>
                </td>
                <td>
                  <span className="fn">Yes</span>
                </td>
              </tr>
              <tr>
                <th>WatchTower Storage</th>
                <td>
                  <span className="ln">O(n)</span>
                </td>
                <td>
                  <span className="fn">O(1)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="common" id="common">
          <div className="common_main">
            <div className="info">
              <img src="images/example.png" alt="" />
              <div className="content">
                <h2>
                  Common Lightning <br /> Initiative
                </h2>
                <p>
                  CKB introduces the “Common Lightning Initiative” with the goal
                  of fostering a thriving P2P application ecosystem. This
                  comprehensive initiative consists of three strategic phases:
                </p>
              </div>
            </div>
            <dl>
              <dt>Fiber Network Node</dt>
              <dd>
                Introduce a next-generation, common lightning network built on
                Nervos CKB and off-chain channels.
              </dd>
              <dt>Expansion through DePIN Hardware</dt>
              <dd>
                Deploy DePIN hardware to serve as nodes for both Fiber Network
                and Lightning Network, enabling users to mine tokens from both
                networks.{" "}
              </dd>
              <dt>Fostering a Robust P2P Application Ecosystem </dt>
              <dd>
                Realize the full potential of Web5 by seamlessly integrating
                Web3 technologies with a dynamic and resilient P2P application
                ecosystem.{" "}
              </dd>
            </dl>
            <div className="meteor_line">
              <svg
                width="1200"
                height="4"
                viewBox="0 0 1200 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2100 2L3.32594e-05 2"
                  stroke="url(#paint0_linear_4_180)"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4_180"
                    x1="0"
                    y1="1.56741"
                    x2="1200"
                    y2="1.56741"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF9900" />
                    <stop offset="1" stop-color="#FF9900" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </section>
        <section className="roadmap" id="roadmap">
         
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
                stroke-width="10"
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
              <dt><span>2024 Q3</span></dt>
              <dd>Fiber Network Testing</dd>
              <dt><span>2024 Q4</span></dt>
              <dd>Fiber Network Mainnet Launch</dd>
              <dt><span>2025</span></dt>
              <dd>Adding More Features (e.g. Privacy Protection Algorithms)</dd>
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
