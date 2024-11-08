import React, { useEffect, useState } from "react";
import { useAcceptMofRequest, useGetMofModifications, useRejectMofRequest } from "../../../../graphql/Cenotes/CenotesCustomHooks";
import { MofModificationInterface } from "../../../../Types/UtilsTypes";
import { getDateFormat } from "../../../../Services/UtilsService";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export const RequestList = () => {
  const {mofsModificationData, mofsModificationRefetch} = useGetMofModifications();
  const {acceptMofRequesData, acceptMofRequesError, acceptMofRequesLoading, acceptMofRequest, setAcceptMofRequestResult } = useAcceptMofRequest();
  const {rejectMofRequesData, rejectMofRequesError, rejectMofRequesLoading, rejectMofRequest, setRejectMofRequestResult }= useRejectMofRequest();
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const handleApproveClick = async (updateMofId: string | number) => {
      await acceptMofRequest(updateMofId);   
  };

  const handleRejectClick = async (updateMofId: string | number) => {
    await rejectMofRequest(updateMofId);   
};

  useEffect(() => {
    if (acceptMofRequesData && !acceptMofRequesError) {
      toast.success("Solicitud Aprobada");
      mofsModificationRefetch();
      setAcceptMofRequestResult(null);
    }
    if (acceptMofRequesData == false) {
      toast.error(`"Esta operación no se ha podido completar"`);
      setAcceptMofRequestResult(null);
    }
  }, [acceptMofRequesData, acceptMofRequesError]);

  useEffect(() => {
    if (rejectMofRequesData && !rejectMofRequesError) {
      toast.success("Solicitud Rechazada");
      mofsModificationRefetch();
      setRejectMofRequestResult(null);
    }
    if (rejectMofRequesData == false) {
      toast.error(`"Esta operación no se ha podido completar"`);
      setRejectMofRequestResult(null);
    }
  }, [rejectMofRequesData, rejectMofRequesError]);

  const renderActionLabel = (action: string): JSX.Element | null => {
    switch(action) {
      case 'CREATE':
        return (
          <label className="tag-green-round">
            <img src="/src/assets/Icons/new-arrow-up.svg" alt="New Arrow Up" />
            alta
          </label>
        );
      case 'UPDATE':
        return (
          <label className="tag-blue-round">
            <img src="/src/assets/Icons/edit.svg" alt="" />
            Modificación
          </label>
        );
      case 'DELETE':
        return (
          <label className="tag-red-round">
            <img src="/src/assets/Icons/trash.svg" alt="" />
            Eliminación
          </label>
        );

      
      // Add more cases as needed
      default:
        return null;
    }
  };

  const renderStatusLabel = (date: string): JSX.Element | null => {
    
    const currentDate = new Date();
    const inputDate = new Date(date);

    // Calculate the difference in time
    const timeDifference = currentDate.getTime() - inputDate.getTime();

    // Convert time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference > 30) {
      return (
        <label className="tag-red-round">Urgente</label>
      );
    } else {
      return (
        <label className="tag-yellow-round">Pendiente</label>
      );
  }
  };

  const renderExpandedContent = (item: MofModificationInterface) => {
    switch (item.type) {
      case 'UPDATE':
        return (
          <div className="row">
             <div className="col-md-3">
              <div className="card">
                <div className="card-header">Antes</div>
                <div className="card-body">
                <p><strong>{item.variableCategory}</strong> </p>
                  <p><strong></strong> {item.old_mof.value}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-header">Ahora</div>
                <div className="card-body">
                  <p><strong>{item.variableCategory}</strong></p>
                  <p><strong></strong> {item.mof.value}</p>
                </div>
              </div>
            </div>
           
          </div>
        );
      case 'CREATE':
        return (
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <p><strong> {item.variableCategory}</strong></p>
                  <p><strong> </strong>{item.mof.value}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'DELETE':
        return (
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">Deleted Item</div>
                <div className="card-body">
                  <p><strong>Category:</strong> {item.variableCategory}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const toggleRow = (variableId: string) => {
    setExpandedRows(prevState => ({
      ...prevState,
      [variableId]: !prevState[variableId],
    }));
  };
  
  return (
    <>
    {mofsModificationData && mofsModificationData.length > 0 &&
      <div className="card card-solid pb-5 pt-2">
        <div className="card-body pb-0">
          <div className="header-section-cnt mb-4">
            <p className="header-section-text-cnt mb-0">Por revisar</p>
            <small>
              Se sugiere revisar estas acciones y responder en un plazo máximo
              de 3 días a partir de la solicitud.
            </small>
          </div>
          {acceptMofRequesLoading || rejectMofRequesLoading ? 
            (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                <ClipLoader loading={acceptMofRequesLoading} size={50} />
              </div>
            ) : (
              <table className="table table-hover">
                <thead className="bg-header-footer">
                  <tr>
                    <th>
                      Status 
                    </th>
                    <th>
                      Fecha 
                    </th>
                    <th>
                      Acción 
                    </th>
                    <th>
                      Usuario 
                    </th>
                    <th>
                      Cenote 
                    </th>
                    <th>
                      Categoria
                      
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    mofsModificationData.map((item: MofModificationInterface) => (
                    <React.Fragment key={item?.variableId}>
                      <tr>
                        <td>
                          {renderStatusLabel(item?.mof?.timestamp)}
                        </td>
                        <td>
                          {getDateFormat(item?.mof?.timestamp)}
                        </td>
                        <td>
                          {renderActionLabel(item?.type)}
                        </td>
                        <td>{item?.creator}</td>
                        <td> {item?.cenoteName}</td>
                        <td>
                          <label className="tag-bluesky-round">
                          {item?.variableCategory}
                          </label>
                        </td>
                        <td>
                          <a  onClick={() => toggleRow(item?.variableId)}
                              style={{ cursor: 'pointer' }}>
                            <img src="/src/assets/Icons/arrow-down.svg" alt="" />
                          </a>
                        </td>
                        <td>
                          <a className="btn_approve mr-1" onClick={() => handleApproveClick(item.firestore_id)}
                            style={{ cursor: 'pointer' }}>
                            <img src="/src/assets/Icons/check.svg" alt="" />
                          </a>
                          <a 
                              className="btn_detach ml-1"  onClick={() => handleRejectClick(item.firestore_id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <img src="/src/assets/Icons/close.svg" alt="" />
                            </a>
                        </td>
                      </tr>
                      <tr className={`expandable-body ${expandedRows[item?.variableId] ? '' : 'd-none'}`}>
                        <td colSpan={8}>
                          {renderExpandedContent(item)}
                        </td>
                      </tr>
                    </React.Fragment>
                    ))
                  }
                </tbody>
              </table>
            )
          }
          
        </div>
      </div>
    }
    </>
  );
};
