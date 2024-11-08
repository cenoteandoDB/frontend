import React, { ChangeEvent, useEffect, useState } from 'react'
import { UpdatePropsInterface } from '../../Types/UtilsTypes'
import { UpdateReferencesInterface } from '../../Types/ReferencesTypes';
import { EnumsInterface, PaginationInterface, SortInterface } from '../../Types/UserTypes';
import { useGetReferenceById, useReferenceType, useUpdateReference } from '../../graphql/References/ReferencesCustomHooks';
import { toast } from 'react-toastify';
import { CenoteInterface } from '../../Types/CenotesTypes';
import { useCenotes } from '../../graphql/Cenotes/CenotesCustomHooks';
import { removeTypenameFromObject } from '../../Services/UtilsService';

export const UpdateReference: React.FC<UpdatePropsInterface> = ({id, showModal, handleToggleModal, refetch }) => {
  const initialPagination: PaginationInterface = { limit: 15, offset: 0 };
  const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
  const initialReferenceForm: UpdateReferencesInterface = {
      type: "",
      title: "",
      short_name: "",
      date_primary: 0,
      journal_name: "",
      institution: "",
      book: "",
      pages: "",
      doi: "",
      url: "",
      authors: [],
      keywords: [],
      referenced_cenotes: [],
      referenced_species: [],
      mendeley_ref: false,
      has_pdf: false,
      uploaded_dropbox: false,
      uploaded_gcp: false,
      uploaded_mendeley: false,
      validated_mendeley: false,
      unique_code: ""
  }

  const { data, loading, error, updateReference } = useUpdateReference();
  const { referenceData, loadingData, errorData, refetchReferenceById } = useGetReferenceById(id);
  const { cenotesData, cenotesError, cenotesLoading, searchCenoteByName } = useCenotes(initialPagination, initialSort);
  const [ referenceInfo, setReferenceInfo] = useState<UpdateReferencesInterface>(initialReferenceForm);
  const {referenceTypeData} = useReferenceType();

  const [authorInput, setAuthorInput] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [cenoteInput, setCenoteInput] = useState('');
  const [selectedCenotes, setSelectedCenotes] = useState<CenoteInterface[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value , type} = e.target;
        if(type == 'number'){
            setReferenceInfo((prevState) => ({
                ...prevState,
                [name]: parseInt(value),
            }));
        } else {
        setReferenceInfo((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleAddAuthor = () => {
        if (authorInput.trim() === '') {
            toast.error('El nombre del autor no puede estar vacío.');
            return;
        }
        setReferenceInfo(prevState => ({
            ...prevState,
            authors: [...prevState.authors, authorInput.trim()],
        }));
        setAuthorInput('');
    };

    const handleRemoveAuthor = (index: number) => {
        setReferenceInfo(prevState => ({
            ...prevState,
            authors: prevState.authors.filter((_, i) => i !== index),
        }));
    };

    const handleAddKeyword = () => {
        if (keywordsInput.trim() === '') {
            toast.error('La palabra clave no puede estar vacío.');
            return;
        }
        setReferenceInfo(prevState => ({
            ...prevState,
            keywords: [...prevState.keywords, keywordsInput.trim()],
        }));
        setKeywordsInput('');
    };

    const handleRemoveKeyword = (index: number) => {
        setReferenceInfo(prevState => ({
            ...prevState,
            keywords: prevState.keywords.filter((_, i) => i !== index),
        }));
    };

  const handleAddCenote = (cenote: CenoteInterface, firestore_id: string | undefined) => {
    if(firestore_id){
        setReferenceInfo((prevState) => ({
            ...prevState,
            referenced_cenotes: [...prevState.referenced_cenotes, firestore_id],
          }));
          setSelectedCenotes((prevCenotes) => [...prevCenotes, cenote]);
          setCenoteInput('');
    }
  };

  const handleRemoveCenote = (id: string | undefined) => {
      setReferenceInfo((prevState) => ({
          ...prevState,
          referenced_cenotes: prevState.referenced_cenotes.filter((cenoteId) => cenoteId !== id),
      }));
      setSelectedCenotes((prevCenotes) => prevCenotes.filter((cenote) => cenote.firestore_id !== id));
  };

  const handleCenoteInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCenoteInput(value);
      searchCenoteByName(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(id) {

        const sanitizedData = removeTypenameFromObject(referenceInfo);
        await updateReference(id, sanitizedData);
    }
  };
  
  useEffect(() => {
    if (referenceData && !loadingData) {
        setReferenceInfo(referenceData); //check
    } else {
      setReferenceInfo(initialReferenceForm);
    }
    if(errorData){
        toast.error('El registro no existe o no tiene un identificador')
        setReferenceInfo(initialReferenceForm);
    }
  }, [referenceData, errorData]);

  useEffect(() => {
      if (error) {
        const errorMessage = error.graphQLErrors?.[0]?.message || 'La operación no se pudo completar, inténtelo nuevamente.';
        toast.error(errorMessage);
        if (handleToggleModal) {
          handleToggleModal();
        }
      }
      if(data && !error){
        toast.success('Registro Actualizado Exitosamente');
        if (handleToggleModal) handleToggleModal();
        if (refetch) refetch();
        if (refetchReferenceById) refetchReferenceById(); 
        setReferenceInfo(initialReferenceForm);
      } 
  }, [data, error])

  return (
    <div>
        {showModal && (
        <div
            className={`modal fade ${showModal ? "show" : ""}`}
            id="modal-create-cenote"
            style={{ paddingRight: 22, display: "block" }}
            aria-modal="true"
            role="dialog"
            data-backdrop="static"
        >
            <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                <h4 className="modal-title-c">Actualizar Referencia</h4>
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
                <form onSubmit={evt => handleSubmit(evt)}>
                <div className="modal-body">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label className="modal-label-c" htmlFor="exampleInputPassword1">
                                Título
                            </label>
                            <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={referenceInfo.title}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="modal-label-c" htmlFor="state">
                                Título Corto
                            </label>
                            <input
                            type="text"
                            name="short_name"
                            className="form-control"
                            value={referenceInfo.short_name}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="modal-label-c" htmlFor="municipality">
                                Institución
                            </label>
                            <input
                            type="text"
                            name="institution"
                            className="form-control"
                            value={referenceInfo.institution}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="modal-label-c">Tipo</label>
                            <select 
                            name="type"
                            className="form-control"
                            value={referenceInfo.type}
                            onChange={handleChange}>
                            {referenceTypeData && referenceTypeData.map((item: EnumsInterface) => (
                                <option key={item.name}  value={item.name}>{item.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="latitude">
                                Nombre Revista
                            </label>
                            <input
                            type="text"
                            name="journal_name"
                            className="form-control"
                            value={referenceInfo.journal_name}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="longitude">
                                Libro
                            </label>
                            <input
                            type="text"
                            name="book"
                            className="form-control"
                            value={referenceInfo.book}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="longitude">
                                Páginas
                            </label>
                            <input
                            type="text"
                            name="pages"
                            className="form-control"
                            value={referenceInfo.pages}
                            onChange={handleChange}
                            
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="anio">
                                Año
                            </label>
                            <input
                            type="number"
                            name="date_primary"
                            className="form-control"
                            value={referenceInfo.date_primary}
                            onChange={handleChange}
                            
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="doi">
                                DOI
                            </label>
                            <input
                            type="text"
                            name="doi"
                            className="form-control"
                            value={referenceInfo.doi}
                            onChange={handleChange}
                            
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="url">
                                URL
                            </label>
                            <input
                            type="text"
                            name="url"
                            className="form-control"
                            value={referenceInfo.url}
                            onChange={handleChange}
                            
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="authors">
                                Autors: 
                            </label>
                            {referenceInfo.authors.map((author, index) => (
                                <li className="badge badge-primary mr-1" key={index}>
                                    {author}
                                    <a onClick={() => handleRemoveAuthor(index)}>
                                        <i className="fa fa-window-close ml-1"></i>
                                    </a>
                                </li>
                            ))}
                            <input
                            type="text"
                            name="authors"
                            className="form-control"
                            value={authorInput}
                            onChange={(e) => setAuthorInput(e.target.value)}
              
                            />
                            <button className="btn btn-info float-left btn-xs mt-1" type="button" onClick={handleAddAuthor}>
                                <i className='fa fa-plus'></i> Agregar Autor
                            </button>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="keywords">
                                Keywords: 
                            </label>
                            {referenceInfo.keywords.map((keyword, index) => (
                                <li className="badge badge-primary mr-1" key={index}>
                                    {keyword}
                                    <a onClick={() => handleRemoveKeyword(index)}>
                                        <i className="fa fa-window-close ml-1"></i>
                                    </a>
                                </li>
                            ))}
                            <input
                            type="text"
                            name="keywords"
                            className="form-control"
                            value={keywordsInput}
                            onChange={(e) => setKeywordsInput(e.target.value)}

                            />
                            <button className="btn btn-info float-left btn-xs mt-1" type="button" onClick={handleAddKeyword}>
                                <i className='fa fa-plus'></i> Agregar Keyword
                            </button>
                            
                        </div>
                        {/* CENOTES REFERENCE */}
                        <div className="form-group col-md-4">
                            <label className="modal-label-c" htmlFor="referenced_cenotes">
                              Cenotes: 
                            </label>
                            {selectedCenotes.map((cenote) => (
                                <li className="badge badge-primary mr-1" key={cenote.firestore_id}>
                                    {cenote.name}
                                    <a onClick={() => handleRemoveCenote(cenote.firestore_id)}>
                                        <i className="fa fa-window-close ml-1"></i>
                                    </a>
                                </li>
                            ))}
                            <input
                            type="text"
                            name="referenced_cenotes"
                            className="form-control"
                            value={cenoteInput}
                            onChange={handleCenoteInputChange}
                            />
                            {cenoteInput && (
                                <>
                                    {cenotesLoading && <p>Loading cenotes...</p>}
                                    {cenotesError && <p>Error loading cenotes: {cenotesError.message}</p>}
                                    <ul className="list-group">
                                        {cenotesData.map((cenote: CenoteInterface) => (
                                            <li className="list-group-item" key={cenote.firestore_id}>
                                            {cenote.name}
                                            <a className="badge badge-primary badge-pill ml-2" onClick={() => handleAddCenote(cenote, cenote.firestore_id)}> <i className='fa fa-plus'></i> </a>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="modal-footer justify-content-between">
                    <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={handleToggleModal}
                    >
                    Cerrar
                    </button>
                    <button  type="submit"  disabled={ loading} className="btn btn-primary">
                    Guardar
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        )}
    </div>
  )
}
