import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Header/Navbar'

import PropertyCard from '../../components/HostComponents/PropertyCard.js/PropertyCard'
import HostTable from '../../components/HostComponents/Table/HostTable'


const HostDashboard = () => {
    return (
        <div>
            <Navbar/>
            <HostTable/>
            <PropertyCard/>
            <Footer />
        </div>
    )
}

export default HostDashboard
