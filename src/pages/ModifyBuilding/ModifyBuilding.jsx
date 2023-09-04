import React, { useEffect, useState } from 'react';
import api from '../../shared/API/Api';

const ModifyBuilding = ({
  buildingToModify,
  setPrincipalView,
}) => {


  const [architectonicStyles, setArchitectonicStyles]=useState([buildingToModify[0].architectonicStyle]);
  const [centuries, setCenturies]=useState([buildingToModify[0].century])
  const [buildType, setBuildType]=useState(buildingToModify[0].buildType);
  const [churchDetails, setChurchDetails]=useState([buildingToModify[0].churchDetail]);
  const [description, setDescription]=useState(buildingToModify[0].description);
  const [images, setImages]=useState([buildingToModify[0].images]);
  const [locationGPSlat, setLocationGPSlat]=useState([buildingToModify[0].locationGPS[0]]);
  const [locationGPSlong, setLocationGPSlong]=useState([buildingToModify[0].locationGPS[1]]);
  const [names, setNames]=useState([buildingToModify[0].name]);
  const [province, setProvince]=useState(buildingToModify[0].province);
  const [townLoaction, setTownLocation]=useState(buildingToModify[0].townLocation);
  const [web, setWeb]=useState(buildingToModify[0].web)
  const id = buildingToModify[0]._id;

  const [addName, setAddName] = useState(0);
  const [addArchitectonicStyle, setAddArchitectonicStyle] = useState(0);
  const [addCentury, setAddCentury] = useState(0);
  const [modifyBuildType, SetModifyBuildType] = useState(false)
  const [dropdownItems, setdropdownItems] = useState([])

  useEffect(() => {
    api.get('/appList')
        .then((response) => {
            setdropdownItems(response);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);

const handleBuildTypeChange = (selectedValue) =>{
    setBuildType(selectedValue);
    SetModifyBuildType(false)
}
  return (
    <div>
     <div>
        <p type='text'>{buildType}</p>
        <button onClick={() =>SetModifyBuildType(true)}>Cambiar</button>
        {modifyBuildType ? 
        <select onChange={(e) => handleBuildTypeChange(e.target.value)}>
            {dropdownItems[0].buildingTypes.map((item) => (
                <option>{item}</option>
            ))}
        </select> : null}
      </div>
      <div>
        {names.map((item, index) => (
          <div key={index}>
            <input id={item} type='checkbox' value={item}/>
            <label htmlFor={item}>{item}</label>
          </div>     
        ))}
        {Array.from({ length: addName }, (_, index) => (
          <input key={addName + index} />
        ))}
        <div>
          <button>BorrarSeleccionats</button>
          <button onClick={() => setAddName(addName + 1)}>AfegirItems</button>
        </div>
      </div>
      <div>
        <input type='text' value={townLoaction} onChange={(e) => setTownLocation(e.target.value)}/>
      </div>
      <div>
        <input type='text' value={province} onChange={(e) => setTownLocation(e.target.value)}/>
      </div>
      <div>
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div>
        <input type='text' value={locationGPSlat} onChange={(e) => setLocationGPSlat(e.target.value)}/>
        <input type='text' value={locationGPSlong} onChange={(e) => setLocationGPSlong(e.target.value)}/>
      </div>
      <div>
      <input type='text' value={web} onChange={(e) => setWeb(e.target.value)}/>
      </div>
      <div>
        {architectonicStyles.map((item, index) => (
            <div key={index}>
            <input id={item} type='checkbox' value={item}/>
            <label htmlFor={item}>{item}</label>
          </div>    
        ))}
        {Array.from({ length: addArchitectonicStyle }, (_, index) => (
          <input key={addArchitectonicStyle + index} />
        ))}
        <div>
          <button>BorrarSeleccionats</button>
          <button onClick={() => setAddArchitectonicStyle(addArchitectonicStyle + 1)}>AfegirItems</button>
        </div>
      </div>
      <div>
        {centuries.map((item, index) => (
            <div key={index}>
            <input id={item} type='checkbox' value={item}/>
            <label htmlFor={item}>{item}</label>
          </div>    
        ))}
        {Array.from({ length: addCentury }, (_, index) => (
          <input key={addCentury + index} />
        ))}
        <div>
          <button>BorrarSeleccionats</button>
          <button onClick={() => setAddCentury(addCentury + 1)}>AfegirItems</button>
        </div>
      </div>
      <div>
        {images.map((item, index)=>(
            <img
            key={index}
              src={`https://buildingback.onrender.com/churches/getImages/${item}`}
              alt={`${index}`}
            />
        ))}
      </div>
    </div>
  );
  
};

export default ModifyBuilding;






