import React from 'react'
import "./CardHome.css";
import { SpeciesInterface } from '../../Types/SpeciesTypes';

export const CardSpecies: React.FC<SpeciesInterface> = ({name, thumbnail, gbifId, inaturalistId}) => {
    return (
        <>
            <div className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch flex-column mb-5">
            <div className="d-flex flex-fill">
                <div className="pt-0">
                <div className="row">
                    <div className="col-12 text-center position-relative">
                    <img
                        src={thumbnail}
                        alt="user-avatar"
                        className="img-fluid img-square"
                    />
                    </div>
                    <div className="col-12">
                    <h3 className="lead font-weight-bold mb-0">
                        <strong>{name}</strong>
                    </h3>
                   
                    <p className="text-muted text-sm">{name}</p>
                    <p className='tag-gray-round'> {inaturalistId? inaturalistId: ''}{ gbifId ? gbifId : ''}</p>
                    <hr className='mb-1'></hr>
                    <ul className="ml-4 mb-0 fa-ul text-muted d-flex">
                        {gbifId &&
                          <li className="small mr-2">
                            <a  target='_blank' href={'https://www.gbif.org/es/occurrence/' + gbifId  }>
                                GBIF
                                <span>
                                    <img src="/src/assets/Icons/arrow-up-right.svg" alt="" />
                                </span>
                            </a>
                        </li>
                        }
                         {inaturalistId &&
                          <li className="small mr-2">
                            <a target='_blank'  href={'https://mexico.inaturalist.org/observations/' + inaturalistId }>
                                INatural
                                <span>
                                    <img src="/src/assets/Icons/arrow-up-right.svg" alt="" />
                                </span>
                            </a>
                        </li>
                        }
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}
