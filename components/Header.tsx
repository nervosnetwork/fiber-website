import Head from "next/head";
import Link from "next/link";
import { useRef, type FC } from "react";
import { useRouter } from "next/router";
import useSmoothScroll from "react-smooth-scroll-hook";

import { BsSubstack } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import React from "react";
import { FiAlignJustify  } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";

import isMobile from "is-mobile";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import localFont from "next/font/local";
const Satoshi = localFont({
  src: "../public/font/Satoshi-Light.woff",
  display: "swap",
});
export default function Header() {
  const router = useRouter();
  const ref = React.useRef<HTMLInputElement>(null);
  const is_mobile = isMobile();

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const { scrollTo } = useSmoothScroll({
    ref,
  });

  return (
    <>
      <header className={Satoshi.className}>
        {is_mobile ? (
          <>
            <div className={isOpen?'navMobile openMobile':'navMobile'}>
              <Link href="/">
                <img className="nav_logo" height={20} src="images/logo.png" />
              </Link>
              {!isOpen?
              <FiAlignJustify
                color="#fff"
                size={20}
                onClick={() => {
                  toggleDrawer();
                }}
              />:
              <TfiClose color="#fff"
              size={20}
              onClick={() => {
                toggleDrawer();
              }} />
            }
            </div>
            {isOpen&&
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction="top"
              size={388}
              className="drawer"
            >
              
              <div className="nav_main">
                <div className="menus">
                <Link href="" onClick={()=>scrollTo('#feature')}>Features</Link>
                <Link href="#common">Common Lightning Initiative</Link>
                <Link href="#roadmap">Roadmap</Link>
                <Link href="/resources">Resources</Link>
                </div>
                <div className="nav_links">
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
            </Drawer>
            }
          </>
        ) : (
          <div className="header-main">
            <div>
              <Link href="/">
                <img src="images/logo.png" height={20} />
              </Link>
              <div className={"nav-main "}>
                <Link
                  href="#feature"
                  className={router.pathname === "#feature" ? "sel" : ""}
                  onClick={() => {
                    scrollTo("500");
                  }}
                >
                  Features
                </Link>
                <Link
                  href="#common"
                  className={router.pathname === "#common" ? "sel" : ""}
                  onClick={() => scrollTo("#common")}
                >
                  Common Lightning Initiative
                </Link>
                <Link
                  href="#roadmap"
                  className={router.pathname === "#roadmap" ? "sel" : ""}
                  onClick={() => scrollTo("#roadmap")}
                >
                  Roadmap
                </Link>
                <Link
                  href="/resources"
                  className={router.pathname === "/#resources" ? "sel" : ""}
                >
                  Resources
                </Link>
              </div>
            </div>
            <div className="nav-right">
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
        )}
      </header>
    </>
  );
}
