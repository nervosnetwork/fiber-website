import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";

type Props = DocumentProps & {
  // add custom document props
};

class MyDocument extends Document<Props> {
  render() {
    
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
            rel="stylesheet"
          />
          <link href="/app.css" rel="stylesheet" />
     
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="images/fav.ico"
          ></link>
          <meta
            name="description"
            content="Fiber Network is a next-generation,common lightning network built on Nervos CKB and off-chain channels."
          />
          <title>CKBFiber</title>
         <meta property="og:title" content="CKBFiber" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="/images/rgb++.png"
          />
          <meta property="og:site_name" content="CKBFiber" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@CKBEcoFund" />
          <meta name="twitter:creator" content="@CKBEcoFund" />
          <meta name="twitter:title" content="CKBFiber" />
          <meta name="twitter:description" content="Fiber Network is a next-generation,common lightning network built on Nervos CKB and off-chain channels." />
          {/* <meta name="twitter:image" content="https://www.rgbppfans.com/images/rgbppfuns.png"></meta> */}

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
