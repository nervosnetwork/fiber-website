import React from "react";

import isMobile from "is-mobile";
import localFont from "next/font/local";

const Cabinet = localFont({
  src: "../public/font/CabinetGrotesk-Bold.woff",
  display: "swap",
});
export default function Table() {
  const ref = React.useRef<HTMLInputElement>(null);
  const is_mobile = isMobile();

  return (
    <div className="intro">
    <p className={Cabinet.className}>
      Fiber Network is a next-generation,<br /> common lightning network built on {is_mobile&&<><br /></>} Nervos CKB and off-chain channels.
    </p>
  </div>
  );
}
