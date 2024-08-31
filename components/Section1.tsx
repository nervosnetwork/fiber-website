import { useRouter } from "next/router";

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
export default function Section1() {
  const ref = React.useRef<HTMLInputElement>(null);
  const is_mobile = isMobile();

  return (
    <section id="#" className={Satoshi.className + " section1 snap_block"}>
      <div className="meteor_t">
        
      </div>
      {is_mobile ? (
        <>
          <h1 className="main_slogan">
            <span>Faster</span>
            <span>Cheaper</span>
            <span>P2P</span>
          </h1>
          <h1 className="main_slogan">
            <span>Multi-Asset Support</span>
          </h1>
          <h1 className="main_slogan">
            <span>Interoperability </span>
          </h1>
        </>
      ) : (
        <>
          <h1 className="main_slogan">
            <span>Faster</span>
            <span>Cheaper</span>
            <span>P2P</span>

            <span>Multi-Asset Support</span>

            <span>Interoperability </span>
          </h1>
        </>
      )}
      <div className="meteor_b">
        
      </div>

      <h2 className={Cabinet.className}>
        Fiber Network is making Satoshi’s vision a reality
      </h2>
      <p>The Next-generation Common Lightning Network</p>
      {is_mobile ? (
        <div className="links_m">
          <div className="links_middle">
            <Buttons href="https://github.com/nervosnetwork/fiber/blob/main/docs/light-paper.md"  title="Lightpaper" />
            <Buttons href="https://github.com/nervosnetwork/fiber" title="GitHub" />
          </div>
        </div>
      ) : (
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
                strokeLinecap="round"
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
                  <stop stopColor="#00CC9B" />
                  <stop offset="1" stopColor="#00CC9B" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="links_middle">
            <Buttons href="https://github.com/nervosnetwork/fiber/blob/main/docs/light-paper.md" title="Lightpaper" />
            <Buttons href="https://github.com/nervosnetwork/fiber" title="GitHub" />
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
                strokeLinecap="round"
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
                  <stop stopColor="#FF9900" />
                  <stop offset="1" stopColor="#FF9900" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
