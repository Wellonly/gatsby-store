import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => {
  return ({
    root: {
      display: 'flex',
    },
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
    },
    cover: {
      width: 512,
      height: 512,
    },
    article: {
      lineHeight: 1.6,
      fontFamily: "Merriweather, Georgia, serif",
      fontSize: "1.1rem",
      "& blockquote": {
        borderLeft: "3px solid #303032",
        marginLeft: -16,
        paddingLeft: 13,
        fontStyle: "italic"
      }
    },
  });
});
