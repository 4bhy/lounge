import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Header/Navbar'
import PropertyCard from '../../components/HostComponents/PropertyCard.js/PropertyCard'

const HostPropertyList = () => {
  return (
    <div>
      <Navbar/>
      <PropertyCard/>
      <Footer/>
    </div>
  )
}

export default HostPropertyList
