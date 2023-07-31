//import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapa.css";

import gotic from "../../components/Images/gotic.png";


const customIcon = icon({
  iconUrl: gotic,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const position = [41.20668, 1.66992];

const MapView = ({ setSelectedChurch, dataFiltered, setFilter }) => {
  if (dataFiltered) {
    let churchList = dataFiltered.map((item) => [
      item._id,
      item.name[0],
      [item.locationGPS[0], item.locationGPS[1]],
    ]);

    let churchLocation = churchList.map((item) => {
      const id = item[0];
      const localizacion = item[2];
      const churchName = item[1];

      const markerClick = () => {
        setSelectedChurch(id);
        setFilter("detail");
      };

      return (
        <Marker
          key={id}
          position={localizacion}
          icon={customIcon}
          eventHandlers={{
            click: () => markerClick(),
          }}
        >
          <Tooltip>{churchName}</Tooltip>
        </Marker>
      );
    });

    return (
      <div className="MapContainer">
        <MapContainer className="MapContainer" center={position} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {churchLocation}
        </MapContainer>
      </div>
    );
  }
};

export default MapView;
