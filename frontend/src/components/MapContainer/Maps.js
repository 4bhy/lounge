// import React, { useState } from 'react'
// import { useMemo } from 'react'
// import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
// import './Map.css'
// import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption
// } from '@reach/combobox'
// import '@reach/combobox/styles.css'

// const Maps = () => {
//     const { isLoaded } = useLoadScript({
//         googleMapsApiKey: "AIzaSyD3o7U1Vwnw3kRCw6mzkxleKVG--CSFSew",
//         libraries: ['places']
//     })

//     if (!isLoaded) return <div>Loading..</div>

//     return (
//         <div>
//             <Map />
//         </div>
//     )
// }

// function Map() {
//     const center = useMemo(() => ({ lat: 44, lng: -80 }), [])
//     const [selected, setSelected] = useState(null)

//     return (
//         <div>
//             <div>
//                 <PlacesAutocomplete setSelected={setSelected}/>
//             </div>
//             <GoogleMap zoom={10} center={center} mapContainerClassName="maps-container">
//                 <MarkerF position={{ lat: 44, lng: -80 }} />
//             </GoogleMap>
//         </div>

//     );
// }

// const PlacesAutocomplete= ({setSelected})=>{
//    const  {
//     ready,
//     value,
//     setValue,
//     suggestions:{status, data},
//     clearSuggestions
//    }= usePlacesAutocomplete();

//    return (
//     <div>
//         <Combobox>
//            <ComboboxInput value={value} onChange={(e)=>setValue(e.target.value)} disabled={!ready}
//            className="combobox-input"
//            placeholder='Search an Address'/> 
//            <ComboboxPopover>
//             <ComboboxList>
//                 <h1>
//                     {
//                         console.log(data, "map")
//                     }
//                 </h1>
//             {
//                 status ==="OK" && 
//                 data.map(({place_id, description})=>(
//                     <ComboboxOption key={place_id} value={description}/>
//                 ))
//             }
//             </ComboboxList>
//            </ComboboxPopover>
//         </Combobox>
//     </div>
//    )
// }

// export default Maps

// import React, { useState, useCallback } from 'react';
// import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
// import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'

// import Autocomplete from '@mui/material/Autocomplete';


// const libraries = ['places'];
// const mapContainerStyle = {
//   width: '100%',
//   height: '400px'
// };
// const center = {
//   lat: 44,
//   lng: -80
// };
// const options = {
//   disableDefaultUI: true,
//   zoomControl: true
// };

// const Maps = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyD3o7U1Vwnw3kRCw6mzkxleKVG--CSFSew',
//     libraries:['places']
//   });

//   if (!isLoaded) return <div>Loading..</div>;

//   return (
//     <div>
//       <Map />
//     </div>
//   );
// }

// function Map() {
//   const [selected, setSelected] = useState(null);

//   const handleSelect = useCallback(async (description) => {
//     try {
//       const results = await getGeocode({ address: description });
//       const { lat, lng } = await getLatLng(results[0]);
//       setSelected({ description, lat, lng });
//     } catch (error) {
//       console.error('Error', error);
//     }
//   }, []);

//   return (
//     <div>
//       <div>
//         <PlacesAutocomplete handleSelect={handleSelect} />
//       </div>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={10}
//         options={options}
//       >
//         {selected && (
//           <MarkerF
//             position={{ lat: selected.lat, lng: selected.lng }}
//             onClick={() => {
//               setSelected(null);
//             }}
//           />
//         )}
//       </GoogleMap>
//     </div>
//   );
// }

// const PlacesAutocomplete = ({ handleSelect }) => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions
//   } = usePlacesAutocomplete({
//     debounce: 300,
//     requestOptions: {
//       types: ['(regions)']
//     }
//   });

//   return (
//     <Autocomplete
//       disablePortal
//       options={status === 'OK' ? data : []}
//       getOptionLabel={(option) => option.description}
//       onInputChange={(event, newValue) => {
//         setValue(newValue);
//       }}
//       onChange={(event, newValue) => {
//         setValue(newValue);
//         if (newValue !== null) {
//           handleSelect(newValue.description);
//           clearSuggestions();
//         }
//       }}
//       renderInput={(params) => (
//         <div ref={params.InputProps.ref}>
//           <input
//             type="text"
//             placeholder="Search an Address"
//             disabled={!ready}
//             {...params.inputProps}
//           />
//         </div>
//       )}
//       renderOption={(option) => (
//         <li>{option.description}</li>
//       )}
//     />
//   );
// };

// export default Maps;


// import React, { useState, useCallback } from 'react';
// import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
// import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'

// import Autocomplete from '@mui/material/Autocomplete';

import { Search, GpsFixed } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react";

const apiKey = 'AIzaSyD3o7U1Vwnw3kRCw6mzkxleKVG--CSFSew' ;
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

function loadAsyncScript(src) {
    return new Promise(resolve => {
      const script = document.createElement("script");
      Object.assign(script, {
        type: "text/javascript",
        async: true,
        src
      })
      script.addEventListener("load", () => resolve(script));
      document.head.appendChild(script);
    })
  }
  
  const extractAddress = (place) => {
  
    const address = {
      city: "",
      state: "",
      zip: "",
      country: "",
      plain() {
        const city = this.city ? this.city + ", " : "";
        const zip = this.zip ? this.zip + ", " : "";
        const state = this.state ? this.state + ", " : "";
        return city + zip + state + this.country;
      }
    }
  
    if (!Array.isArray(place?.address_components)) {
      return address;
    }
  
    place.address_components.forEach(component => {
      const types = component.types;
      const value = component.long_name;
  
      if (types.includes("locality")) {
        address.city = value;
      }
  
      if (types.includes("administrative_area_level_2")) {
        address.state = value;
      }
  
      if (types.includes("postal_code")) {
        address.zip = value;
      }
  
      if (types.includes("country")) {
        address.country = value;
      }
  
    });
  
    return address;
  }



const Maps = () => {


    const searchInput = useRef(null);
    const [address, setAddress] = useState({});
  
  
    // init gmap script
    const initMapScript = () => {
      // if script already loaded
      if(window.google) {
        return Promise.resolve();
      }
      const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
      return loadAsyncScript(src);
    }
  
    // do something on address change
    const onChangeAddress = (autocomplete) => {
      const place = autocomplete.getPlace();
      setAddress(extractAddress(place));
    }
  
    // init autocomplete
    const initAutocomplete = () => {
      if (!searchInput.current) return;
  
      const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
      autocomplete.setFields(["address_component", "geometry"]);
      autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
  
    }
  
  
    const reverseGeocode = ({ latitude: lat, longitude: lng}) => {
      const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
      searchInput.current.value = "Getting your location...";
      fetch(url)
          .then(response => response.json())
          .then(location => {
            const place = location.results[0];
            const _address = extractAddress(place);
            setAddress(_address);
            searchInput.current.value = _address.plain();
          })
    }
  
  
    const findMyLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          reverseGeocode(position.coords)
        })
      }
    }
  
  
  
  
  
    // load map script after mounted
    useEffect(() => {
      initMapScript().then(() => initAutocomplete())
    }, []);
  
  



  return (
    <div className="App">
      <div>
        <div className="search">
          <span><Search /></span>
          <input ref={searchInput} type="text" placeholder="Search location...."/>
          <button onClick={findMyLocation}><GpsFixed /></button>
        </div>

        <div className="address">
          <p>City: <span>{address.city}</span></p>
          <p>State: <span>{address.state}</span></p>
          <p>Zip: <span>{address.zip}</span></p>
          <p>Country: <span>{address.country}</span></p>
        </div>

      </div>
    </div>  )
}

export default Maps
