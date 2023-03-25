import React from 'react';
import {graphql, StaticQuery} from "gatsby";
import SidebarLink from "./SidebarLink";

export default function SidebarLinkCollections(props) {
  const { location, isSidebarOpened, item } = props;
  return (
    <StaticQuery
      query={graphql`
            {
              cms {
                allCollections(filter: { priority_gt: 0 }) {
                  id
                  label: name
                  slug
                }
              }
            }
          `}
      render={({ cms: { allCollections } }) => {
        item.sublinks = allCollections;
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
