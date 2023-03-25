import React, {Fragment} from "react";
import LinkFragment from './LinkFragment';
import ProductFragment from './ProductFragment';

export default function GraphqlFragments() {
  return (
    <Fragment>
      <LinkFragment/>
      <ProductFragment/>
    </Fragment>
  );
};
