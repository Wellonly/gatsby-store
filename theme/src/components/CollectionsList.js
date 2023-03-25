import React /*, { Fragment }*/ from 'react';
import { makeStyles/*, useTheme */} from '@material-ui/core/styles';
import { Link } from "gatsby";
import { makeCollectionSlug } from '../lib/slug';
import ProductGrid from "./ProductGrid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 999,
    flexGrow: 1,
  },
}));

export default function CollectionsList({collections}) {

  const classes = useStyles();
  // const theme = useTheme();
  const collLength = Array.isArray(collections) ? collections.length : 0;

  return collLength ? collections.map((coll, i) => {
      const {products, name} = coll;
      return (Array.isArray(products) && products.length) ? (
        <div key={`coll${i}:${name}`} >
          <Link to={makeCollectionSlug(coll)}>
            <h2 className={classes.root}>{name}</h2>
          </Link>
          <ProductGrid products={ products }/>
          <br/>
        </div>
      ): (<div key={`coll${i}:empty`}/>);
  }): (<div/>);
};
