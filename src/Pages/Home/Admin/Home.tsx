import React from "react";

import { DashboardData } from "../../Dashboard/DashboardData";
import "./Home.css";
import { VisualizedCenotes } from "./VisualizedCenotes/VisualizedCenotes";
import FavoriteCenotes from "./FavoriteCenotes/FavoriteCenotes";
import { NewUsersList } from "./NewUsersList/NewUsersList";
import { RequestList } from "./RequestList/RequestList";
import { HistoryList } from "./HistoryList/HistoryList";

export const Home = () => {
  return (
    <div>
      <DashboardData>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6 col-md-5">
                <h1 className="lbl-bread-title">Cenoteando Data</h1>
                <p className="lbl-bread-subtitle">
                  El repositorio más grande de cenotes de la península de
                  Yucatán.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <VisualizedCenotes></VisualizedCenotes>
          <FavoriteCenotes></FavoriteCenotes>
          <NewUsersList></NewUsersList>
          <RequestList></RequestList>
          <HistoryList></HistoryList>
        </section>
      </DashboardData>
    </div>
  );
};
