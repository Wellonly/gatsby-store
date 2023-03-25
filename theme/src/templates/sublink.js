import React from "react";
import { graphql } from "gatsby";
import { Typography } from "@material-ui/core";

import Layout from "../components/Layout";

export default function SublinkTemplate(props) {
  const {
    data: {
      cms: { link, sublink }
    }
  } = props;

  return (
    <Layout textAlign="center">
      <Typography
        color="inherit"
        variant="h3"
        style={{
          fontWeight: "bold",
          fontFamily: "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
          marginBottom: 4,
        }}
      >
        {`${link.label} / ${sublink.label}`}
      </Typography>
      <Typography color="inherit" variant="h3">
        {'The page under development!'}
      </Typography>
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
