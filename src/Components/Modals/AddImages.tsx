import React, { ChangeEvent, useState } from 'react'
import { UpdatePropsInterface } from '../../Types/UtilsTypes'
import { useGetUploadImageUrl } from '../../graphql/Cenotes/CenotesCustomHooks';
import { toast } from "react-toastify";
import axios from 'axios';


export const AddImages: React.FC<UpdatePropsInterface> = ({id, showModal, handleToggleModal, refetch }) => {
    const [file, setFile] = useState<File | null>(null);
    const [photoName, setPhotoName] = useState<string | null>(null);
    const { urlData, urlLoading, urlError, refetchUrl } = useGetUploadImageUrl(id, photoName ?? '');
    
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files ? event.target.files[0] : null;
      if (selectedFile) {
        const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const fileName = selectedFile.name.toLowerCase(); 
        const hasValidExtension = validImageExtensions.some(ext => fileName.endsWith(ext));
        if (hasValidExtension) {
            setPhotoName(fileName); 
            setFile(selectedFile);
            if (id) {
              refetchUrl(); 
            }
          } else {
            toast.warning('Seleccione un archivo de imagen válido (por ejemplo, .jpg, .png, .gif, .jpeg).')
          }
      }
    };
  
    const handleUpload = async () => {
        if (!file || !urlData) return;
      
        try {
          const response = await axios.put(urlData, file, {
            headers: {
              'Content-Type': "application/octet-stream",
            },
          });
          if (refetch) refetch();
          if (handleToggleModal) handleToggleModal();
          setPhotoName(null);
          setFile(null);
          toast.success('Imagen ha cargado exitosamente')
          console.log('File uploaded successfully', response);
        } catch (error) {
          console.error('Error uploading file', error);
          if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            console.error('Error headers:', error.response?.headers);
          }
        }
      };
  
    if (urlLoading) return <p>Loading...</p>;
    if (urlError) return <p>Error fetching upload URL: {urlError.message}</p>;


  return (
    <div>
    {showModal && (
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="modal-add-image"
        style={{ paddingRight: 22, display: "block" }}
        aria-modal="true"
        role="dialog"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title-c">Subir Imagen</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleToggleModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className='modal-body'>
                <input type="file" onChange={handleFileChange} />
                <p>{urlData?.url}</p>
                <button onClick={handleUpload} disabled={!urlData}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}
