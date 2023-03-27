import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BasicMenu from '../Avatar/UserAvatar'
import LoggedOutMenu from '../Avatar/LoggedOutMenu'
import { useDispatch } from 'react-redux'
import logo from './lounge-high-resolution.png'


import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { userLogout } from '../../features/users/userLoginSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()

  return (
    <div>
      <header aria-label="Page Header" class="bg-gray-50">
        <div class="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class='justify-evenly justify-items-start'>
              <a href="#">
                <Link to="/"><img src={logo} alt="Logo" class="h-8" /></Link>
              </a>
            </div>

            <Link to="/host "><div class="relative">
              <label class="sr-only" for="search"> Search </label>

              <input
                class="h-10 w-full rounded-full border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
                id="search"
                disabled
                type="search"
                placeholder="Host With Us" />

              <button
                type="button"
                class="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700">
                <span class="sr-only">Submit Search</span>
                <i class="fa fa-envelope-open" aria-hidden="true"></i>
              </button>
            </div></Link>
          </div>

          <div class="flex items-center gap-4">
            <Link to="/findmore">
              <a class="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700">
                <i class="fa fa-compass" aria-hidden="true"></i>
              </a>
            </Link>

            <span
              aria-hidden="true"
              class="block h-6 w-px rounded-full bg-gray-200"
            ></span>
            {
              userInfo ?
                (<div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>

                    <div class="block shrink-0 shadow-sm rounded-full p-2">
                      <span class="sr-only">Profile</span>
                      <a class="text-2xl text-gray-600 rounded-full object-cover antialiased font-style: italic">
                        {userInfo?.user?.name.charAt(0)}
                      </a>
                    </div>
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <Link to="/dashboard"><MenuItem>Dashboard</MenuItem></Link>
                    {userInfo?.host?.hostAccess == true ? <Link to="/host/dashboard"><MenuItem>Host Profile</MenuItem></Link> : null}
                    <MenuItem onClick={() => {
                      dispatch(userLogout())
                      navigate("/")
                      localStorage.removeItem("userInfo");
                    }}>Logout</MenuItem>
                  </Menu>

                </div>) : (
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}>

                      <a href="#" class="block shrink-0">
                        <span class="sr-only">Profile</span>
                        <img
                          alt="Man"
                          src="https://png.pngtree.com/png-clipart/20220113/ourmid/pngtree-cartoon-hand-drawn-default-avatar-png-image_4156609.png"
                          class="h-10 w-10 rounded-full object-cover"
                        />
                      </a>
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >

                      <Link to="/login"><MenuItem onClick={handleClose}>Login</MenuItem></Link>
                      <Link to="/register"><MenuItem onClick={handleClose}>Register</MenuItem></Link>
                    </Menu>

                  </div>
                )
            }
          </div>
        </div>
      </header>

    </div>

  )
}

export default Navbar


