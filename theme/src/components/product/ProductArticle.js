import React from "react";
import {MDXProvider} from "@mdx-js/react";
import {MDXRenderer} from "gatsby-plugin-mdx";
// import {Box} from "@material-ui/core";

import {mdxShortcodes} from "../mdx/shortCodes";
import useStyles from "./stylesProductView";

export default function ProductArticle({body}) {
  const classes = useStyles();
  // console.log('...zv page article:');
  return (
    <article className={classes.article}>
      <MDXProvider components={mdxShortcodes}>
        <MDXRenderer testme="test-me">{body}</MDXRenderer>
      </MDXProvider>
    </article>
  );
}