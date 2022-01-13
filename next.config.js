/* eslint-disable import/no-extraneous-dependencies */
const oembed = require('remark-oembed')
const prism = require('remark-prism')
const mdx = require('@next/mdx')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withMDX = mdx({
  extension: /\.mdx?$/,
  commonmark: true,
  gfm: true,
  options: {
    remarkPlugins: [
      oembed,
      [
        prism,
        {
          transformInlineCode: true,
          plugins: [
            'autolinker',
            'command-line',
            'data-uri-highlight',
            'diff-highlight',
            'inline-color',
            'line-numbers',
            'treeview',
          ],
        },
      ],
    ],
  },
})

module.exports = withBundleAnalyzer(
  withMDX({
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    poweredByHeader: false,
    basePath: '',
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: '/:slug(\\d{4}/\\d{2}/\\d{2}/.*)',
          destination: '/blog/:slug', // Matched parameters can be used in the destination
          permanent: false,
        },
      ]
    },
  }),
)
