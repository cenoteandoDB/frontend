import React, { useState } from "react";
import CardHome from "../../../../Components/Card/CardHome";
import { useAddFavoriteCenote, useRemoveFavoriteCenote } from "../../../../graphql/Cenotes/CenotesCustomHooks";
import { useAuthContext } from "../../../../Auth/AuthProvider";
import { FavoriteCenote } from "../../../../Types/CenotesTypes";

export default function FavoriteCenotes() {
  const { user, getUser } = useAuthContext()

  const { addCenote, favCenoteData, favCenoteLoading, favCenoteError } = useAddFavoriteCenote();
  const { removeCenote, delFavCenoteData, delFavCenoteLoading, delFavCenoteError } = useRemoveFavoriteCenote();
  const [favoriteCenote, setFavoriteCenote] = useState({userId: '', cenoteId: ''});
  const [isFavoriteAdded, setIsFavoriteAdded] = useState(false);

  const handleAddFavoriteCenote = (cenoteId: string | undefined) => {
    if( user?.id && cenoteId){
      setFavoriteCenote({ ...favoriteCenote, cenoteId, userId: user.id });
      addCenote({ cenoteId: cenoteId, userId: user.id });
      setIsFavoriteAdded(true);
    }
  };

  const handleRemoveFavoriteCenote = (cenoteId: string | undefined) => {
    if( user?.id && cenoteId){
      setFavoriteCenote({ ...favoriteCenote, cenoteId, userId: user.id });
      removeCenote({ cenoteId: cenoteId, userId: user.id });
      setIsFavoriteAdded(true);
    }
  };

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
            <div className="row">
           
              {renderComponents()}
            </div>
        </div>
      </div>
    </div>
  );
}
