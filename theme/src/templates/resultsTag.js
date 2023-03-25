import React from "react";
import { graphql, navigate } from "gatsby";
import Layout from "../components/Layout";
import { Box, Divider, Typography } from "@material-ui/core";
import PostsGrid from "../components/PostsGrid";
import Pagination from '@material-ui/lab/Pagination';

export default function ResultsTagTemplate({
  data: {
    site: {
      siteMetadata: {
        templates: {
          posts: {
            filters: {
              tag: {
                pathPrefix,
                pagination: { resultsPerPage }
              }
            }
          }
        }
      }
    },
    allMdx: { edges: posts }
  },
  pageContext: { tag, totalPages, currentPage }
}) {
  const handlePaginationChange = async (event, page) => {
    await navigate(`/${pathPrefix}/${tag}/page/${page}`);
  };
  return (
    <Layout>
      <Box flexGrow={1} width="100%" maxWidth={960} marginX="auto">
        <Box padding={2}>
          <Box textAlign="center" padding={4}>
            <Box marginBottom={4}>
              <Typography
                color="primary"
                variant="h3"
                style={{
                  fontWeight: "bold",
                  fontFamily:
                    "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  marginBottom: 4,
                  textDecoration: "none"
                }}
              >
                #{tag}
              </Typography>
            </Box>
            <Divider variant="middle" />
          </Box>
          <PostsGrid posts={posts} pathPrefix={pathPrefix} />
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ display: "block", marginTop: 32, marginBottom: 4 }}
          >
            Select page:
          </Typography>
          <Pagination
              count={Math.ceil(totalPages / resultsPerPage)}
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
  query($skip: Int!, $limit: Int!, $tag: String!) {
    site {
      siteMetadata {
        templates {
          posts {
            filters {
              tag {
                pathPrefix
                pagination {
                  resultsPerPage
                }
              }
            }
          }
        }
      }
    }
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/content/posts/" }
        frontmatter: { tags: { in: [$tag] } }
      }
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
