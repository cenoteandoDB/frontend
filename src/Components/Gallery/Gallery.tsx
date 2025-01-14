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
import "./Gallery.css";
import { useChangeCenoteMainPhoto, useDeletePhoto } from "../../graphql/Cenotes/CenotesCustomHooks";
import { toast } from "react-toastify";
interface GalleryProps {
  photoData: string[];
  mainPhoto: string | undefined;
  cenoteId: string | undefined;
  refetchCenoteById: () => void;
}

const getRandomValue = (min: number, max: number): number => {
  return Math.random() < 0.5 ? min : max;
};

const usePhotoDimensions = (photoData: string[], mainPhoto: string | undefined): PhotoInterface[] => {
  const [photos, setPhotos] = useState<PhotoInterface[]>([]);

  useEffect(() => {
    const promises = photoData.map(
      (photo) =>
        new Promise<PhotoInterface>((resolve) => {
          const img = new Image();
          img.src = photo;
          img.onload = () => {
            resolve({
              id: photo,
              url: photo,
              src: photo,
              isMain: photo == mainPhoto,
              width: img.naturalWidth > 1080 ? getRandomValue(1000, 1080) : img.naturalWidth ,
              height: img.naturalHeight > 720 ? getRandomValue(720, 800) : img.naturalHeight,
            });
          };
        })
    );

    Promise.all(promises).then((photos) => setPhotos(photos));
  }, [photoData]);

  return photos;
};



export const Gallery:  React.FC<GalleryProps> = ({ photoData, mainPhoto, cenoteId, refetchCenoteById }) => {
  const photos = usePhotoDimensions(photoData, mainPhoto);
  const [index, setIndex] = useState(-1);
  const {changeMainPhoto, mainPhotoResult, mainPhotoLoading, mainPhotoError, mainPhotoSetResult } = useChangeCenoteMainPhoto();
  const {deleteOnePhoto,deletePhotoResult, deletePhotoLoading, deletePhotoError, deletePhotoSetResult } = useDeletePhoto();
 
  const handlechangeMainPhoto = async (photoId: string) => {
    try {
      if(cenoteId && photoId){
        await changeMainPhoto(cenoteId, photoId);
      }
    } catch (err) {
      console.error("Failed to change the main photo.");
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    try {
      if(cenoteId && photoId){
        await deleteOnePhoto(cenoteId, photoId);
        await refetchCenoteById();
      }
    } catch (err) {
      console.error("Failed to change the main photo.");
    }
  };

  // Handle MainPhoto success result
  useEffect(() => {
    if (mainPhotoResult) {
      toast.success('Foto principal actualizada exitosamente');
      mainPhotoSetResult(null); // Clear the result after processing
    }
  }, [mainPhotoResult, mainPhotoSetResult]);

  // Handle MainPhoto error
  useEffect(() => {
    if (mainPhotoError) {
      toast.error('Error al actualizar la foto principal');
      mainPhotoSetResult(null);
    }
  }, [mainPhotoError, mainPhotoSetResult]);

    // Handle DeletePhoto success result
    useEffect(() => {
      if (deletePhotoResult) {
        toast.success('Foto Eliminada exitosamente');
        refetchCenoteById();
        deletePhotoSetResult(null); // Clear the result after processing
      }
    }, [deletePhotoResult, deletePhotoSetResult]);
  
    // Handle DeletePhoto error
    useEffect(() => {
      if (deletePhotoError) {
        toast.error('Error al eliminar la foto principal');
        deletePhotoSetResult(null);
      }
    }, [deletePhotoError, deletePhotoSetResult]);


  return (
    <>
      <PhotoAlbum
        layout="rows"
        photos={photos}
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
        renderPhoto={({ photo, wrapperStyle, imageProps  }) => (
          <div style={{ ...wrapperStyle, position: "relative" }}>
            {/* Render the photo */}
            <img {...imageProps} alt={photo.id} className="img-fluid" />

            {/* Custom Button Overlay */}
            {photo.isMain ? 
            (
              <a className="position-absolute position-icon-left image-buttons-profile">
                <img src="/assets/Icons/gold_star.svg" alt="" />
              </a>
            ):(
              <button  className="position-absolute position-icon-left image-buttons-profile"  onClick={() => handlechangeMainPhoto(photo.id)} disabled={mainPhotoLoading}>
                <img src="/assets/Icons/fav_star.svg" alt="" />
              </button >
            )}

            <button className="position-absolute position-icon-right image-buttons-profile"  onClick={() => handleDeletePhoto(photo.id)} disabled={deletePhotoLoading}>
              <img src="/assets/Icons/trash.svg" alt="" />
            </button>
            
          </div>
        )}



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
