import React, { Fragment } from "react";
import {Box, CssBaseline} from "@material-ui/core";
import {graphql, StaticQuery} from "gatsby";

import Appbar from "./appbar/Appbar";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";
import {useHasScroll} from "../lib/useHasScroll";

export default function Layout(props) {
  const { children, ...other} = props;
  const hasScroll = useHasScroll();

  return (
    <StaticQuery
      query={graphql`
        {
          cms {
            toplinks: allLinks(filter: { priority_gt: 0, menu: "top" }) {
              ...linkFields
            }
            leftlinks: allLinks(filter: { priority_gt: 0, menu: "left" }) {
              ...linkFields
            }
            botlinks: allLinks(filter: { priority_gt: 0, menu: "bottom" }) {
              ...linkFields
            }
          }
        }
      `}
      render={({ cms: { toplinks, leftlinks, botlinks } }) => {
        return (
          <Fragment>
            <CssBaseline />
            <Appbar links={toplinks} elevation={hasScroll ? 11: 0}/>
            <Box flexGrow={1} marginX="auto" width="100%" maxWidth={Math.min(window.innerWidth, 999)} marginBottom={4} {...other}>
              {children}
            </Box>
            <Footer links={botlinks}/>
            {Array.isArray(leftlinks) && leftlinks.length && (
              <Sidebar links={leftlinks} />
            )}
          </Fragment>
        );
      }}
    />
  );
};
