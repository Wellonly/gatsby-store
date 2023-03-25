import React from "react";
import { graphql, navigate } from "gatsby";
import Layout from "../components/Layout";
import { Box, Typography } from "@material-ui/core";
import PostsGrid from "../components/PostsGrid";
import Pagination from '@material-ui/lab/Pagination';

export default function ResultsAllTemplate({
  data: {
    site: {
      siteMetadata: {
        templates: {
          posts: { pathPrefix }
        }
      }
    },
    allMdx: { edges: posts }
  },
  pageContext: { totalPages, currentPage }
}) {
  const handlePaginationChange = async (event, page) => {
    await navigate(`/${pathPrefix}/page/${page}`);
  };
  return (
    <Layout>
      <Box flexGrow={1} width="100%" maxWidth={960} marginX="auto">
        <Box padding={2}>
          <PostsGrid posts={posts} pathPrefix={pathPrefix} />
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ display: "block", marginTop: 32, marginBottom: 4 }}
          >
            Select page:
          </Typography>
          <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              color="primary"
              onChange={handlePaginationChange}
          />
        </Box>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        templates {
          posts {
            pathPrefix
          }
        }
      }
    }
    allMdx(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { order: DESC, fields: [fileAbsolutePath] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          fileAbsolutePath
          frontmatter {
            id
            title
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
