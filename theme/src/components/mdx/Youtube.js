import React from "react";

export function Youtube(props) {

  // from allow removed "autoplay"
  return (
    <iframe
      title="youtube"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/75p6DZ5lCNQ"
      frameBorder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...props}
    >
    </iframe>
  );
}
