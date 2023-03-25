import React from "react";
import { graphql } from "gatsby";
import { Box, Typography } from "@material-ui/core";

import Layout from "../components/Layout";

export default function ErrorLinkTemplate(props) {
  console.log('...zv ErrorLinkTemplate page:', props);
  const {
    data: {
      site: {
        siteMetadata: {
          i18n
        }
      },
      cms: { link }
    },
    pageContext: {error}
  } = props;

  return (
    <Layout textAlign="center">
      <Typography color="inherit" variant="h3">
        {`${link.label}`}
      </Typography>
      <Typography color="inherit" variant="h5">
        {i18n.someErrorMessage}
      </Typography>
      <Typography color="inherit" variant="h5">
        {error ? error: 'undefined error...'}
      </Typography>
      <Separator/>
    </Layout>
  );
}

const Separator = () => <Box pt="1em" />;

export const pageQuery = graphql`
  query($linkId: ID!) {
    site {
      siteMetadata {
        i18n {
          ourCollections
          someErrorMessage
          guessMessage
        }
      }
    }
    cms {
      link: Link(id: $linkId) {
        id
        menu
        label
        icon
        slug
        component
      }
    }
  }
`;
