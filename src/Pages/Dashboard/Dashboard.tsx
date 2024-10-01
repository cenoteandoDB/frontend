import React from "react";
import Header from "../../Components/Header/Header";
import { ContentHeader } from "../../Components/Content-header/ContentHeader";
import { Footer } from "../../Components/Footer/Footer";

interface DefaultHeaderProps {
  children: React.ReactNode;
}
export const Dashboard = ({ children }: DefaultHeaderProps) => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content-wrapper">{children}</div>
        <Footer />
      </div>
    </>
  );
};
