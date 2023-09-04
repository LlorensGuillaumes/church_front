import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapa.css";
import esglesia from "../../components/Images/buildingTypes/esglesia.jpg";
import castell from "../../components/Images/buildingTypes/castell.jpg";
import convent from '../../components/Images/buildingTypes/convent.jpg'

const churchIcon = icon({
  iconUrl: esglesia,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const conventIcon = icon({
  iconUrl: convent,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const castleIcon = icon({
  iconUrl: castell,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const MapView = ({
  setSelectedChurch,
  dataFiltered,
  setFilter,
  setVisibleChurches,
  setPrincipalView,
  setDataFiltered,
  actualLocation,
  setActualLocation,
}) => {

  const [mapPosition, setMapPosition] = useState(actualLocation);
  const [mapZoom, setMapZoom] = useState(10);

  const mapRef = useRef(null);
  const map = mapRef.current;



  const handleMapChange = () => {
    const newMapPosition = [map.getCenter().lat, map.getCenter().lng];
    const newMapZoom = map.getZoom();

    setMapPosition(newMapPosition);
    setMapZoom(newMapZoom);
    setActualLocation(newMapPosition);
    setDataFiltered((prevDataFiltered) => ({
      ...prevDataFiltered,
      center: newMapPosition,
      zoom: newMapZoom,
    }));
  };

  useEffect(() => {
    if (dataFiltered.center) {
      setMapPosition(dataFiltered.center);
    }
  }, [dataFiltered.center]);

  useEffect(() => {
    if (dataFiltered.zoom) {
      setMapZoom(dataFiltered.zoom);
    }
  }, [dataFiltered.zoom]);

  useEffect(() => {
    if (mapRef.current && mapPosition && map) {

      map.setView(mapPosition, mapZoom);

      //mapRef.current.setView(mapPosition, mapZoom);

      const updateVisibleChurches = () => {
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
       
  
        const churchList = dataFiltered.data.map((item) => [
          item._id,
          item.name[0],
          [item.locationGPS[0], item.locationGPS[1]],
          item.images[0],
          item.puntuation,
        ]);

        const filteredChurches = churchList.filter((item) => {
          const lat = item[2][0];
          const lng = item[2][1];
          return (
            lat >= sw.lat && lat <= ne.lat && lng >= sw.lng && lng <= ne.lng
          );
        });
        setVisibleChurches(filteredChurches);
      };

      map.on("moveend", updateVisibleChurches);
      map.on("zoomend", updateVisibleChurches);

      updateVisibleChurches();

      return () => {
        map.off("moveend", updateVisibleChurches);
        map.off("zoomend", updateVisibleChurches);
      };
    }
  }, [mapPosition, mapZoom, mapRef, dataFiltered, setVisibleChurches, map]); // [mapRef, dataFiltered, setVisibleChurches, map]);

  let churchLocation;
  if (dataFiltered && dataFiltered.data.length > 0) {
    let churchList = [];

    for (const item of dataFiltered.data) {
      let subArray = []
  
      if (item.puntuation && item.puntuation.length > 0) {
     
        item.puntuation = item.puntuation.map(Number);
        const average =
          item.puntuation.reduce((anterior, actual) => anterior + actual, 0)/item.puntuation.length;
        const roundAverage = parseFloat(average.toFixed(1));


          subArray = [
          item._id,
          item.name[0],
          [item.locationGPS[0], item.locationGPS[1]],
          item.images,
          item.buildType,
          roundAverage,
        ];
      }else{
        subArray = [
          item._id,
          item.name[0],
          [item.locationGPS[0], item.locationGPS[1]],
          item.images,
          item.buildType,
          0,
        ];
      }
    
      churchList.push(subArray);
    }


    churchLocation = churchList.map((item) => {
      const id = item[0];
      const localizacion = item[2];
      const churchName = item[1];
      const buildingType = item[4];

      const markerClick = () => {
        setSelectedChurch(id);
        setPrincipalView("detail");
        setFilter("StandOut");
      };

      return (
        <Marker
          key={id}
          position={localizacion}
          icon={
            buildingType === "Convent / Monestir"
              ? conventIcon
              : buildingType === "Castell"
              ? castleIcon
              : buildingType === "Esglèsia"
              ? churchIcon
              :castleIcon
              
          }
          eventHandlers={{
            click: () => markerClick(),
          }}
        >
          <Tooltip key={id}>{churchName}</Tooltip>
        </Marker>
      );
    });
  }

  return (
    <div className="MapContainer">
      <MapContainer
        ref={mapRef}
        className="MapContainer"
        center={mapPosition}
        zoom={mapZoom}
        onzoomend={handleMapChange}
        onmoveend={handleMapChange}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {churchLocation}
      </MapContainer>
    </div>
  );
};

// const CustomEventHandlers = ({ onZoomChange, onMoveChange }) => {
//   useMapEvent("zoomend", onZoomChange);
//   useMapEvent("moveend", onMoveChange);

//   return null;
// };

export default MapView;
