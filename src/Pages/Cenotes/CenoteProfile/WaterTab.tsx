import React from 'react';
import { ClipLoader } from 'react-spinners';
import {ThemeMofs} from "./CenoteProfile.tsx";
import {CategoryIconEnum} from "../../../graphql/Cenotes/CenoteDto.ts";
import {VariableThemeEnum} from "../../../Types/VariablesTypes.tsx";

interface WaterTabProps {
  mofsByThemeData: ThemeMofs | undefined;
}

const left_module = [
  'NUTRIENT', 'HEAVY_METAL', 'BIOMARKERS', 'FARMACEUTIC',
  'ORGANOPHOSPHATE_PESTICIDES', 'ORGANOCHLORINE_PESTICIDES',
  'POLYNUCLEAR_AROMATIC_HYDROCARBONS', 'VOLATILE_HYDROCARBONS'
];

const renderWaterCustomFields = (CategoryName: string): { color: string, position: number, icon: string } => {
  const categoryColors: { [key: string]: string } = {
    NUTRIENT: '#FCFCFC', HEAVY_METAL: '#F6FBFE', BIOMARKERS: '#EDF7FC', 
    FARMACEUTIC: '#D4EBF7', ORGANOPHOSPHATE_PESTICIDES: '#DBEFFA', 
    ORGANOCHLORINE_PESTICIDES: '#E4F3FB', POLYNUCLEAR_AROMATIC_HYDROCARBONS: '#CBE8F6', 
    VOLATILE_HYDROCARBONS: '#D7EDF9'
  };

  const categoryPosition: { [key: string]: number } = {
    NUTRIENT: 1, HEAVY_METAL: 2, BIOMARKERS: 3, FARMACEUTIC: 7, 
    ORGANOPHOSPHATE_PESTICIDES: 5, ORGANOCHLORINE_PESTICIDES: 4, 
    POLYNUCLEAR_AROMATIC_HYDROCARBONS: 6, VOLATILE_HYDROCARBONS: 8
  };

  const categoryIcon: { [key: string]: string } = {
    NUTRIENT: '/assets/cenoteando-icons/Icon=tabler_hexagons.svg', 
    HEAVY_METAL: '/assets/cenoteando-icons/Icon=tabler_flask.svg', 
    BIOMARKERS: '/assets/cenoteando-icons/Icon=tabler_test-pipe-2.svg', 
    FARMACEUTIC: '/assets/cenoteando-icons/Icon=tabler_vaccine-bottle.svg', 
    ORGANOPHOSPHATE_PESTICIDES: '/assets/cenoteando-icons/Icon=tabler_spray.svg', 
    ORGANOCHLORINE_PESTICIDES: '/assets/cenoteando-icons/Icon=tabler_spray.svg', 
    POLYNUCLEAR_AROMATIC_HYDROCARBONS: '/assets/cenoteando-icons/Icon=tabler_flask-2.svg', 
    VOLATILE_HYDROCARBONS: '/assets/cenoteando-icons/Icon=tabler_hexagons.svg'
  };

  return {
    color: categoryColors[CategoryName] || '#f8fafc',
    position: categoryPosition[CategoryName] || 10,
    icon: categoryIcon[CategoryName] || '/assets/cenoteando-icons/Icon=tabler_droplet.svg'
  };
};

const renderOrderWaterCategories = (mofsByThemeData: ThemeMofs) => {
  /*
  const enrichedMofsByThemeData = mofsByThemeData.map((item) => {
    const { position, color, icon } = renderWaterCustomFields(item.category);
    return {
      ...item,
      order: position,
      color: color,
      icon: icon
    };
  });

  const sortedMofsByThemeData = enrichedMofsByThemeData.sort((a, b) => {
    return (a.order ?? 10) - (b.order ?? 10);
  });
  */

  console.log("next");
  console.log(mofsByThemeData);

  return (
    <>
      {Object.entries(mofsByThemeData).map(([category, mofsList]) => (
        <div key={'theme-' + category} className="container-category mt-3 col-md-12" style={{ backgroundColor: 'blue' }}>
          <p className="title-color title-weight title-size">
            <img src={CategoryIconEnum[category as keyof typeof CategoryIconEnum]} alt="Category Icon" />
            {category}
          </p>
          {mofsList && mofsList.map((mofItem) => (
            <div key={'mofs-' + mofItem.id}>
              {mofItem.measures && mofItem.measures.map((measurements_item, index) => (
                <div className="measurement-item" key={'measurements-' + index}>
                  <span className="variable-name title-color">
                    {mofItem.variable.name}
                  </span>
                  {measurements_item.value !== 'true' && measurements_item.value !== 'false' &&
                    <span className="measurement-value"><strong>{measurements_item.value} {mofItem.variable.units}</strong></span>
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export const WaterTab: React.FC<WaterTabProps> = ({ mofsByThemeData }) => {
  if (!mofsByThemeData) {
    return   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <ClipLoader loading={true} size={50} />
      </div>;
  }

  const leftModuleData = [];
  const rightModuleData = [];

  Object.entries(mofsByThemeData).forEach(([category, mofsList]) => {
    if (left_module.includes(category)) {
      leftModuleData.push([category, mofsList]);
    } else {
      rightModuleData.push([category, mofsList]);
    }
  });

  return (
    <>
      <div className="mt-3 col-6">
        {renderOrderWaterCategories(leftModuleData)}
      </div>
      <div className="mt-3 col-6">
        {renderOrderWaterCategories(rightModuleData)}
      </div>
    </>
  );
};
