import React from "react";
import CardHome from "../../../../Components/CardHome/CardHome";

export default function FavoriteCenotes() {
  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < 6; i++) {
      components.push(<CardHome hideEditDetails={false} key={i} />);
    }
    return components;
  };
  return (
    <div>
      <div className="card card-solid pb-5 pt-2">
        <div className="card-body pb-0">
          <div className="header-section-cnt mb-4">
            <p className="header-section-text-cnt">Cenotes Favoritos</p>
          </div>
          <div className="row">{renderComponents()}</div>
        </div>
      </div>
    </div>
  );
}
