import "./App.css";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/navBar.jsx";
import MapView from "./pages/Mapa/Mapa.jsx";
import ChurchDetail from "./pages/ChurchDetail/ChurchDetail";
import Filter from "./pages/Filter/Filter";
import NewChurch from "./pages/NewChurch/NewChurch";
import api from "./shared/API/Api";
import VisibleChurch from "./components/VisbleChurch/VisibleChurch";
import StandOutDetail from "./pages/StandOutDetails/StandOutDetails";
import ModifyBuilding from "./pages/ModifyBuilding/ModifyBuilding";

function App() {
  const [selectedChurch, setSelectedChurch] = useState("");
  const [standOutDetailsData, setStandOutDetailsData] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [filter, setFilter] = useState("listView");
  const [principalView, setPrincipalView] = useState("mapView"); 
  const [dataType, setDataType] = useState("");
  const [user, setUser] = useState(null);
  const [visibleChurches, setVisibleChurches] = useState([]);
  const [buildingDetails, setBuildingDetails] = useState([]);
  const [dataSelect, setDataSelect] = useState({});
  const [buildingToModify, setBuildingToModify] = useState({});

  const fetchData = () => {
    api
      .get("/churches")
      .then((response) => {
        setApiData(response);
        setDataFiltered(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="initStyles">
      <NavBar
        setFilter={setFilter}
        setPrincipalView={setPrincipalView}
        setSelectedChurch={setSelectedChurch}
        user={user}
        setUser={setUser}
      />
      <div className="mapAndDetail">
        <div className="mapView">
          {principalView === "mapView" ? (
            <MapView
              className="mapView"
              setSelectedChurch={setSelectedChurch}
              dataFiltered={dataFiltered}
              setFilter={setFilter}
              setVisibleChurches={setVisibleChurches}
              setPrincipalView={setPrincipalView}
            />
          ) : principalView === "newChurch" ? (
            <NewChurch
              setPrincipalView={setPrincipalView}
              setFilter={setFilter}
              buildingDetails={buildingDetails}
              dataSelect={dataSelect}
              setDataSelect={setDataSelect}
              fetchData={fetchData}
            />
          ) : principalView === "detail" ? (
            <ChurchDetail
              selectedChurch={selectedChurch}
              setDataType={setDataType}
              dataType={dataType}
              setStandOutDetailsData={setStandOutDetailsData}
              setPrincipalView = {setPrincipalView}
              setBuildingToModify={setBuildingToModify}
            />
          ) : principalView === "buildingModify" ? (
            <ModifyBuilding
              buildingToModify = {buildingToModify}
              setPrincipalView = {setPrincipalView}
              />
          ) : (null)}
        </div>
        <div className="detailView">
          {filter === "filter" ? (
            <Filter
              apiData={apiData}
              setDataFiltered={setDataFiltered}
              
            />
          ) : filter === "listView" ? (
            <VisibleChurch
              visibleChurches={visibleChurches}
              setSelectedChurch={setSelectedChurch}
              setPrincipalView={setPrincipalView}
              setFilter={setFilter}
            />
          ) : filter === "StandOut" ? (
            <StandOutDetail
              standOutDetailsData={standOutDetailsData}
              selectedChurch={selectedChurch}
              buildingDetails={buildingDetails}
              setBuildingDetails={setBuildingDetails}
              dataSelect={dataSelect}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
