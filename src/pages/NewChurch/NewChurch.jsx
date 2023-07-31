//import { arch } from "os";
import React, { useEffect, useState } from "react";

const NewChurch = () => {
  const [name, setName] = useState(""); // Variable para almacenar el valor del formulario
  const [listNames, setListNames] = useState([]);
  const [description, setDescription] = useState("");
  const [townLocation, setTownLocation] = useState("");
  const [province, setProvince] = useState("");

  const [latGPS, setLatGPS] = useState("");
  const [lonGPS, setLonGPS] = useState("");

  const [architectonicStyle, setArchitectonicStyle] = useState("");
  const [listArchitectonicStyle, setListArchitectonicStyle] = useState([]);

  const [century, setCentury] = useState("");
  const [listCentury, setListCentury] = useState([]);

  const [images, setImages] = useState([]);
  const [web, setWeb] = useState("");
  const [property, setProperty] = useState("");

  const [details, setDetails] = useState([]);

  const [detailType, setdetailType] = useState("");
  const [detailDescription, setDetailDescription] = useState("");
  const [year, setYear] = useState("");
  const [detailImages, setDetailImages] = useState([]);

  const [dataSelect, setDataSelect] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/appList")
      .then((res) => res.json())
      .then((result) => {
        setDataSelect(result);
      },[])
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(dataSelect);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que la página se recargue al enviar el formulario
    const newChurch = {
      name: listNames,
      description: description,
      townLocation: townLocation,
      province: province,
      locationGPS: [latGPS, lonGPS],
      architectonicStyle: listArchitectonicStyle,
      century: listCentury,
      images: images,
      web: web,
    };

    console.log(newChurch); // Acceso a la variable cuando hacemos submit
  };

  const addName = () => {
    if (!listNames.includes(name)) {
      setListNames([...listNames, name]);
    }
  };

  const addArchitectonicStyle = () => {
    if (
      !listArchitectonicStyle.includes(architectonicStyle) &&
      architectonicStyle !== "Selecciona"
    ) {
      setListArchitectonicStyle([
        ...listArchitectonicStyle,
        architectonicStyle,
      ]);
    }
  };

  const addCentury = () => {
    if (!listCentury.includes(century) && century !== "Selecciona") {
      setListCentury([...listCentury, century]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="button" onClick={addName}>
              Guardar nom{" "}
            </button>
            {listNames.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <label htmlFor="description">Descripció:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="townLocation">Població:</label>
          <input
            type="text"
            id="townLocation"
            value={townLocation}
            onChange={(e) => setTownLocation(e.target.value)}
          />
          <label htmlFor="province">Provincia:</label>
          <input
            type="text"
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
          <div>
            <label htmlFor="locationGPS">Coordenades GPS:</label>
            <input
              type="text"
              id="latGPS"
              value={latGPS}
              placeholder="LATITUT"
              onChange={(e) => setLatGPS(e.target.value)}
            />
            <input
              type="text"
              id="lonGPS"
              value={lonGPS}
              placeholder="LONGITUT"
              onChange={(e) => setLonGPS(e.target.value)}
            />
          </div>

          <label htmlFor="townLocation">Població:</label>
          <input
            type="text"
            id="townLocation"
            value={townLocation}
            onChange={(e) => setTownLocation(e.target.value)}
          />

          <div>
            <label htmlFor="architectonicStyle">Estil arquitectònic:</label>
            <select
              id="architectonicStyle"
              value={architectonicStyle}
              onChange={(e) => setArchitectonicStyle(e.target.value)}
            >
              <option>Selecciona</option>
              {dataSelect[0] && dataSelect[0].architectonicStyles ? (
                dataSelect[0].architectonicStyles.map((item, index) => (
                  <option key={index}>{item}</option>
                ))
              ) : (
                <option>No hay options </option>
              )}
            </select>

            <button type="button" onClick={addArchitectonicStyle}>
              Afegir estil arquitectònic
            </button>
            {listArchitectonicStyle.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <div>
            <label htmlFor="century">Segle:</label>
            <select
              id="century"
              value={century}
              onChange={(e) => setCentury(e.target.value)}
            >
              <option>Selecciona</option>
              {dataSelect[0] && dataSelect[0].centuries ? (
                dataSelect[0].centuries.map((item,index) => (
                  <option key={index}>{item}</option>
                ))
              ) : (
                <option>No hay options </option>
              )}
            </select>
            <button type="button" onClick={addCentury}>
              Afegir segle
            </button>
            {listCentury.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <label htmlFor="web">Web:</label>
          <input
            type="text"
            id="web"
            value={web}
            onChange={(e) => setWeb(e.target.value)}
          />
        </div>

        <label htmlFor="property">Població:</label>
        <input
          type="text"
          id="property"
          value={property}
          onChange={(e) => setProperty(e.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default NewChurch;
