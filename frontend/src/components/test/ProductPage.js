import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Footer from '../Footer/Footer'
import Navbar from '../Header/Navbar'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { checkAvailabilities, individualProperty, submitReview } from '../../actions/userActions'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { toast, Toaster } from 'react-hot-toast'
import { resetAvailability } from '../../features/users/availabilitySlice'
import Loading from '../Loading'
import LoadingSmall from '../Loading/LoadingSmall'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const ProductPage = () => {

  const individualProperties = useSelector((state) => state.individualProperty)
  const { individualPropertyData, individualPropertyLoading } = individualProperties;
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = React.useState(null);
  const [guests, setGuests] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(true)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const naviagteHandler = () => {
    const dateValue = new Date(checkIn.$d).toDateString('en-US');
    const cout = new Date(checkOut.$d).toDateString('en-US');
    navigate("/checkout-payment", {
      state: {
        propertyData: individualPropertyData.propertyInfo, guests: guests, totalPrice: totalPrice,
        checkIn: dateValue, checkOut: cout, userInfo: userInfo.user
      }
    })
  }
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(individualProperty(id))
  }, [])


  useEffect(() => {
    const today = new Date()
    setDisabled(true)
    dispatch(resetAvailability())
    if (checkIn?.$d < today) {

    } else if (checkOut < checkIn) {

    } else {
      const gprice = guests ? individualPropertyData?.propertyInfo.price * guests : 0
      const nights = checkIn && checkOut ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0;
      const price = nights * individualPropertyData?.propertyInfo.price;
      setTotalPrice(gprice + price || 0)
    }

  }, [checkIn, checkOut])

  useEffect(() => {
    const gprice = guests ? individualPropertyData?.propertyInfo.price * guests : 0
    const nights = checkIn && checkOut ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0;
    const price = nights * individualPropertyData?.propertyInfo.price;
    setTotalPrice(gprice + price || 0)
  }, [guests])


  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [description, setDescription] = useState("")

  const [title, setTitle] = useState("")

  const submitHandlder = async () => {
    setOpen(false)
    const storageValue = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storageValue);

    await dispatch(submitReview(individualPropertyData?.propertyInfo
      ._id, userInfo.user._id, value, title, description))
    setOpenSnackbar(true)
    await dispatch(individualProperty(id))

  }


  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  const handleAvailability = () => {
    const today = new Date();

    if (!checkIn || !checkOut) {
      toast(
        "Please select a valid Check In and Check Out date!",
        {
          duration: 3000,
        }
      );
    } else if (checkIn.$d < today) {
      toast.error("Please select a valid date!")
    } else if (checkOut < checkIn) {
      toast.error("Please select a valid date")
    } else if (guests > individualPropertyData?.propertyInfo.maxGuests) {
      toast.error("Exceeded the maximum number of guests allowed")
    } else {
      dispatch(checkAvailabilities(checkIn, checkOut, individualPropertyData?.propertyInfo._id))
    }
  }

  const checkAvailability = useSelector((state) => state.checkAvailability)

  const { availabilityData, error, loading } = checkAvailability;

  useEffect(() => {
    if (availabilityData) {
      setDisabled(false)
    }
  }, [availabilityData])

  useEffect(() => {
    if (error) {
      setDisabled(true)
    }
  }, [error])

  return (
    <div>
      <div><Toaster /></div>
      <Navbar />
      <section>
        {
          individualPropertyLoading && <Loading />
        }
        <div class="relative max-w-screen-xl px-4 py-8 mx-auto">
          <div class="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
            <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
              <img
                alt="Les Paul"
                src={individualPropertyData?.propertyInfo
                  .pic[0]}
                class="object-cover w-full aspect-square rounded-xl"
              />

              <div class="grid grid-cols-2 gap-4 lg:mt-4">
                {/* <img
            alt="Les Paul"
            src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"
            class="object-cover w-full aspect-square rounded-xl"
          /> */}

                {/* <img
            alt="Les Paul"
            src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"
            class="object-cover w-full aspect-square rounded-xl"
          /> */}

                {/* <img
            alt="Les Paul"
            src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"
            class="object-cover w-full aspect-square rounded-xl"
          /> */}

                {/* <img
            alt="Les Paul"
            src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"
            class="object-cover w-full aspect-square rounded-xl"
          /> */}
              </div>
            </div>

            <div class="sticky top-0">
              <strong
                class="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600"
              >
                Property Info
              </strong>

              <div class="flex justify-between mt-8">
                <div class="max-w-[35ch]">
                  <h1 class="text-2xl font-bold">
                    {individualPropertyData?.propertyInfo
                      .pname}
                  </h1>
                  {
                    individualPropertyData?.propertyInfo?.averageRating >= 3.0 ? (<p class="mt-0.5 text-sm">Highest Rated Product</p>) : null
                  }

                  <div class="mt-2 -ml-0.5 flex">
                    {individualPropertyData?.propertyInfo?.averageRating && (
                      <Rating name="half-rating-read"
                        defaultValue={individualPropertyData?.propertyInfo?.averageRating}
                        precision={0.5}
                        readOnly
                      />
                    )}

                  </div>
                </div>

                <p class="text-lg font-bold">₹ {individualPropertyData?.propertyInfo
                  .price}/<span className='text-gray-500 text-sm'>night</span></p>

              </div>

              <details
                class="group relative mt-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary class="block">
                  <div>
                    <div class="prose max-w-none group-open:hidden">
                      <p>
                        {individualPropertyData?.propertyInfo
                          .description}
                      </p>
                    </div>

                    <span
                      class="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0"
                    >
                      Read More
                    </span>
                  </div>
                </summary>
                <div className="mt-5">
                  <div className="text-sm text-gray-600">Amenities:</div>
                  <div className="flex">
                    <div className="w-16 h-16 bg-gray-300 mr-5 rounded-full"></div>
                    <div className="w-16 h-16 bg-gray-300 mr-5 rounded-full"></div>
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  </div>
                </div>

                <div class="pb-6 prose max-w-none">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                    veniam dicta beatae eos ex error culpa delectus rem tenetur,
                    architecto quam nesciunt, dolor veritatis nisi minus inventore,
                    rerum at recusandae?
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                    nam sapiente nobis ea veritatis error consequatur nisi
                    exercitationem iure laudantium culpa, animi temporibus non! Maxime
                    et quisquam amet. A, deserunt!
                  </p>
                </div>
              </details>
              <div className="flex flex-col items-center mt-5">
                {isNaN(totalPrice) || totalPrice === 0 ? (
                  <div className="text-3xl font-medium">₹ {individualPropertyData?.propertyInfo.price}/-</div>
                ) : (
                  <div className="text-3xl font-medium">₹ {totalPrice}/-</div>
                )}

                <div className='flex justify-center m-4 p-2 gap-3'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Check In"
                      value={checkIn}
                      minDate={new Date()}
                      onChange={(newValue) => {
                        setCheckIn(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      inputProps={{}} // Set inputProps to an empty object to prevent Mui-error class from being added
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      size="small"
                      label="Check Out"
                      minDate={new Date()}
                      value={checkOut}
                      onChange={(newValue) => {
                        setCheckOut(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <div class="custom-number-input -mt-6">
                    <label for="custom-input-number" class="w-full text-gray-700 text-sm font-semibold">Guests
                    </label>
                    <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent ">
                      <button onClick={(e) => {
                        if (guests <= 1) {
                        } else {
                          setGuests(guests - 1)
                        }
                      }} data-action="decrement" class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l m-2 cursor-pointer outline-none">
                        <span class="m-auto text-2xl font-thin">−</span>
                      </button>
                      <span className=' mt-4 text-xl'>{guests}</span>

                      <button onClick={(e) => {
                        setGuests(guests + 1)
                      }} data-action="increment" class="bg-gray-300 text-gray-600 m-2 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                        <span class="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
              <div className='flex justify-center m-2 p-2 gap-3'>

                <button onClick={handleAvailability} class="bg-white mr-4 mt-2 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4  border border-gray-400 rounded-full shadow">
                  {loading ? <LoadingSmall /> : 'Check Availability'}
                </button>

                <div className="mt-4 flex">
                  <div className="text-sm mr-2 text-gray-600">Availability:</div>
                  {
                    error ? (<div className='text-sm text-red-500 font-medium font-style: italic'>Not Available</div>) : (<div className={availabilityData ? 'text-emerald-500 text-sm font-medium' : 'text-sm font-style: italic '}>{availabilityData ? availabilityData.message : '-'}</div>)
                  }

                </div>
              </div>

              <div className='flex justify-center m-4 p-2 gap-3'>
                <div className="mt-2">
                  <button onClick={() => {
                    naviagteHandler()
                  }} disabled={disabled} className={disabled ? 'bg-white hover:bg-gray-100 text-gray-200 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow' : 'bg-green-500 text-white font-semibold py-2 px-4 border border-gray-400 rounded-full shadow'}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className='flex'>
            <h4 class="text-sm mb-2 font-bold sm:text-xl mr-2  text-gray-500">Review this property</h4>
            <button onClick={() => { setOpen(true) }} class="bg-white mb-2 hover:bg-gray-100 text-gray-500 font-semibold border-gray-400  text-3xl shadow">
              +
            </button>
          </div>
          <h4 class="text-sm mb-2 font-bold sm:text-sm text-gray-500">Share your thoughts with other customers</h4>
          <h2 class="text-xl font-bold sm:text-2xl">Customer Reviews</h2>


          <div class="mt-4 flex items-center">
            <p class="text-3xl font-medium">
              {individualPropertyData?.propertyInfo.averageRating}
              <span class="sr-only"> Average review score </span>
            </p>

            <div class="ml-4">
              <div class="-ml-1 flex">
                {individualPropertyData?.propertyInfo?.averageRating && (
                  <Rating name="half-rating-read"
                    defaultValue={individualPropertyData?.propertyInfo?.averageRating}
                    precision={0.5}
                    readOnly
                  />
                )}
              </div>

              <p class="mt-0.5 text-xs text-gray-500">Based on {individualPropertyData?.propertyInfo
                .reviews.length} reviews</p>
            </div>
          </div>


          <div class="mt-8 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
            {
              individualPropertyData?.propertyInfo?.reviews?.map((data, i) => (
                <blockquote>
                  <header class="sm:flex sm:items-center">
                    <div class="-ml-1 flex">
                      <Rating name="half-rating" defaultValue={data.rating} precision={0.5} readOnly />
                    </div>

                    <p class="mt-2 font-medium sm:ml-4 sm:mt-0">
                      {data.title}
                    </p>
                  </header>

                  <p class="mt-2 text-gray-700">
                    {data.description}
                  </p>

                  <footer class="mt-4">
                    <p class="text-xs text-gray-500">{data.user}{data.createdAt}</p>
                  </footer>
                </blockquote>
              ))
            }

          </div>
        </div>
      </section>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add a review
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </Typography>
          <div className='m-4'>
            <Typography>
              <TextField
                onChange={(e) => { setTitle(e.target.value) }}
                id="standard-multiline-flexible"
                label="Title"
                multiline
                maxRows={4}
                variant="standard"
              />
            </Typography>
          </div>

          <Typography gutterBottom>

            <TextField
              fullWidth
              rows={6}
              onChange={(e) => { setDescription(e.target.value) }}
              label="Description"
              id="fullWidth"
              style={{ height: 100 }}
            />
          </Typography>

          <Typography gutterBottom>
            We value your feedback. Please keep your reviews respectful and constructive!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => { submitHandlder() }}>
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Review Submitted!
        </Alert>
      </Snackbar>
      <Footer />

    </div>
  )
}

export default ProductPage