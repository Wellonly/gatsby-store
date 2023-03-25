import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { Box, Typography } from "@material-ui/core";
import { useHasScroll } from "../lib/useHasScroll";

export default function LinkTemplate(props) {
  const {
    data: {
      cms: { link, sublink }
    },
    pageContext: {error}
  } = props;

  const hasScroll = useHasScroll(); /* Get the vertical scrollbar offset as a boolean value. */

  return (
    <Layout elevateAppBar={hasScroll}>
      <Box textAlign="center" marginBottom={4}>
        <Typography color="inherit" variant="h3">
          {`${link.label} / ${sublink.label}`}
        </Typography>
        <Typography color="inherit" variant="h3">
          {error ? "undefined error": error.message}
        </Typography>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($linkId: ID!, $parentId: ID!) {
    cms {
      link: Link(id: $parentId) {
        id
        menu
        label
        icon
        slug
        component
      }
      sublink: Sublink(id: $linkId) {
        id
        label
        icon
        slug
        component
      }
    }
  }
`;
