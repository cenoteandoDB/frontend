import { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { PhotoInterface } from "../../Types/UtilsTypes";

interface GalleryProps {
  photoUrls: string[];
}



const getRandomValue = (min: number, max: number): number => {
  return Math.random() < 0.5 ? min : max;
};

const usePhotoDimensions = (photoUrls: string[]): PhotoInterface[] => {
  const [photos, setPhotos] = useState<PhotoInterface[]>([]);

  useEffect(() => {
    const promises = photoUrls.map(
      (url) =>
        new Promise<PhotoInterface>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            resolve({
              src: url,
              width: img.naturalWidth > 1080 ? getRandomValue(1000, 1080) : img.naturalWidth ,
              height: img.naturalHeight > 720 ? getRandomValue(720, 800) : img.naturalHeight,
            });
          };
        })
    );

    Promise.all(promises).then((photos) => setPhotos(photos));
  }, [photoUrls]);

  return photos;
};

export const Gallery:  React.FC<GalleryProps> = ({ photoUrls }) => {
  const [index, setIndex] = useState(-1);
  //const photos = convertToPhotoObjects(photoUrls);
  const photos = usePhotoDimensions(photoUrls);
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
