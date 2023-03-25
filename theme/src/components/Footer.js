import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Link from "../components/Link";
import {makeLinkSlug} from "../lib/slug";

const useStyles = makeStyles(theme => ({
  footer: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[900],
    "& a": {
      color: theme.palette.grey[300],
      textDecoration: "none",
      fontSize: ".9rem"
    },
    "& a:hover": {
      textDecoration: "underline"
    },
    "& ul": {
      padding: 0,
      listStyle: "none"
    },
    "& li": {
      marginBottom: theme.spacing(0.5)
    }
  }
}));

const FooterColumns = ({ links }) => {
  return (
    <Grid container spacing={2}>
      {links.map(link => {
        return (
          <Grid xs={12} sm={4} item key={link.label}>
            <Link to={makeLinkSlug(link.slug)}>
              <Typography style={{ fontWeight: "bold" }}>
                {link.label}
              </Typography>
            </Link>
            <ul>
              {link.sublinks && link.sublinks.map(({label, slug}) => {
                return (
                  <li key={label}>
                    <Link to={makeLinkSlug(slug, link.slug)}>{label}</Link>
                  </li>
                );
              })}
            </ul>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default function Footer({links}) {
  const classes = useStyles();

  const {location} = window;
  return (
    <Box component="footer" className={classes.footer}>
      <Container maxWidth="md">
        <Box padding={4}>
          <FooterColumns links={links} />
          <Box textAlign="center" marginTop={2}>
            <Typography variant="caption">
              &copy; {new Date().getFullYear()} {(location && location.host) || 'ipv'.concat('soft.').concat('com')}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
