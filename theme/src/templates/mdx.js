import React from "react";
import { graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/Layout";
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
  window.cfg = Object.assign(window?.cfg || {}, site.siteMetadata);

  const classes = useStyles();
  return (
    <Layout padding={2}>
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
    }
  }
`;
