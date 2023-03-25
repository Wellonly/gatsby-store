import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from "gatsby"; // import Link from '@material-ui/core/Link';

import { MdHome, MdCollections, MdList /*, MdGrain*/ } from "react-icons/md";
// import { MdWhatshot } from "react-icons/md";


const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    marginTop: theme.spacing(0.5),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function IconBreadcrumbs({ links, text }) {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" key={'gohome'} to={'/'}>
        <MdHome className={classes.icon} />
        {" "/*(process.cfg && process.cfg.siteTitle) || ''*/}
      </Link>
      {Array.isArray(links) && links.map(({name, link}, i) => (
        <Link color="inherit" key={`breadc${i}` } to={link}>
          {link==='/collections' && <MdCollections className={classes.icon}/>}
          {link==='/categories' && <MdList className={classes.icon}/>}
          {name}
        </Link>
      ))}
      <Typography color="textPrimary" className={classes.link}>
        {text}
      </Typography>
    </Breadcrumbs>
  );
}

