import React from 'react'
import { CardSpecies } from '../../../Components/Card/CardSpecies';
import { SpeciesInterface } from '../../../Types/SpeciesTypes';



  interface BiodiversityTabProps {
    speciesList: SpeciesInterface[];
  }
  
  const renderComponents = (speciesList: SpeciesInterface[]) => {
    if (!speciesList || speciesList.length == 0) return;

    return speciesList.map((item) => (
      
      <CardSpecies  key={item.id}  {...item}  ></CardSpecies>
      
    ));
  };

export const BiodiversityTab: React.FC<BiodiversityTabProps> = ({ speciesList }) => {
  return (
    <div className="card card-solid pb-5 pt-2">
      <div className="card-body pb-0">
        <div className="header-section-cnt mb-4">
            <p className="header-section-text-cnt">Especies</p>
        </div>
        <div className="row">
          
            {renderComponents(speciesList)}
            
        </div>
      </div>
    </div>
  )
}
