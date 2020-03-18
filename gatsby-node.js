/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const path = require('path');
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { createFilePath } = require('gatsby-source-filesystem');
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const webpack = require('webpack');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogList = path.resolve('./src/templates/blog-list.tsx');
  const blogPost = path.resolve('./src/templates/blog-post.tsx');
  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  const {
    data: {
      allMarkdownRemark: { edges: posts },
      site: {
        siteMetadata: { title },
      },
    },
  } = result;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({
    length: numPages,
  }).forEach((_, i) =>
    createPage({
      path: i === 0 ? '/' : `/page/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        title,
      },
    }),
  );
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({
      node,
      getNode,
    });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    ],
  });
};
