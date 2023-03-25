import React/*, { Fragment }*/ from 'react';
import { makeStyles/*, useTheme */} from '@material-ui/core/styles';
import { Link } from "gatsby";
import { makeCategorySlug } from '../lib/slug';
import ProductGrid from "./ProductGrid";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 999,
    flexGrow: 1,
  },
}));

export default function CategoriesList({categories}) {

  const classes = useStyles();
  // const theme = useTheme();
  const collLength = Array.isArray(categories) ? categories.length : 0;

  return collLength ? categories.map((category, i) => {
      const {products, name} = category;
      return (Array.isArray(products) && products.length) ? (
        <Box key={`cat${i}:${name}`} >
          <Link to={makeCategorySlug(category)}>
            <h2 className={classes.root}>{name}</h2>
          </Link>
          <ProductGrid products={ products }/>
          <br/>
        </Box>
      ): (<Box key={`cat${i}:empty`}/>);
  }): (<div/>);
};
