import { useRouter } from "next/router";
import useSmoothScroll from "react-smooth-scroll-hook";

import React from "react";

import isMobile from "is-mobile";
import localFont from "next/font/local";
import Buttons from "./Buttons";
const Satoshi = localFont({
  src: "../public/font/Satoshi-Light.woff",
  display: "swap",
});
const Cabinet = localFont({
  src: "../public/font/CabinetGrotesk-Bold.woff",
  display: "swap",
});
export default function Section2() {
  const ref = React.useRef<HTMLInputElement>(null);
  const is_mobile = isMobile();

  return (
    <section className="works">
      <div className="meteor_line">
        {is_mobile ? (
          <svg
            width="564"
            height="121"
            viewBox="0 0 564 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1195.69 116L17.0741 116C8.23702 116 2.43137 106.772 6.25669 98.8054L51.3015 4.99997"
              stroke="url(#paint0_linear_131_407)"
              stroke-width="10"
              stroke-linecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_131_407"
                x1="596.845"
                y1="116"
                x2="596.845"
                y2="5.00002"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00CC9B" />
                <stop offset="1" stop-color="#00CC9B" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
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
        )}
      </div>
      <h2 className={Cabinet.className}>How Fiber Network Works</h2>
      <img src="/images/howworks.png" />
      <div className="meteor_line_1">
        <img src="/images/border_m_3.svg" />
      </div>
    </section>
  );
}
