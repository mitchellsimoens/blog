import Document, { Html, Head, Main, NextScript } from 'next/document'

import { AppConfig } from '@/utils/AppConfig'

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head />
        <body className="bg-gray-100 px-4 text-slate-500 antialiased dark:bg-slate-900 dark:text-slate-400">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
