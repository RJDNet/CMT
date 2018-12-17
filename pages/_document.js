import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  };

  render() {
    return (
      <html style={{ margin: '0px', padding: '0px', fontFamily: 'Oxygen, sans-serif' }}>
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css?family=Oxygen:400,700" rel="stylesheet" />
        </Head>
        <body className="custom_class" style={{ margin: '0px', padding: '0px' }}>
          <Main />
          <NextScript />
        </body>

      </html>
    );
  };
};