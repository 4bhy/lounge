import React from 'react'
import CardContainer from '../../components/Cards/CardContainer'
import StoreHead from '../../components/Cards/StoreHead'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Header/Navbar'

const FindMore = () => {
  return (
    <div>
        <Navbar/>
        {/* <StoreHead/> */}
        <CardContainer/>
        <Footer/>
    </div>
  )
}

export default FindMore