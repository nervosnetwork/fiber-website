import type { FC } from "react";

import { Montserrat } from "next/font/google";
import Link from "next/link";

import { BsSubstack } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";

const montserrat = Montserrat({ subsets: ["latin"] });
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
            <Link href="/whitepaper">Features</Link>
            <Link href="/eco">SparkOS</Link>
          </div>
          <div>
            <Link href="/whitepaper">
              <BsGithub size={16} />
            </Link>
            <Link href="/whitepaper">
              <BsTwitterX size={16} />
            </Link>
            <Link href="/whitepaper">
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
