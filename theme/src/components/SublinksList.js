import React/*, { Fragment }*/ from 'react';
import { makeStyles/*, useTheme */} from '@material-ui/core/styles';
import { Link } from "gatsby";
import { makeLinkSlug } from '../lib/slug';
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 999,
    flexGrow: 1,
  },
}));

export default function SublinksList({sublinks, parentLink}) {

  const classes = useStyles();
  // const theme = useTheme();
  const collLength = Array.isArray(sublinks) ? sublinks.length : 0;

  return collLength ? sublinks.map((sublink, i) => {
      const {label, slug} = sublink;
      return (
        <Box key={i} >
          <Link to={makeLinkSlug(slug, parentLink && parentLink.slug)}>
            <h2 className={classes.root}>{label}</h2>
          </Link>
        </Box>
      );
  }): (<div/>);
};
