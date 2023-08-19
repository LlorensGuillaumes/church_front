import React, { useEffect, useState } from "react";
import "./NewChurch.css";
import api from "../../shared/API/Api";
import loading from "../../components/Images/loading.gif";

const NewChurch = ({
  setPrincipalView,
  setFilter,
  buildingDetails,
  dataSelect,
  setDataSelect,
  fetchData,
}) => {
  

  const [name, setName] = useState("");
  const [placeHolderName, setPlaceHolderName] = useState("Introduir nom");
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

  const [web, setWeb] = useState("");
  const [property, setProperty] = useState("");
  const [buildType, setBuildType] = useState("");

  const [imagesURL, setImagesURL] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [btnText, setBtnText] = useState('Cancelar');

  useEffect(() => {
    api
      .get("/appList")
      .then((response) => {
        setDataSelect(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setDataSelect]);
  
    useEffect(() => {
    setFilter("StandOut");
  }, [setFilter]);

   useEffect(() => {
    if (listNames.length > 0) {
      setPlaceHolderName("  Altres noms");
    } else {
      setPlaceHolderName("  Introduir nom");
    }
  }, [listNames]); 
  
  const fnAddImagesDb = (saveNames, id) => {
    const data = {
      images: saveNames.saveNames,
      churchDetail: buildingDetails,
    };

    api
      .put(`/churches/modifyChurch/${id}`, data)
      .then((response) => {
        setIsSaving(false);
        setPrincipalView("mapView");
        setFilter("listView");
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);

    const newImage = {
      file: file,
      objectURL: objectURL,
    };

    const urlAlreadyExist = imagesURL.some(
      (image) => image.objectURL === objectURL
    );
    if (!urlAlreadyExist) {
      setImagesURL([...imagesURL, newImage]);
    }
  };

  const handleImageUpload = (_id) => {
    const fileList = imagesURL.map((item) => item.file);

    const formData = new FormData();

    fileList.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    formData.append("churchId", _id);

    api
      .postFormData("/churches/images", formData)
      .then((response) => {
        fnAddImagesDb(response, _id);
      })
      .catch((error) => console.log(error));
  };

  const addName = () => {
    if (!listNames.includes(name)) {
      setListNames([...listNames, name.toUpperCase()]);
    }
    setName("");
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

  const fnCancelar = () =>{
    if(btnText === "Confirmar"){
        setPrincipalView('mapView')
    }
    if(btnText === 'Cancelar'){
      setBtnText('Confirmar')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que la página se recargue al enviar el formulario
    setIsSaving(true);
    const data = {
      name: listNames,
      description: description,
      townLocation: townLocation,
      province: province,
      locationGPS: [latGPS, lonGPS],
      architectonicStyle: listArchitectonicStyle,
      century: listCentury,
      web: web,
      buildType: buildType,
    };

    if (
      data.name.length > 0 &&
      data.description !== "" &&
      data.townLocation !== "" &&
      data.province !== "" &&
      data.locationGPS[0] !== "" &&
      data.locationGPS[1] !== "" &&
      (data.architectonicStyle.length > 0 || data.century.length > 0) &&
      data.buildType !== ""
    ) {
      setErrorMessage("");
      api
        .post("/churches/newChurch/", data)
        .then((response) => {
          handleImageUpload(response._id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrorMessage(
        "Els camps Tipus d'edifici, Població, Provincia i Coordendades GPS són obligatoris, a demés, ha de constar també un Nom i un Estil arquitectònic o Segle. Pots comprovar les dades introduides en la part dreta de la pantalla"
      );
    }
  };



  
  return (
    <div className="page">
      <div className="loading" style={{display: isSaving ? "flex" : "none"}}>
        <img src={loading} alt="Loading" />
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div>
          <select onChange={(e) => setBuildType(e.target.value)}>
            <option>Tipus d'edifici</option>
            {dataSelect[0] && dataSelect[0].buildingTypes ? (
              dataSelect[0].buildingTypes.map((item, index) => (
                <option key={index}>{item}</option>
              ))
            ) : (
              <option>No hay options </option>
            )}
          </select>
          <div className="inputName">
            <input
              placeholder={placeHolderName}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="button" id="btName" onClick={addName}>
              Guardar nom
            </button>

            <div className="namesList">
              {listNames && listNames.length > 0 ? (
                listNames.map((item, index) => <p key={index}>{item}</p>)
              ) : (
                <p>No hi ha noms guardats</p>
              )}
            </div>
          </div>

          <div className="inputTown">
            <input
              type="text"
              id="townLocation"
              value={townLocation}
              placeholder="  Població"
              onChange={(e) => setTownLocation(e.target.value)}
            />
            <input
              type="text"
              id="province"
              value={province}
              placeholder="Provincia"
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>
          <div className="inputLocationGPS">
            <label htmlFor="locationGPS">Coordenades GPS:</label>
            <input
              type="text"
              id="latGPS"
              value={latGPS}
              placeholder="  41.23"
              onChange={(e) => setLatGPS(e.target.value)}
            />
            <input
              type="text"
              id="lonGPS"
              value={lonGPS}
              placeholder="  1.18"
              onChange={(e) => setLonGPS(e.target.value)}
            />
          </div>

          <div className="inputArchitectonicStyle">
            <select
              id="architectonicStyle"
              value={architectonicStyle}
              onChange={(e) => setArchitectonicStyle(e.target.value)}
            >
              <option>Estil arquitectònic </option>
              {dataSelect[0] && dataSelect[0].architectonicStyles ? (
                dataSelect[0].architectonicStyles.map((item, index) => (
                  <option key={index}>{item}</option>
                ))
              ) : (
                <option>No hay options </option>
              )}
            </select>

            <button type="button" onClick={addArchitectonicStyle}>
              Add
            </button>

            <div className="namesList">
              <div className="listAdd">
                {listArchitectonicStyle && listArchitectonicStyle.length > 0 ? (
                  listArchitectonicStyle.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))
                ) : (
                  <p>Estils</p>
                )}
              </div>
            </div>

            <select
              id="century"
              value={century}
              onChange={(e) => setCentury(e.target.value)}
            >
              <option>Segle</option>
              {dataSelect[0] && dataSelect[0].centuries ? (
                dataSelect[0].centuries.map((item, index) => (
                  <option key={index}>{item}</option>
                ))
              ) : (
                <option>No hay options </option>
              )}
            </select>
            <button type="button" onClick={addCentury}>
              Add
            </button>
            <div className="listAdd">
              {listCentury && listCentury.length > 0 ? (
                listCentury.map((item, index) => <p key={index}>{item}</p>)
              ) : (
                <p>Segles</p>
              )}
            </div>
          </div>

          <div className="inputDescription">
            <textarea
              id="description"
              value={description}
              placeholder="  Descripció"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="inputWeb">
            <input
              type="text"
              id="web"
              value={web}
              placeholder="  Enllaç web"
              onChange={(e) => setWeb(e.target.value)}
            />
          </div>
        </div>
        <div className="inputProperty">
          <input
            type="text"
            id="property"
            value={property}
            placeholder="  Propietari"
            onChange={(e) => setProperty(e.target.value)}
          />
        </div>
        <div className="inputFile">
          <input type="file" onChange={handleImageChange} />
        </div>

        <div className="btnSend">
          <button type="button" id="btnEnviar" onClick={handleSubmit}>
            Enviar
          </button>
          <button type="button" id="btnEnviar" onClick={()=>{fnCancelar()}}>
            {btnText}
          </button>
        </div>

        {errorMessage !== "" ? (
          <div className="errorMessegeContainer">
            <p className="errorMessage">{errorMessage}</p>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default NewChurch;
