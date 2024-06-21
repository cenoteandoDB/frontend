import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const photos = [
  {
    src: "https://assets.turismocity.com/cdn-cgi/image/format=auto,width=500,height=440,fit=cover/cenote%20-%20ik%20kil.jpg",
    width: 1080,
    height: 800,
  },
  {
    src: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2023/04/homun29.jpg",
    width: 1080,
    height: 1620,
  },
  {
    src: "https://static-resources.mirai.com/wp-content/uploads/sites/1738/20220912090223/Cenote-Ik-Kil.jpg",
    width: 1080,
    height: 720,
  },
  {
    src: "https://www.lavanguardia.com/files/image_449_220/files/fp/uploads/2023/03/06/6406045a7c705.r_d.1010-805-2457.jpeg",
    width: 1080,
    height: 721,
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5vYZTSuhjRlhoo6a5WgsMTGNAlhJYDjWdMU1N6y22CQ&s",
    width: 1080,
    height: 1620,
  },
];

export const Gallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <PhotoAlbum
        layout="rows"
        photos={photos}
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
};
