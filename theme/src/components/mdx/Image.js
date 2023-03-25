import React from "react";
import {mediaPathBrowser} from "../../lib/mediaBrowser";

export function Image({src, ...rest}) {
  const windowInnerWidth = window.innerWidth;
  const defaultWidth = Math.min(999, windowInnerWidth-15);
  return (
      <img
        alt={src.split('.')[0]}
        src={mediaPathBrowser(src)}
        width={defaultWidth}
        {...rest}
      />
  );
}