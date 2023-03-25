import {Grid} from "@material-ui/core";
import ProductCard from "./ProductCard";
import React from "react";

export default function ProductGrid({ products }) {
  return (
    <Grid container spacing={3}>
      {products.map((prod, ip) => {
          return (
            <Grid item xs={12} sm={4} key={ip}>
              <ProductCard product={prod}/>
            </Grid>
          );
        }
      )}
    </Grid>
  );
};
