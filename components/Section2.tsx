import { useRouter } from "next/router";

import React from "react";

import isMobile from "is-mobile";
import localFont from "next/font/local";
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
      <div>
        <div className="meteor_line">
          {is_mobile ? (
           <img src="/images/border_m_7.svg" />
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
                strokeLinecap="round"
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
                  <stop stopColor="#00CC9B" />
                  <stop offset="1" stopColor="#00CC9B" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
        <h2 className={Cabinet.className}>How Fiber Network Works</h2>
        <img src="/images/howworks1.png" />
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
                strokeLinecap="round"
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
