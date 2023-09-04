import React from "react";
import CarouselInit from "../../components/CarouserInit/CarouselInit";
import "./InitialPage.css";
import images from "../../components/Images/frontCarusel";
import Title from "../../components/Title/Title";

const initialPage = ({ setViewInitialPage, viewIntitialPage }) => {
  return (
    <div>
    <Title/>
      <div className="initialPageTop">

        <div className="initialPageTitle_Description">
          <div className="intialPageTitle">
            <h2 className="initialPageTitleH2">Turisme cultural</h2>
          </div>

          <p className="initialPageDescription">
            BeepBuilding és un lloc on trobar les grans, i no tant grans,
            construccions arquitectòniques d'arreu del territori.
          </p>
        </div>
      </div>

      <div className="InitialButton">
        <button 
        className="btnInit"
        onClick={() => setViewInitialPage(!viewIntitialPage)}>
          Comencem?
        </button>
      </div>
      <CarouselInit carouselData={images} dataType="exist" imagesFront={true} />
    </div>
  );
};

export default initialPage;
