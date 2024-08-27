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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="images/favicon.ico"
          ></link>
          <meta
            name="description"
            content="RGB++ is an asset issuance protocol on the Bitcoin mainnet. RGB++ Fans focus on promoting protocol within the Bitcoin ecosystem and building global RGB++ community."
          />
          <title>Fiber</title>
         <meta property="og:title" content="Fiber" />
          <meta property="og:type" content="website" />
          {/* <meta
            property="og:image"
            content="https://www.rgbppfans.com/images/rgb++.png"
          />
          <meta property="og:site_name" content="RGB++ Fans" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@rgbppfans" />
          <meta name="twitter:creator" content="@rgbppfans" />
          <meta name="twitter:title" content="RGB++ Fans" />
          <meta name="twitter:description" content="RGB++ is an asset issuance protocol on the Bitcoin mainnet. RGB++ Fans focus on promoting protocol within the Bitcoin ecosystem and building global RGB++ community." />
          <meta name="twitter:image" content="https://www.rgbppfans.com/images/rgbppfuns.png"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=0, maximum-scale=0, user-scalable=yes,shrink-to-fit=no" /> */}

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
