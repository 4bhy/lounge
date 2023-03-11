import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { storage_bucket } from '../../firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import { addProperty } from '../../actions/hostActions'

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MapContainer from '../../components/MapContainer/MapContainer'
import Maps from '../../components/MapContainer/Maps'

import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast'

import { Search, GpsFixed } from "@mui/icons-material"
import Navbar from '../../components/Header/Navbar'

const apiKey = 'AIzaSyD3o7U1Vwnw3kRCw6mzkxleKVG--CSFSew';
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



const AddPropertyPrimary = () => {
    const [amenities, setAmenities] = useState([]);
    const [pname, setPname] = useState("")
    const [pstate, setPstate] = useState("")
    const [city, setCity] = useState("")
    const [pin, setPin] = useState("")
    const [description, setDescription] = useState("")
    const [url, setURL] = useState([])
    const [pic, setPic] = useState("")
    const [type, setType] = useState("")
    const [hostID, setHostID] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("url:", url)
        console.log("city:", city)
        console.log("state:", pstate)
        console.log("pin:", pin)
        console.log("hostId", hostID);
    }, [url, city, pstate, pin, hostID]);

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Kitchen',
        'Parking',
        'Laundry',
        'Pool',
        'WiFi',
        'Television'
    ];

    function getStyles(name, amenities, theme) {
        return {
            fontWeight:
                amenities.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setAmenities(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [value, setValue] = React.useState(10);

    const handleChanges = (event, newValue) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
            console.log(value);
        }
    };


    function valueLabelFormat(value) {
        const units = [''];

        let unitIndex = 0;
        let scaledValue = value;

        while (scaledValue >= 20 && unitIndex < units.length - 1) {
            unitIndex += 1;
            scaledValue /= 1;
        }

        return `${scaledValue} ${units[unitIndex]}`;
    }

    function calculateValue(value) {
        return value;
    }




    // console.log("city:", city, "pin:", pin);

    const submitHandler = (e) => {
        e.preventDefault()
        setCity(address.city)
        setPin(address.zip)
        setPstate(address.state)
        setHostID(userInfo.host._id)
        dispatchHandler();
    }

    const dispatchHandler = () => {
        console.log("dispacth", hostID);
        dispatch(addProperty(pname, pstate, city, pin, description, hostID, url, type, value, amenities))

    }

    const uploadFile = async (val) => {

        let file = val;
        let fileRef = ref(storage_bucket, "ProfilePics/" + file.name);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is " + progress + "% done.");
            if (progress === 100) {
                console.log(file.name);
                getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
                    if (URL) {
                        setURL(URL);
                        console.log(url, "^6");
                        console.log("in!!!!");
                    }
                })
            }
        });
    };




    //maps

    const searchInput = useRef(null);
    const [address, setAddress] = useState({});


    // init gmap script
    const initMapScript = () => {
        // if script already loaded
        if (window.google) {
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

    const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
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

    const findMyLocation = (e) => {
        e.preventDefault()
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
        <div>
            <div><Toaster /></div>
            <Navbar />
            <section class=" px-16">
                <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div class="lg:col-span-2 lg:py-12 ">
                         
                            <h1 class="text-2xl font-extrabold sm:text-3xl">
                                Let us find your

                                <strong class="block font-extrabold text-rose-700">
                                    Forever Home.
                                </strong>
                            </h1>

                            <div class="mt-8">
                           
                                <img src="https://i0.wp.com/generalstreet.in/wp-content/uploads/2020/05/local-business-listing.jpg?w=600&ssl=1" className='rounded-2xl' />
                            </div>
                        </div>

                        <div class="rounded-lg bg-white p-8 shadow-2xl lg:col-span-3 lg:p-12">
                            <form class="space-y-4">
                                <div>
                                    <label class="sr-only" for="pname">Name</label>
                                    <input
                                        class="w-full rounded-lg border p-3 text-sm"
                                        placeholder="Property Name"
                                        type="text"
                                        id="pname"
                                        value={pname}
                                        name="pname"
                                        onChange={(e) => setPname(e.target.value)}
                                    />
                                </div>
                                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {/* <div>
                                        <label class="sr-only border-4 border-gray-700" for="email">Region</label>
                                        <input
                                            class="w-full rounded-lg border-gray-700 p-3 text-sm"
                                            placeholder="Region"
                                            type="text"
                                            id="email"
                                            name="region"
                                        />
                                                                                <div className="search">
                                            <span><i class="fa fa-map-signs mr-3 text-red-700" aria-hidden="true"></i></span>
                                            <input ref={searchInput} type="text" placeholder="Search location...." />
                                            <button onClick={findMyLocation}><GpsFixed /></button>
                                        </div>
                                    </div> */}
                                    <div className="search flex">
                                        {/* <span><i class="fa fa-map-signs mr-3 mt-4 text-red-700" aria-hidden="true"></i></span> */}
                                        <input ref={searchInput} type="text" className='w-full rounded-lg border p-3 text-sm mr-2' placeholder="Search location...." />
                                        <button onClick={findMyLocation}><GpsFixed /></button>
                                    </div>
                                    {/* <div>

                                        <div className="address">
                                            <p>City: <span>{address.city}</span></p>
                                            <p>State: <span>{address.state}</span></p>
                                            <p>Zip: <span>{address.zip}</span></p>
                                            <p>Country: <span>{address.country}</span></p>
                                        </div>

                                    </div> */}


                                    <div>
                                        <label class="sr-only" for="city">City</label>
                                        <input
                                            class="w-full rounded-lg border p-3 text-sm"
                                            placeholder="City"
                                            type="tel"
                                            value={address.city}
                                            id="city"
                                            name="city"
                                        />
                                    </div>
                                    <div>
                                        <label class="sr-only" for="pstate">State</label>
                                        <input
                                            class="w-full rounded-lg border p-3 text-sm"
                                            placeholder="State"
                                            type="text"
                                            value={address.state}
                                            // onChange={(e) => setPstate(address.state)}
                                            id="pstate"
                                            name="pstate"
                                        />
                                    </div>

                                    <div>
                                        <label class="sr-only" for="pin">Pin</label>
                                        <input
                                            class="w-full rounded-lg border p-3 text-sm"
                                            placeholder="PIN Code"
                                            type="tel"
                                            value={address.zip}

                                            id="pin"
                                            name="pin"
                                        />
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3" onChange={(e) => { setType(e.target.value) }}>
                                    <div class="rounded-xl p-4">
                                        <input id="default-radio-1" type="radio" value="Apartment" name="ptype" class="peer opacity-0 w-2 h-2 rounded-xl text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-1" class="flex cursor-pointer p-4 rounded-full bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">Apartment</label>
                                    </div>

                                    <div class="p-4">
                                        <input id="default-radio-2" type="radio" value="Villa" name="ptype" class="peer opacity-0 w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-2" class="flex cursor-pointer p-4  rounded-full bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">Villa</label>
                                    </div>

                                    <div class="p-4">
                                        <input id="default-radio-3" type="radio" value="Shared" name="ptype" class="peer opacity-0 w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-3" class="flex cursor-pointer rounded-3xl  p-4 bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">Shared</label>
                                    </div>
                                </div>

                                <div className='w-full flex flex-row'>


                                    <FormControl sx={{ m: 1, width: 300 }}>
                                        <InputLabel id="demo-multiple-chip-label">Amenities</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={amenities}
                                            onChange={handleChange}
                                            input={<OutlinedInput id="select-multiple-chip" label="Amenities" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, amenities, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {/* 
                                    <Box sx={{ width: 150 }}>
                                        <Typography id="non-linear-slider" gutterBottom>
                                            Rooms: {valueLabelFormat(calculateValue(value))}
                                        </Typography>
                                        <Slider
                                            value={value}
                                            min={1}
                                            step={1}
                                            max={10}
                                            scale={calculateValue}
                                            getAriaValueText={valueLabelFormat}
                                            valueLabelFormat={valueLabelFormat}
                                            onChange={handleChanges}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="non-linear-slider"
                                        />
                                    </Box> */}

                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" onChange={(e) => {
                                            setValue(e.target.value)
                                            console.log(value)
                                        }

                                        } label="Price in INR" variant="outlined" />


                                    </Box>
                                </div>


                                <div>
                                    <label class="sr-only" for="description">Description</label>
                                    <textarea

                                        class="w-full rounded-lg border p-3 text-sm"
                                        placeholder="A Short Description About Your Property"
                                        rows="4"
                                        name="description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        id="description"
                                    ></textarea>
                                </div>
                                <div>
                                    <form >
                                        <div class="flex items-center justify-center w-full p-2">
                                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-white-800 dark:bg-white-700 hover:bg-gray-100 dark:border-white-600 dark:hover:border-gray-500 dark:hover:bg-white-600">
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <p class="m-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">{pic ? 'File added- Click upload' : 'Add file'}</span></p>
                                                </div>
                                            </label>
                                            <input id="dropzone-file" type="file" class="hidden" onChange={(e) => {
                                                setPic(e.target.files[0])
                                            }} />
                                            <button className="bg-white hover:bg-gray-100 ml-2 text-gray-800 font-semibold  px-2 border border-gray-400 rounded shadow" onClick={(e) => {
                                                e.preventDefault()
                                                uploadFile(pic)
                                            }}>UPLOAD</button>
                                        </div>
                                    </form>
                                </div>
                                <div className='w-full flex flex-col justify-center'>
                                    <button onClick={submitHandler} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddPropertyPrimary
