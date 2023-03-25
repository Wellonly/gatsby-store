import React from "react";
import { graphql } from "gatsby";
import { Box, Typography } from "@material-ui/core";

import Layout from "../components/Layout";
import SublinksList from "../components/SublinksList";

export default function LinkTemplate(props) {
  const {
    data: {
      cms: { link }
    }
  } = props;

  return (
    <Layout textAlign="center" >
      <Typography
        color="inherit"
        variant="h3"
        style={{
          fontWeight: "bold",
          fontFamily: "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
          marginBottom: 4,
        }}
      >
        {link?.label}
      </Typography>
      <Box flexGrow={1}>
        <SublinksList sublinks={link?.sublinks} parentLink={link}/>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($linkId: ID!) {
    cms {
      link: Link(id: $linkId) {
        id
        menu
        label
        icon
        slug
        component
        sublinks: Sublinks(filter: { priority_gt: 0}) {
          id
          label
          icon
          slug
          component
        }
      }
    }
  }
`;
