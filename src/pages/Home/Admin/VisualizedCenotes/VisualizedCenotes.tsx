import React from "react";
import "./VisualizedCenotes.css";
import CardHome from "../../../../Components/CardHome/CardHome";

export const VisualizedCenotes = () => {
  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < 6; i++) {
      components.push(<CardHome key={i} />);
    }
    return components;
  };
  return (
    <div>
      <div className="card card-solid pb-5 pt-2">
        <div className="card-body pb-0">
          <div className="header-section-cnt mb-4">
            <p className="header-section-text-cnt">Cenotes Visualizados</p>
          </div>
          <div className="row">{renderComponents()}</div>
        </div>
      </div>
    </div>
  );
};
