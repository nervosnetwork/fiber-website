import type { FC } from "react";

import Link from "next/link";

import { BsSubstack } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";

export const Footer: FC = () => {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-left">
          <img src="images/footer_l.png" width={500} alt="" />
        </div>
        <div className="footer-middle">
          <Link href="/">
            <img src="images/logo.png" height={20} />
          </Link>
          <div className="footer-nav">
            <Link href="/features">Features</Link>
            <Link href="/#common">Common Lightning Initiative</Link>
            <Link href="/#timeline">Test Timeline</Link>
            <Link href="/resources">Resources</Link>
          </div>
          <div className="footer_links">
            <Link href="https://github.com/nervosnetwork/fiber" target="_blank">
              <BsGithub size={16} />
            </Link>
            <Link href="https://x.com/CKBEcoFund" target="_blank">
              <BsTwitterX size={16} />
            </Link>
            <Link href="https://substack.com/@ckbecofund" target="_blank">
              <BsSubstack size={16} />
            </Link>
          </div>
        </div>
        <div className="footer-right">
          <img src="images/footer_r.png" width={500} alt="" />
        </div>
      </div>
    </footer>
  );
};
