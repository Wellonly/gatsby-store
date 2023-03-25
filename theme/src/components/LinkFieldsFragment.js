import React, {Fragment} from "react"
import { graphql } from "gatsby"

export default () => {
  return (<Fragment/>);
};

export const query = graphql`
  fragment linkFields on CMS_Link {
    id
    priority
    label
    slug
    icon
    component
    sublinks: Sublinks(filter: {priority_gt: 0}) {
      id
      link_id
      priority
      label
      slug
      icon
      component
    }
  }
`;