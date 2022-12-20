import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx);

    return initalProps;
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta
            name="description"
            content="MooWars is an NFT trading card game built for the Beefy DAO."
          />
        </Head>
        <body id="body" className="bg-dark-green">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
