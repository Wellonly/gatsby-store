import React from "react";

export function Map(props) {

  return (
      <iframe
        title="Map"
        width="425"
        height="350"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        style={{border: "1px solid black"}}
        src="https://www.openstreetmap.org/export/embed.html?bbox=41.97341680526734%2C45.03403240948681%2C42.00708389282227%2C45.04640477373883&amp;layer=mapnik&amp;marker=45.0402189260407%2C41.9902503490448"
        {...props}
      >
      </iframe>
  );
}

/*
    <br/>
    <a href="https://www.openstreetmap.org/?mlat=45.0402&amp;mlon=41.9903#map=16/45.0402/41.9903">
      View Larger Map
    </a>
 */