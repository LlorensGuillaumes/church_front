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
import InitialPage from "./pages/InitialPage/InitialPage";
import Title from "./components/Title/Title";
import Register from "./components/Register/Register";
import UserSettings from "./components/UserSettings/UserSettings";
import Favourites from "./pages/Favourites/Favourites";

function App() {
  const [selectedChurch, setSelectedChurch] = useState("");
  const [standOutDetailsData, setStandOutDetailsData] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState({
    data: [],
    center: ["41.22274", "1.72389"],
    zoom: 10
  });
  const [filter, setFilter] = useState("listView");
  const [principalView, setPrincipalView] = useState("mapView");
  const [dataType, setDataType] = useState("");
  const [user, setUser] = useState(null);
  const [dataUser, setDataUser]=useState(null);
  const [visibleChurches, setVisibleChurches] = useState([]);
  const [buildingDetails, setBuildingDetails] = useState([]);
  const [dataSelect, setDataSelect] = useState({});
  const [buildingToModify, setBuildingToModify] = useState({});
  const [viewIntitialPage, setViewInitialPage] = useState(true);
  const [register, setRegister] = useState(false);
  const [btnFilterText, setBtnFilteText] = useState("FILTRAR");

  const fetchData = () => {
    api
      .get("/churches")
      .then((response) => {
        setApiData(response);
        setDataFiltered((prevDataFiltered) => ({
          ...prevDataFiltered,
          data: response
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    fetchData();
  }, []);

  if (viewIntitialPage) {
    return <InitialPage 
          setViewInitialPage = {setViewInitialPage}
          viewIntitialPage = {viewIntitialPage} />;
  }

  return (
    <div className="initStyles">
    <Title/>
      <NavBar
        setFilter={setFilter}
        filter = {filter}
        setPrincipalView={setPrincipalView}
        principalView={principalView}
        setSelectedChurch={setSelectedChurch}
        user={user}
        setUser={setUser}
        setDataFiltered={setDataFiltered}
        apiData={apiData}
        register = {register}
        setRegister = {setRegister}
        btnFilterText={btnFilterText}
        setBtnFilteText={setBtnFilteText}
        setDataUser = {setDataUser}
        dataUser={dataUser}
      />

      <div className="mapAndDetail">
        <div className="mapView">
          {principalView === "mapView" && (
            <MapView
              className="mapView"
              setSelectedChurch={setSelectedChurch}
              dataFiltered={dataFiltered}
              setFilter={setFilter}
              setVisibleChurches={setVisibleChurches}
              setPrincipalView={setPrincipalView}
              setDataFiltered={setDataFiltered}
            />
          )}
          {principalView === "newChurch" && (
            <NewChurch
              setPrincipalView={setPrincipalView}
              setFilter={setFilter}
              buildingDetails={buildingDetails}
              dataSelect={dataSelect}
              setDataSelect={setDataSelect}
              fetchData={fetchData}
            />
          )}
          {principalView === "detail" && (
            <ChurchDetail
              selectedChurch={selectedChurch}
              setDataType={setDataType}
              dataType={dataType}
              setStandOutDetailsData={setStandOutDetailsData}
              setPrincipalView={setPrincipalView}
              setBuildingToModify={setBuildingToModify}
              user={user}
              dataUser = {dataUser}
              setDataUser={setDataUser}
            />
          )}
          {principalView === "buildingModify" && (
            <ModifyBuilding
              buildingToModify={buildingToModify}
              setPrincipalView={setPrincipalView}
            />
          )}
          {principalView === "favourites" && (
            <Favourites
              dataUser = {dataUser}
              setDataUser = {setDataUser}
              user={user}
            />
          
          )}
        </div>
        <div className="detailView">
          {filter === "filter" && (
            <Filter
              apiData={apiData}
              setDataFiltered={setDataFiltered}
              dataFiltered={dataFiltered}
              setFilter = {setFilter}
              setBtnFilteText = {setBtnFilteText}
            />
          )}
          {filter === "listView" && (
            <VisibleChurch
              visibleChurches={visibleChurches}
              setSelectedChurch={setSelectedChurch}
              setPrincipalView={setPrincipalView}
              setFilter={setFilter}
            />
          )}
          {filter === "StandOut" && (
            <StandOutDetail
              standOutDetailsData={standOutDetailsData}
              selectedChurch={selectedChurch}
              buildingDetails={buildingDetails}
              setBuildingDetails={setBuildingDetails}
              dataSelect={dataSelect}
            />
          )}
          {filter === "register" && (
            <Register
              setUser = {setUser}
              setFilter = {setFilter}
            />
          )}
          {filter === "userSettings" && (
            <UserSettings
              setFilter = {setFilter}
              setPrincipalView = {setPrincipalView}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default App;

