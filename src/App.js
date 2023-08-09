import "./App.css";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/navBar.jsx";
import MapView from "./pages/Mapa/Mapa.jsx";
import ChurchDetail from "./pages/ChurchDetail/ChurchDetail";
import Filter from "./pages/Filter/Filter";
import NewChurch from "./pages/NewChurch/NewChurch";
import api from "./shared/API/Api";

function App() {
  const [selectedChurch, setSelectedChurch] = useState("");
  const [standOutDetailsView, setStandOutDetailsView] = useState(true)
  const [standOutDetailsData, setStandOutDetailsData] = useState(null)
  const [apiData, setApiData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [filter, setFilter] = useState("detail");
  const [filterItems, setFilterItems] = useState({});
  const [principalView, setPrincipalView] = useState("mapView");
  const [preViewNewChurch, setPreviewNewChurch] = useState([]);
  const [dataType, setDataType] = useState("");
  const [currentFilterItems, setCurrentFilterItems] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/churches")
      .then((response) => {
        setApiData(response);
        setDataFiltered(response);
        setFilterItems({
          architectonicStyle: true,
          Centuries: true,
          detailTypes: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="initStyles">
      <NavBar
        setFilter={setFilter}
        setPrincipalView={setPrincipalView}
        setSelectedChurch={setSelectedChurch}
        setDataType={setDataType}
        user={user}
        setUser={setUser}
        setStandOutDetailsView = {setStandOutDetailsView}
      />
      <div className="mapAndDetail">
        <div className="mapView">
          {principalView === "map" ? (
            <MapView
              className="mapView"
              setSelectedChurch={setSelectedChurch}
              dataFiltered={dataFiltered}
              setFilter={setFilter}
            />
          ) : principalView === "newChurch" ? (
            <NewChurch
              setPreviewNewChurch={setPreviewNewChurch}
              setPrincipalView={setPrincipalView}
            />
          ) : (
            <MapView
              className="mapView"
              setSelectedChurch={setSelectedChurch}
              dataFiltered={dataFiltered}
              setFilter={setFilter}
            />
          )}
        </div>
        {filter === "filter" ? (
          <Filter
            className="ChurchDetail"
            setFilter={setFilter}
            apiData={apiData}
            setDataFiltered={setDataFiltered}
            setFilterItems={setFilterItems}
            FilterItems={filterItems}
            currentFilterItems={currentFilterItems}
            setCurrentFilterItems={setCurrentFilterItems}
          />
        ) : filter === "detail" ? (
          <ChurchDetail
            className="ChurcDetail"
            selectedChurch={selectedChurch}
            preViewNewChurch={preViewNewChurch}
            setFilter={setFilter}
            setDataType={setDataType}
            dataType={dataType}
            setStandOutDetailsData={setStandOutDetailsData}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
