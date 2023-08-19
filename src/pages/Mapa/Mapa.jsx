import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapa.css";
import esglesia from "../../components/Images/esglesia.png";
import castell from "../../components/Images/castell.png"

const churchIcon = icon({
  iconUrl: esglesia,
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
})

const position = [41.20668, 1.66992];

const navigatorObj = navigator.geolocation
navigatorObj.getCurrentPosition((position) =>{
}, (error) => {
  console.log("error", error)
})



const MapView = ({ setSelectedChurch, dataFiltered, setFilter, setVisibleChurches, setPrincipalView }) => {
  const mapRef = useRef(null);
 


  useEffect(() => {
    if (mapRef.current && dataFiltered) {
      const map = mapRef.current;

      const updateVisibleChurches = () => {
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        const churchList = dataFiltered.map((item) => [
          item._id,
          item.name[0],
          [item.locationGPS[0], item.locationGPS[1]],
          item.images[0],
        ]);

        const filteredChurches = churchList.filter((item) => {
          const lat = item[2][0];
          const lng = item[2][1];
          return lat >= sw.lat && lat <= ne.lat && lng >= sw.lng && lng <= ne.lng;
        });
       setVisibleChurches(filteredChurches)
        
      };

      map.on("moveend", updateVisibleChurches);
      map.on("zoomend", updateVisibleChurches);

      // Inicializa las iglesias visibles en el primer renderizado
      updateVisibleChurches();

      return () => {
        map.off("moveend", updateVisibleChurches);
        map.off("zoomend", updateVisibleChurches);
      };
    }
  }, [mapRef, dataFiltered, setVisibleChurches]);

  let churchLocation
  if (dataFiltered) {
    let churchList = dataFiltered.map((item) => [
      item._id,
      item.name[0],
      [item.locationGPS[0], item.locationGPS[1]],
      item.images,
      item.buildType,
    ]);

    churchLocation = churchList.map((item) => {

  
      const id = item[0];
      const localizacion = item[2];
      const churchName = item[1];
      const buildingType = item[4];

      const markerClick = () => {
        setSelectedChurch(id);
        setPrincipalView("detail");
        setFilter('StandOut');
      };

      return (
        <Marker
          key={id}
          position={localizacion}
          icon={buildingType === "Convent / Monestir" ? churchIcon : castleIcon }
          eventHandlers={{
            click: () => markerClick(),
          }}
        >
          <Tooltip>{churchName}</Tooltip>
        </Marker>
      );
    });
  }

  return (
    <div className="MapContainer">
      <MapContainer ref={mapRef} className="MapContainer" center={position} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {churchLocation}
      </MapContainer>
   
    </div>
  );
};

export default MapView;




