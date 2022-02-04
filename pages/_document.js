import Document, { Html, Head, Main, NextScript } from 'next/document'
<head>

      <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
            crossOrigin="anonymous"
      />

</head>
export default class MyDocument extends Document {
      render() {
            return (
                  <Html>
                        <Head>
                              <script
                                    async
                                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
                                    crossOrigin="anonymous"
                              />

                        </Head>
                        <body>
                              <Main />
                              <NextScript />
                        </body>
                  </Html>
            )
      }
}