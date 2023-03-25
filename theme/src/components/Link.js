import React, {Fragment} from "react";
import { Link } from "gatsby";

export default function FooterLink({ to, children }) {
  // no link on empty 'to' prop! Open external links in a new browser tab and internal links using Gatsby's router.
  return !to ? (
            <Fragment>{children}</Fragment>
          ): to.startsWith("http") ? (
            <a href={to} rel="noopener noreferrer" target="_blank">
              {children}
            </a>
          ) : (
            <Link to={to}>{children}</Link>
          );
};
