import { useRouter } from "next/router";
import useSmoothScroll from "react-smooth-scroll-hook";

import React from "react";

import isMobile from "is-mobile";
import localFont from "next/font/local";
import Buttons from "./Buttons";
import Link from "next/link";

const Cabinet = localFont({
  src: "../public/font/CabinetGrotesk-Bold.woff",
  display: "swap",
});
export default function Section3() {
  const ref = React.useRef<HTMLInputElement>(null);
  const is_mobile = isMobile();

  return (
    <section className="feature" id="feature">
      <div>
        <h2 className={Cabinet.className}>Highlighted Features</h2>
        <div className="feature_main">
          <div className="feature_text" >
            <ul  className={Cabinet.className}>
              <li>
                <img src="/images/feature_1.png" height={50} />
                Fast and Low-Cost Transactions
              </li>
              <li>
                <img src="/images/feature_2.png" height={50} />
                Multi-asset Support 
              </li>
              <li>
                <img src="/images/feature_3.png" height={50} />
                Interoperability with Bitcoin Lightning Network
              </li>
              <li>
                <Link href={"/features"}>More</Link>
              </li>
            </ul>
          </div>
          <div className="feature_img">
            <img src="/images/feature.svg" />
          </div>
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
                d="M2 2H1202"
                stroke="url(#paint0_linear_4_182)"
                stroke-width="3"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4_182"
                  x1="1202"
                  y1="2.43259"
                  x2="2"
                  y2="2.43259"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF9900" />
                  <stop offset="1" stop-color="#FF9900" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      </div>
    
    </section>
  );
}
