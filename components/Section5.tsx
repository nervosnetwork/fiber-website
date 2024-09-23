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
    <section
      className={"roadmap snap_block " + Cabinet.className}
      id="timeline"
    >
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
              strokeLinecap="round"
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
                <stop stopColor="#00CC9B" />
                <stop offset="1" stopColor="#00CC9B" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2>Test Timeline</h2>
        <dl>
          <dt>
            <span>Sep 1, 2024</span>
          </dt>
          <dd>
            - Open, update, and close channels between two nodes <br />
            - Support for channels with any RGB++ Coin <br />- Cross-chain
            interoperability with the Bitcoin Lightning Network
          </dd>
          <dt>
            <span>Sep 19 2024</span>
          </dt>
          <dd>
            - Multi-hop routing support <br />- Watchtower service
          </dd>
          {/* <dt>
                <span>2025 Q1</span>
              </dt>
              <dd>- Fiber Network mainnet launch</dd> */}
        </dl>
        <div className="youtube_box">
          <a
            href="https://www.youtube.com/watch?v=-es_tPxfQTo"
            target="_blank"
            className="youtube"
            style={{
              backgroundImage:
                "url('https://i.ytimg.com/vi/-es_tPxfQTo/sddefault.jpg')",
            }}
          >
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
              <path
                className="ytp-large-play-button-bg"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#f00"
              ></path>
              <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/watch?v=ePkLe7_Ve6k"
            target="_blank"
            className="youtube"
            style={{
              backgroundImage:
                "url('https://i.ytimg.com/vi/ePkLe7_Ve6k/sddefault.jpg')",
            }}
          >
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
              <path
                className="ytp-large-play-button-bg"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#f00"
              ></path>
              <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
