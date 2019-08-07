/* eslint-disable react/prop-types */

import React from 'react';
import { Link, graphql } from 'gatsby';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import './blog-list.css';

interface Props {
  data: any;
  location: any;
  pageContext: any;
}

const BlogList = (props: Props): JSX.Element => {
  const {
    data: {
      allMarkdownRemark: { edges: posts },
    },
    location,
    pageContext: { currentPage, numPages, title },
  } = props;

  return (
    <Layout location={location} title={title}>
      <SEO title={currentPage === 1 ? undefined : `Posts Page ${currentPage}`} />
      <Bio />

      {posts.map(
        ({ node }: any): JSX.Element => {
          const postTitle = node.frontmatter.title || node.fields.slug;

          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {postTitle}
                </Link>
              </h3>
              <small style={{ display: `flex` }}>
                <span>{node.frontmatter.date}</span>
                <span style={{ flex: `1` }} />
                <span>{node.fields.readingTime.text}</span>
              </small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          );
        },
      )}

      <div className="blog-list-navigation">
        {currentPage > 1 && (
          <Link style={{ boxShadow: `none` }} to={currentPage === 2 ? '' : `/page/${currentPage - 1}`}>
            ← Newer Posts
          </Link>
        )}
        <div className="blog-list-navigation-spacer" />
        {currentPage < numPages && (
          <Link style={{ boxShadow: `none` }} to={`/page/${currentPage + 1}`}>
            Older Posts →
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default BlogList;

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          excerpt
          fields {
            readingTime {
              text
            }
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
