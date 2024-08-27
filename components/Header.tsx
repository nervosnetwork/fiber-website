import Head from "next/head";
import Link from "next/link";
import { useRef, type FC } from "react";
import { useRouter } from "next/router";
import useSmoothScroll from 'react-smooth-scroll-hook';

import { BsSubstack } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import React from "react";


export default function Header() {
  const router = useRouter();
  const ref = React.useRef<HTMLInputElement>(null);

  const { scrollTo } = useSmoothScroll({
    ref,
  });

  return (
    <>
      <header>
        <div className="header-main">
          <div>
            <Link href="/">
              <img src="images/logo.png" height={20} />
            </Link>
            <div className={"nav-main "}>
              <Link
                href="#feature"
                className={router.pathname === "#feature" ? "sel" : ""}
                onClick={()=>{scrollTo('500')}}
              >
                Features
              </Link>
              <Link
                href="#common"
                className={router.pathname === "#common" ? "sel" : ""}
                onClick={()=>scrollTo('#common')}
              >
                Common Lightning Initiative
              </Link>
              <Link
                href="#roadmap"
                className={router.pathname === "#roadmap" ? "sel" : ""}
                
                onClick={()=>scrollTo('#roadmap')}
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
              <BsSubstack  size={16} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
