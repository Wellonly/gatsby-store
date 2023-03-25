import React, {Fragment} from "react";
import {
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

import useStyles from "./stylesProductView";
import ProductMedia from "./ProductMedia";
import ProductVariants from "./ProductVariants";
import ProductPrice from "./ProductPrice";
import ProductQuantity from "./ProductQuantity";

export default function ProductView({products, product, i18}) {
  const classes = useStyles();
  const { description, variant, images } = product;

  const hasVariants = products.length;
  return (
    <Fragment>
      <Card elevation={0} className={classes.root} variant="outlined" >
        <ProductMedia images={images}/>
        <CardContent className={classes.cardContent} >
          <Typography align="left" className={classes.productDescript}>
            {description}
          </Typography>
          <Typography align="left">
            {`${i18.variant}: ${variant}`}
          </Typography>
          {hasVariants > 1 && <ProductVariants products={products} current={product}/>}
          <ProductPrice {...product} i18={i18}/>
          <Typography align="left" className={classes.productQuantity}>
            {`${i18.quantity}:`}
          </Typography>
          <ProductQuantity product={product} i18={i18}/>
        </CardContent>
      </Card>
    </Fragment>
  );
};
