import React, { ChangeEvent, useEffect, useState } from 'react'
import { SingleModalPropsInterface } from '../../Types/UtilsTypes'
import { CreateReferencesInterface } from '../../Types/ReferencesTypes'
import { useCreateReference, useReferenceType } from '../../graphql/References/ReferencesCustomHooks'
import { toast } from 'react-toastify'
import { EnumsInterface, PaginationInterface, SortInterface } from '../../Types/UserTypes'
import { useCenotes } from '../../graphql/Cenotes/CenotesCustomHooks'
import { CenoteInterface } from '../../Types/CenotesTypes'

export const CreateReference: React.FC<SingleModalPropsInterface> = ({showModal, handleToggleModal, refetch}) => {
    const initialPagination: PaginationInterface = { limit: 15, offset: 0 };
    const initialSort: SortInterface = { sortOrder: "ASC", field: "name" };
    const initialReferenceForm: CreateReferencesInterface = {
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
        validated_mendeley: false
    }
    const {referenceTypeData, referenceTypeLoading} = useReferenceType();
    const {createReference, success, error, loading, setSuccess} = useCreateReference();
    const { cenotesData, cenotesError, cenotesLoading, searchCenoteByName } = useCenotes(initialPagination, initialSort);
    const [ isFormValid, setIsFormValid] = useState(false);
    const [ referenceFormData, setReferenceFormData] = useState<CreateReferencesInterface>(initialReferenceForm);
    const [authorInput, setAuthorInput] = useState('');
    const [keywordsInput, setKeywordsInput] = useState('');
    const [cenoteInput, setCenoteInput] = useState('');
    const [selectedCenotes, setSelectedCenotes] = useState<CenoteInterface[]>([]);
  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value , type} = e.target;
        console.log( type)
        if(type == 'number'){
            setReferenceFormData((prevState) => ({
                ...prevState,
                [name]: parseInt(value),
              }));
        } else {
            setReferenceFormData((prevState) => ({
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
        setReferenceFormData(prevState => ({
            ...prevState,
            authors: [...prevState.authors, authorInput.trim()],
        }));
        setAuthorInput('');
    };

    const handleRemoveAuthor = (index: number) => {
        setReferenceFormData(prevState => ({
            ...prevState,
            authors: prevState.authors.filter((_, i) => i !== index),
        }));
    };

    const handleAddKeyword = () => {
        if (keywordsInput.trim() === '') {
            toast.error('La palabra clave no puede estar vacío.');
            return;
        }
        setReferenceFormData(prevState => ({
            ...prevState,
            keywords: [...prevState.keywords, keywordsInput.trim()],
        }));
        setKeywordsInput('');
    };

    const handleRemoveKeyword = (index: number) => {
        setReferenceFormData(prevState => ({
            ...prevState,
            keywords: prevState.keywords.filter((_, i) => i !== index),
        }));
    };

    const handleAddCenote = (cenote: CenoteInterface, firestore_id: string | undefined) => {
        if(firestore_id){
            setReferenceFormData((prevState) => ({
                ...prevState,
                referenced_cenotes: [...prevState.referenced_cenotes, firestore_id],
              }));
              setSelectedCenotes((prevCenotes) => [...prevCenotes, cenote]);
              setCenoteInput('');
        }
      
      };

    const handleRemoveCenote = (id: string | undefined) => {
        setReferenceFormData((prevState) => ({
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        createReference(referenceFormData);
    };

    useEffect(() => {
        if (error) {
            toast.error('La operación no se pudo completar, inténtelo nuevamente.')
            if (handleToggleModal) {
            handleToggleModal();
            }
        }
        if (success) {
            toast.success("Operación exitosa");
            if(refetch){
                refetch()
            }
            if (handleToggleModal) {
                handleToggleModal();
            }
            setReferenceFormData(initialReferenceForm);
            setSuccess(false);
        }
    }, [error, success]);

    useEffect(() => {
        if (!referenceTypeLoading && referenceTypeData && referenceTypeData.length > 0) {
            setReferenceFormData(prev => ({ ...prev, type: referenceTypeData[0].name }));
        }
    }, [referenceTypeLoading, referenceTypeData]);
    
    /*useEffect(() => {
        const nonRequiredFields = ['touristic']; // List of non-required fields
        const isFormFilled = Object.entries(referenceFormData).every(([key, value]) => 
            nonRequiredFields.includes(key) || value
        );
        setIsFormValid(isFormFilled);
    }, [referenceFormData]);*/


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
                    <h4 className="modal-title-c">Crear Referencia</h4>
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
                                value={referenceFormData.title}
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
                                value={referenceFormData.short_name}
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
                                value={referenceFormData.institution}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="modal-label-c">Tipo</label>
                                <select 
                                name="type"
                                className="form-control"
                                value={referenceFormData.type}
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
                                value={referenceFormData.journal_name}
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
                                value={referenceFormData.book}
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
                                value={referenceFormData.pages}
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
                                value={referenceFormData.date_primary}
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
                                value={referenceFormData.doi}
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
                                value={referenceFormData.url}
                                onChange={handleChange}
                                
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label className="modal-label-c" htmlFor="authors">
                                    Autors: 
                                </label>
                                {referenceFormData.authors.map((author, index) => (
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
                                {referenceFormData.keywords.map((keyword, index) => (
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
