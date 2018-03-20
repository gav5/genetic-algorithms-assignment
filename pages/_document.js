import Document, { Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
import Router from 'next/router'
import { Menu } from 'semantic-ui-react'

class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <link rel="stylesheet" href="/static/app.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
// export default withRouter(MyDocument)
