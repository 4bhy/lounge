import React from 'react'

import CardContainer from '../../components/Cards/CardContainer'
import CTA from '../../components/Cards/CTA'
import Footer from '../../components/Footer/Footer'
import Bannner from '../../components/Header/Bannner'
import Navbar from '../../components/Header/Navbar'

const LandingScreen = () => {
  return (
    <div>
      <Navbar />
      <Bannner />
      <CTA />
      <CardContainer />
    
      <Footer />
    </div>
  )
}

export default LandingScreen