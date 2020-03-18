/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { TwitterFollowButton } from 'react-twitter-embed';

import { rhythm } from '../utils/typography';

const Bio = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: '100%',
        }}
        imgStyle={{
          borderRadius: '50%',
        }}
      />

      <div>
        <p>
          Written by {author} who is a long time nerd developing software and building computers and gadgets. Anything
          expressed on this website are {author}
          {`'`}s alone and do not represent his employer.
        </p>

        <TwitterFollowButton screenName={social.twitter} options={{ size: 'large' }} />
      </div>
    </div>
  );
};

export default Bio;
