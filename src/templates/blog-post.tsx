/* eslint-disable react/no-danger,react/prop-types */

import React from 'react';
import { Link, graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

import './blog-post.css';

interface Props {
  data: any;
  location: any;
  pageContext: any;
}

const BlogPostTemplate = ({ data, location, pageContext }: Props): JSX.Element => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME as string,
    config: {
      identifier: post.fields.slug as string,
      title: post.frontmatter.title as string,
      url: `${data.site.siteMetadata.siteUrl}${post.fields.slug}`,
    },
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <Link style={{ boxShadow: `none` }} to="/">
        ← Back
      </Link>
      <h1
        style={{
          marginTop: rhythm(1),
          marginBottom: 0,
        }}
      >
        {post.frontmatter.title}
      </h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
        }}
      >
        {post.frontmatter.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>

      <DiscussionEmbed {...disqusConfig} />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
