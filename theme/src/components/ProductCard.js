import React from "react";
import Img from "gatsby-image";
import { navigate } from "gatsby";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {makeProductSlug} from "../lib/slug";

const useStyles = makeStyles((theme) => ({
  cardActions: {
    justifyContent: "flex-end"
  },
  card: {
    background: "transparent"
  },
  highPrice: {
    textDecoration: "line-through",
    // color: theme.palette.text.secondary,
  },
  cardContent: {
    padding: 12
  }
}));

export default function ProductCard({product}) {
  const classes = useStyles();
  const { title, description, price, highprice, imageFile } = product;

  return (
      <Card elevation={0} classes={{ root: classes.card }} variant="outlined" >
        <CardActionArea onClick={() => navigate(makeProductSlug(product), {state:{productId: product.id}})}>
          <CardContent classes={{ root: classes.cardContent }} >
            {imageFile &&
              <Img
                fluid={imageFile.childImageSharp.fluid}
                alt={title}
                title={description}
                style={{ borderRadius: 2 }}
              />
            }
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography
                variant="h5"
                color="textPrimary"
                component="p"
                display="inline"
                // style={{ fontFamily: "Merriweather, Georgia, serif" }}
            >
              {price}{"₽"/*Ruble unicode Character: ₽ U+20BD*/}
            </Typography>
            <Typography display="inline" component="div" style={{padding: "10px"}}/>
            {price < highprice &&
              <Typography
                  classes={{ root: classes.highPrice }}
                  variant="h6"
                  component="p"
                  display="inline"
                  align="justify"
                  color="textSecondary"
                  // style={{fontStyle: "italic"*/}}
              >
                {"―"}{highprice}{"₽―"/*unicode Character: ― U+2015 Name: HORIZONTAL BAR*/}
              </Typography>
            }
          </CardContent>
        </CardActionArea>
      </Card>
  );
};

