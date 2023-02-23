import React from 'react'
import Footer from '../../components/Footer/Footer'
import HostNavbar from '../../components/Header/HostNavbar'

import PropertyCard from '../../components/HostComponents/PropertyCard.js/PropertyCard'
import HostTable from '../../components/HostComponents/Table/HostTable'
import Table from '../../components/HostComponents/Table/Table'

const HostDashboard = () => {
    return (
        <div>
            <HostNavbar/>
            <HostTable/>
            <PropertyCard/>
            <Footer />
        </div>
    )
}

export default HostDashboard
