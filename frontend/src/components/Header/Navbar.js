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
      <header aria-label="Page Header" className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className='justify-evenly justify-items-start'>
              <span >
                <Link to="/"><img src={logo} alt="Logo" className="h-8" /></Link>
              </span>
            </div>

            <Link to="/host "><div className="relative">
              <label className="sr-only"> Search </label>

              <input
                className="h-10 w-full rounded-full border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
                id="search"
                disabled
                type="search"
                placeholder="Host With Us" />

              <button
                type="button"
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700">
                <span className="sr-only">Submit Search</span>
                <i className="fa fa-envelope-open" aria-hidden="true"></i>
              </button>
            </div></Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/findmore">
              <span className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700">
                <i className="fa fa-compass" aria-hidden="true"></i>
              </span>
            </Link>

            <span
              aria-hidden="true"
              className="block h-6 w-px rounded-full bg-gray-200"
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
                    <div className="block shrink-0 shadow-sm rounded-full p-2">
                      <span className="sr-only">Profile</span>
                      <span className="text-2xl text-gray-600 rounded-full object-cover antialiased font-style: italic">
                        {userInfo?.user?.name.charAt(0)}
                      </span>
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

                      <span  className="block shrink-0">
                        <span className="sr-only">Profile</span>
                        <img
                          alt="Man"
                          src="https://png.pngtree.com/png-clipart/20220113/ourmid/pngtree-cartoon-hand-drawn-default-avatar-png-image_4156609.png"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </span>
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


