import React from 'react';
import { mofByThemeInterface } from '../../../Types/CenotesTypes';
import { ClipLoader } from 'react-spinners';

interface WaterTabProps {
  mofsByThemeData: mofByThemeInterface[];
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
    NUTRIENT: '/src/assets/cenoteando-icons/Icon=tabler_hexagons.svg', 
    HEAVY_METAL: '/src/assets/cenoteando-icons/Icon=tabler_flask.svg', 
    BIOMARKERS: '/src/assets/cenoteando-icons/Icon=tabler_test-pipe-2.svg', 
    FARMACEUTIC: '/src/assets/cenoteando-icons/Icon=tabler_vaccine-bottle.svg', 
    ORGANOPHOSPHATE_PESTICIDES: '/src/assets/cenoteando-icons/Icon=tabler_spray.svg', 
    ORGANOCHLORINE_PESTICIDES: '/src/assets/cenoteando-icons/Icon=tabler_spray.svg', 
    POLYNUCLEAR_AROMATIC_HYDROCARBONS: '/src/assets/cenoteando-icons/Icon=tabler_flask-2.svg', 
    VOLATILE_HYDROCARBONS: '/src/assets/cenoteando-icons/Icon=tabler_hexagons.svg'
  };

  return {
    color: categoryColors[CategoryName] || '#f8fafc',
    position: categoryPosition[CategoryName] || 10,
    icon: categoryIcon[CategoryName] || '/src/assets/cenoteando-icons/Icon=tabler_droplet.svg'
  };
};

const renderOrderWaterCategories = (mofsByThemeData: mofByThemeInterface[]) => {
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

  return (
    <>
      {sortedMofsByThemeData.map((item, index) => (
        <div key={'water-' + index} className="container-category mt-3 col-md-12" style={{ backgroundColor: item.color }}>
          <p className="title-color title-weight title-size">
            {typeof item.icon === 'string' && (
              <img src={item.icon} alt="Category Icon" />
            )}
            {item.category}
          </p>
          {item.mofs.map((mofItem) => (
            <div key={'water-' + mofItem.id}>
              {mofItem.measurements.map((measurements_item) => (
                <div className="measurement-item" key={measurements_item.timestamp}>
                  <span className="variable-name title-color">
                    {mofItem.variableName}
                  </span>
                  {measurements_item.value !== 'true' && measurements_item.value !== 'false' &&
                    <span className="measurement-value"><strong>{measurements_item.value} {mofItem.variableUnits}</strong></span>
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
  if (!mofsByThemeData || mofsByThemeData.length === 0) {
    return   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <ClipLoader loading={true} size={50} />
      </div>;
  }

  const leftModuleData = mofsByThemeData.filter(item => left_module.includes(item.category));
  const rightModuleData = mofsByThemeData.filter(item => !left_module.includes(item.category));

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
