import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "gatsby-image";
import { Link } from "gatsby";
import { makeProductSlug } from '../lib/slug';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 999,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 999,
        overflow: 'hidden',
        width: '100%',
    },
}));

export default function Carousel({products}) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = Array.isArray(products) ? products.length: 0;

  const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
      setActiveStep(step);
  };

  return maxSteps ? (
      <div className={classes.root}>
          <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
          >
              {products.map((prod, i) => {
                const { title, imageFile } = prod;
                  // const { title, imageFile: { childImageSharp: { fluid, fluid: {presentationWidth} } } } = prod;
                let imgProps = {style: {
                    maxWidth: (imageFile && imageFile.childImageSharp.fluid.presentationWidth) || 0,
                    margin: "0 auto", // Used to center the image
                  }
                };
                return (
                  <Link key={`carousel${i}` } to={makeProductSlug(prod)} state={{productId: prod.id}}>
                    <Paper square elevation={0} className={classes.header}>
                      <Typography>{title}</Typography>
                    </Paper>
                    {imageFile && <Image {...imgProps} className={classes.img} fluid={imageFile.childImageSharp.fluid} />}
                  </Link>
                );
              })}
          </AutoPlaySwipeableViews>
          <MobileStepper
              steps={maxSteps}
              position="static"
              variant="dots"
              activeStep={activeStep}
              nextButton={
                  <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                      Next
                      {theme.direction === 'rtl' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
                  </Button>
              }
              backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                      {theme.direction === 'rtl' ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
                      Back
                  </Button>
              }
          />
      </div>
  ): (<div/>);
}

/*
          <Paper square elevation={0} className={classes.header}>
              <Typography>{products[activeStep].title}</Typography>
          </Paper>

 */

/*
    <img className={classes.img} src={prod.imageFile.childImageSharp.fixed} alt={prod.title} />
 */
