import React, {Fragment, useState} from "react";
import {
  Card, CardMedia,
  GridList,
  GridListTile,
} from "@material-ui/core";

import {mediaPathBrowser} from "../../lib/mediaBrowser";
import useStyles from "./stylesProductMedia";

export default function ProductMedia({images}) {
  const imgs = images.split(',');
  const classes = useStyles();
  const [currImage, setCurrImage] = useState(0);
  const [savedImages, saveImages] = useState(images);
  if (savedImages !== images) {
    // console.log('...zv: images changed:', savedImages, ' to ', images);
    setCurrImage(0);
    saveImages(images);
    return <Fragment/>;
  }
  return (
    <Card elevation={0} className={classes.rootProductMedia} variant="outlined" >
      <CardMedia
        className={classes.cover}
        image={mediaPathBrowser(imgs[currImage])}
        title={imgs[currImage].split('.')[0]}
      />
      <GridList className={classes.gridList} cols={7} cellHeight={70} spacing={10}>
        {imgs.map((image, i) => {
          const imageSource = mediaPathBrowser(image);
          return (
            <GridListTile key={i} onClick={() => setCurrImage(i)}>
              <img src={imageSource} alt={image.split('.')[0]} className={i === currImage ? classes.imageWborder: classes.imageWOborder}/>
            </GridListTile>
          );
        })}
      </GridList>
    </Card>
  );
}

/*

 */