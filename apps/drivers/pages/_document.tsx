import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="fr">
    <Head>
      <link
        rel="preload"
        href="/fonts/UberMoveTextBold.otf"
        as="font"
        type="font/otf"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/UberMoveTextLight.otf"
        as="font"
        type="font/otf"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/UberMoveTextMedium.otf"
        as="font"
        type="font/otf"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/UberMoveTextRegular.otf"
        as="font"
        type="font/otf"
        crossOrigin=""
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
