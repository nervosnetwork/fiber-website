import { Footer } from "components/Footer";
import localFont from "next/font/local";
import Link from "next/link";


const Cabinet = localFont({
  src: "../public/font/CabinetGrotesk-Bold.woff",
  display: "swap",
});
const Resourcespage = () => {

  return (
    <>
      <main className={"tutorials " + Cabinet.className}>
        <section className="videos">
          <div className="title">
            <span>Tutorials</span>
          </div>
          <a
            href="https://www.youtube.com/watch?v=-es_tPxfQTo"
            target="_blank"
            className="youtube"
            style={{
              backgroundImage:
                "url('https://i.ytimg.com/vi_webp/-es_tPxfQTo/maxresdefault.webp')",
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
        </section>
        <section className="document">
          <div className="title">
            <span>Documentation</span>
          </div>
          <ul>
            <li>
              <Link href={"https://github.com/nervosnetwork/fiber/blob/main/docs/light-paper.md"} target="_blank">Light Paper</Link>
            </li>
            <li>
              <Link href={"https://github.com/nervosnetwork/fiber/blob/main/src/rpc/README.md"} target="_blank">RPC Documentation</Link>
            </li>
            <li>
              <Link href={"https://github.com/nervosnetwork/fiber/blob/main/docs/specs/p2p-message.md"} target="_blank">P2P Message Protocol</Link>
            </li>
            <li>
              <Link href={"https://github.com/nervosnetwork/fiber/blob/main/docs/specs/payment-invoice.md"} target="_blank">Invoice Protocol</Link>
            </li>
          </ul>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Resourcespage;
