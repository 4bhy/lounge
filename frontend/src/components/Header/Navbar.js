import React from 'react'
import { Link } from 'react-router-dom'
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
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo, "header");
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

            <div class="relative">
              <label class="sr-only" for="search"> Search </label>

              <input
                class="h-10 w-full rounded-full border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
                id="search"
                type="search"
                placeholder="Search website..."
              />

              <button
                type="button"
                class="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              >
                <span class="sr-only">Submit Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
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
                    onClick={handleClick}
                  >

                    <a href="#" class="block shrink-0">
                      <span class="sr-only">Profile</span>
                      <img
                        alt="Man"
                        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
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
                    <Link to="/dashboard"><MenuItem>Dashboard</MenuItem></Link>
                    {userInfo.host.hostAccess == true ? <Link to="/host/dashboard"><MenuItem>Host Profile</MenuItem></Link> : null}
                    <MenuItem onClick={() => {
                      dispatch(userLogout())
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

                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <Link to="/login"><MenuItem onClick={handleClose}>Login</MenuItem></Link>
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


