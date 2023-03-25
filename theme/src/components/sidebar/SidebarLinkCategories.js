import React from 'react';
import {graphql, StaticQuery} from "gatsby";
import SidebarLink from "./SidebarLink";

export default function SidebarLinkCategories(props) {
  const { location, isSidebarOpened, item } = props;
  return (
    <StaticQuery
      query={graphql`
            {
              cms {
                allCategories(filter: { priority_gt: 0 }) {
                  id
                  label: name
                  slug
                }
              }
            }
          `}
      render={({ cms: { allCategories } }) => {
        item.sublinks = allCategories;
        return (
          <SidebarLink
            key={item.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            item={item}
          />
        );
      }}
    />
  );
};
