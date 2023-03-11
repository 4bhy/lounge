import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, getCoupons } from '../../../actions/adminActions';

import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from 'react-hot-toast';

const CouponTable = () => {

  const [open, setOpen] = React.useState(false);
  const [cname, setCname] = useState("")
  const [discount, setDiscount] = useState("")



  const couponData = useSelector((state) => state.couponData)

  const { couponsList } = couponData

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

  };

  const submitHandlder = async () => {
    if (!cname || !discount || !vfrom || !vto) {
      toast.error("All fields are mandatory.")
    } else {
      setOpen(false);

      dispatch(addCoupon(cname, discount, vfrom, vto))
      dispatch(getCoupons())
    }


  }

  useEffect(() => {

    dispatch(getCoupons())


  }, [])

  const [vfrom, setVfrom] = React.useState(dayjs('2022-04-07'));
  const [vto, setVto] = React.useState(dayjs('2022-04-07'));



  return (
    <div>
      <div><Toaster /></div>
      <section class="container px-4 mx-auto">


        <div class="mt-6 md:flex md:items-center md:justify-between">
          <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">

            <button class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Active
            </button>

            <button class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Expired
            </button>
          </div>

          <div class="relative flex items-center mt-4 md:mt-0">
            <button onClick={handleClickOpen} class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_3098_154395)">
                  <path d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_3098_154395">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span >Add Coupon</span>
            </button>
          </div>
        </div>


        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">State</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Discount</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Valid From</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Valid To</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Actions</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
              </tr>
            </thead>
            {
              couponsList?.coupons?.map((data, index) => (
                <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                  <tr class="hover:bg-gray-50">
                    <td class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div class="relative h-10 w-10">
                        <img
                          class="h-full w-full rounded-full object-cover object-center"
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div class="text-sm">
                        <div class="font-medium mt-2 text-gray-700">{data.couponName}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <span
                          class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                        >
                          {data.discount}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <span
                          class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                        >
                          { }
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <span
                          class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                        >
                          {data.validTo}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex justify-end gap-4">
                        <a x-data="{ tooltip: 'Delete' }" href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </a>
                        <a x-data="{ tooltip: 'Edite' }" href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            }

          </table>
        </div>

      </section>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

          <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div class="bg-white px-2 mx-8 rounded shadow-md text-black w-full">
                <h1 class="mb-8 text-2xl text-center">ADD COUPONS</h1>
                <div className='px-4'>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField onChange={(e) => { setCname(e.target.value) }} id="standard-basic" label="Coupon Name" variant="standard" />
                  </Box>
                </div>


                {/* <input
                  type="text"
                  
                  onChange={(e) => { setCname(e.target.value) }}
                  class="block border border-grey-light w-full p-4 rounded mb-4"
                  name="fullname"
                  placeholder="Coupon Name" /> */}

                {/* <input
                  onChange={(e) => { setDiscount(e.target.value) }}
                  type="text"
                  
                  class="block border border-grey-light w-full p-4 rounded mb-4"
                  name="email"
                  placeholder="Discount" /> */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div className='p-4'>

                    <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
                      <Input
                        onChange={(e) => { setDiscount(e.target.value) }}
                        id="standard-adornment-weight"
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                          'aria-label': 'Discount',
                        }}
                      />
                      <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
                    </FormControl>


                  </div>
                </Box>
                {/* <div className='p-4'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>

                      <DesktopDatePicker
                        label="For desktop"
                        value={vfrom}
                        minDate={dayjs('2017-01-01')}
                        onChange={(newValue) => {
                          setVfrom(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />

                    </Stack>
                  </LocalizationProvider>
                </div> */}
                {/* 
                <div className='p-4'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>

                      <DesktopDatePicker
                        label="For desktop"
                        value={vto}
                        minDate={dayjs('2017-01-01')}
                        onChange={(newValue) => {
                          setVto(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />

                    </Stack>
                  </LocalizationProvider>
                </div> */}


                <input
                  type="date"

                  onChange={(e) => { setVfrom(e.target.value) }}
                  class="block border border-grey-light w-full p-4 rounded mb-4"
                  name="fullname"
                  placeholder="Coupon Name" />


                <input
                  type="date"

                  onChange={(e) => { setVto(e.target.value) }}
                  class="block border border-grey-light w-full p-4 rounded mb-4"
                  name="fullname"
                  placeholder="Coupon Name" />


                {/* <div class="text-center text-sm text-grey-dark mt-4">
                  By signing up, you agree to the
                  <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                    Terms of Service
                  </a> and
                  <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                    Privacy Policy
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={submitHandlder} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default CouponTable