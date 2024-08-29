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
      <div></div>
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
          <div className="feature_img">
            <img src="/images/feature.svg" />
          </div>
        </div>
        
      </div>
      <div className="meteor_line_1">
        <img src="/images/border_m_6.svg" />
      </div>
    </section>
  );
}
