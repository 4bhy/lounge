import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Header/Navbar'

import PropertyCard from '../../components/HostComponents/PropertyCard.js/PropertyCard'
import HostBarGraph from '../../components/HostComponents/Stats/HostPieChart'
import HostTable from '../../components/HostComponents/Table/HostTable'


const HostDashboard = () => {
    return (
        <div>
            <Navbar/>
            <HostBarGraph/>
            <HostTable/>
            <PropertyCard/>
            <Footer />
        </div>
    )
}

export default HostDashboard
