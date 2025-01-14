import React from 'react'
import { ReferencesInterface } from '../../../Types/ReferencesTypes';

interface ReferencesTabProps {
    referenceList: ReferencesInterface[];
}

export const BibliographyTab: React.FC<ReferencesTabProps> = ({referenceList}) => {

  return (
    <div className="card card-solid pb-5 pt-2">
    <div className="card-body pb-0">
      <div>
          <p className="header-section-text-cnt title-color title-weight title-size"><img src={"/assets/Icons/star.svg"}></img>Bibliografía</p>
      </div>
      <div className="row">
        
        {referenceList && referenceList.length ?
            (
                <table className="table table-hover ">
                <thead className="bg-header-footer">
                  <tr>
                    <th>
                      <a>Nombre corto{" "}</a>
                    </th>
                    <th>
                      <a>Tipo{" "}</a>
                    </th>
             
                    <th>
                      <a>Año{" "}</a>
                    </th>
                    <th>
                      Autores{" "}
                      <a>Autores{" "}</a>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {referenceList && referenceList.map((item: ReferencesInterface) => (
                  <tr key={'reference-' + item.cenoteando_id}>
                    <td>{item?.short_name ?  item.short_name : item.title}</td>
                    <td>{item?.type} </td>
                    <td>{item?.date_primary}</td>
                    <td>{item?.authors}</td>
                    <td>
                      <a className='cursor-pointer' href={item?.pdf_url}>
                        <img src="/assets/Icons/file-type-pdf.svg" alt="" />
                      </a>
                    </td>
                  </tr>
                  )
                )}
                </tbody>
              </table>
            ): 
            (<p>No se encontraron Referencias</p>)
        }
          
      </div>
    </div>
  </div>

  )
}
