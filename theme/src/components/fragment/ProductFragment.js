import React, {Fragment} from "react"
import { graphql } from "gatsby"

export default function ProductFragment() {
  return (<Fragment/>);
};

export const query = graphql`
  fragment productFields on CMS_Product {
    id
    sku
    title
    slug
    variant
    highprice
    price
    optprice
    optfrom
    video
    description
    stock
    weight
    length
    width
    height
    spec
    artimages
    article
    Category {
      id
      name
      slug
    }
    Collections {
      id
      name
    }
    Reviews {
      id
      status
      rating
      comment
    }
    images
    imageFile {
      childImageSharp {
        fluid(maxWidth: 999, quality: 100) {
          ...GatsbyImageSharpFluid
          presentationWidth
        }
      }
    }
    mdx {
      body
    }
  }
`;