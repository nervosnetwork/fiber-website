import type { FC } from "react";
export default function Buttons(props: { title: string; href: string}){

    const {title,href} = props;




    return <>
        <div className="glowing-wrapper glowing-wrapper-active">
                <div className="glowing-wrapper-animations">
                  <div className="glowing-wrapper-glow"></div>
                  <div className="glowing-wrapper-mask-wrapper">
                    <div className="glowing-wrapper-mask"></div>
                  </div>
                </div>
                <div className="glowing-wrapper-borders-masker">
                  <div className="glowing-wrapper-borders"></div>
                </div>
                <a href={href} className="glowing-wrapper-button w-inline-block">
                  <div className="text-white">{title}</div>
                </a>
              </div>
    </>
}