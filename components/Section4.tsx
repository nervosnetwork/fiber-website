import React from "react";

import isMobile from "is-mobile";
import localFont from "next/font/local";

const Cabinet = localFont({
  src: "../public/font/CabinetGrotesk-Bold.woff",
  display: "swap",
});
export default function Section4() {
  const ref = React.useRef<HTMLInputElement>(null);
  const is_mobile = isMobile();

  return (
    <section className="common snap_block" id="common">
      <div className="common_main">
        <div className="info">
          <h2 className={Cabinet.className}>Common Lightning Initiative</h2>
          <p>
            CKB has launched the “Common Lightning Initiative” to establish a
            robust, geographically distributed infrastructure to support the
            expanding adoption and use of the Lightning Network. This
            comprehensive initiative is composed of three key components:
          </p>
        </div>
        <div className="common_info">
          <div className="img_box">
            <img src="/images/common_3.svg" />
          </div>
          <h3>Full Development of Fiber Network</h3>
          <p>
            Fiber Network is a next-generation, common lightning network built
            on Nervos CKB and off-chain channels. It is designed to provide
            fast, low-cost, and decentralized multi-token payments and
            peer-to-peer transactions.
          </p>
        </div>
        <div className="common_info">
          <div className="img_box">
            <img src="/images/common_2.svg" />
          </div>
          <h3>Integration with DePIN Hardware</h3>
          <p>
            By deploying over 100,000 nodes using DePIN hardware, we aim to
            establish a globally distributed, censorship-resistant lightning
            network capable of supporting the increasing demand for fast and
            low-cost payments.
          </p>
        </div>
        <div className="common_info">
          <div className="img_box">
            <img src="/images/common_4.svg" />
          </div>
          <h3>Cultivation of a P2P Application Ecosystem</h3>
          <p>
            By providing the above infrastructure, we aim to foster innovations
            that will reshape traditional business models and create new
            peer-to-peer opportunities for value creation and exchange.
          </p>
        </div>

        <div className="meteor_line_1">
          {is_mobile ? (
            <img src="/images/border_m_3.svg" />
          ) : (
            <svg
              width="1204"
              height="4"
              viewBox="0 0 1204 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1202 2L2.00003 2"
                stroke="url(#paint0_linear_4_187)"
                stroke-width="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4_187"
                  x1="2"
                  y1="1.56741"
                  x2="1202"
                  y2="1.56741"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF9900" />
                  <stop offset="1" stopColor="#FF9900" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      </div>
    </section>
  );
}
