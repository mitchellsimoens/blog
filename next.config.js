const emoji = require('remark-emoji');
const images = require('remark-images');
const oembed = require('remark-oembed');
const prism = require('remark-prism');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  commonmark: true,
  gfm: true,
  options: {
    remarkPlugins: [
      emoji,
      images,
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
});

module.exports = withMDX({
  future: {
    webpack5: true,
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    loader: 'cloudinary',
    // path: 'cloudinary://774874966656811:4q-UDjejk_QY8Yn7DPUa0dypTow@dn3baky3u'
    domains: ['res.cloudinary.com/']
  },
  async redirects() {
    return [
      {
        source: '/:slug(\\d{4}/\\d{2}/\\d{2}/.*)',
        destination: '/post/:slug', // Matched parameters can be used in the destination
        permanent: false,
      },
    ]
  },
});
