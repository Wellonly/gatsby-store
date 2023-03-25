import React from "react";
import { Link } from "gatsby";
import {
  GridList,
  GridListTile,
  Tooltip,
} from "@material-ui/core";

import {makeProductSlug} from "../../lib/slug";
import useStyles from "./stylesProductVariants";
import {mediaPathBrowser} from "../../lib/mediaBrowser";

export default function ProductVariants({products, current}) {
  const classes = useStyles({width: 70*products.length});
  const { id } = current;

  return (
    <div className={classes.root} >
      <GridList className={classes.gridList} cols={products.length} cellHeight={70} spacing={10}>
        {products.map((prod) => {
          const iname = prod.images.split(',')[0];
          const imageSource = mediaPathBrowser(iname);
          return (
            <Tooltip key={prod.id} title={prod.variant} arrow>
              <GridListTile component={Link} to={makeProductSlug(prod)} state={{productId: prod.id}}>
                  <img src={imageSource} alt={prod.title} className={prod.id === id ? classes.imageWborder: classes.imageWOborder}/>
              </GridListTile>
            </Tooltip>
          );
        })}
      </GridList>
    </div>
  );
};
