import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Header/Navbar'
import {Link} from 'react-router-dom'
import SecondaryHero from '../../components/Body/SecondaryHero'

const HostLanding = () => {
  return (
    <div>
      <Navbar/>
    <SecondaryHero/>
   <Footer/>
    </div>
  )
}

export default HostLanding
