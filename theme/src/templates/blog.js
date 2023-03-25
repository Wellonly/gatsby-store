import React from "react";
import { graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
import {Box, Typography/*, Typography */} from "@material-ui/core";
import { MDXProvider } from "@mdx-js/react"
import Img from "gatsby-image";

import {mdxShortcodes} from "../components/mdx/shortCodes";

const useStyles = makeStyles(() => ({
  article: {
    lineHeight: 1.6,
    fontFamily: "Merriweather, Georgia, serif",
    fontSize: "1.1rem",
    "& blockquote": {
      borderLeft: "3px solid #303032",
      marginLeft: -16,
      paddingLeft: 13,
      fontStyle: "italic"
    }
  }
}));

export default function MdxTemplate(props) {
  console.log('...zv MdxTemplate page:', props);
  const { data } = props;
  const { mdx, site } = data;
  const { body } = mdx;
  const { frontmatter: { title, imageFile } } = mdx;
  window.cfg = Object.assign(window?.cfg || {}, site.siteMetadata);

  const classes = useStyles();
  return (
    <Layout flexGrow={1} padding={2}>
      <Box align="center" marginBottom={1}>
        <Typography
          variant="h4"
          style={{
            fontFamily: "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
          }}
        >
          {title}
        </Typography>
        {imageFile && <Img
            fluid={imageFile.childImageSharp.fluid}
            style={{ borderRadius: 2 }}
          />
        }
      </Box>
      <article className={classes.article}>
        <MDXProvider components={mdxShortcodes}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        MEDIA_HOST_URL
      }
    }
    mdx(frontmatter: { id: { eq: $id } }) {
      body
      frontmatter {
        id
        title
        docimages
        imageFile {
          childImageSharp {
            fluid(maxWidth: 950, quality: 100) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
      }
    }
  }
`;
