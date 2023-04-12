import React, { useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Header/Navbar'
import PropertyCard from '../../components/HostComponents/PropertyCard.js/PropertyCard'
import HostCardStats from '../../components/HostComponents/Stats/HostCardStats'
import HostBarGraph from '../../components/HostComponents/Stats/HostPieChart'
import HostTable from '../../components/HostComponents/Table/HostTable'


const HostDashboard = () => {

    const [toggle, setToggle] = useState("stat")

    return (
        <div>
            <Navbar />
            <div class="max-w-lg m-3">
                <div class="inline-flex shadow-sm rounded-md mb-18" role="group">
                    <button onClick={() => { setToggle("stat") }} type="button" class="rounded-l-lg border border-gray-400 bg-neutral-50 text-sm font-medium px-4 py-2 text-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                        Statitics
                    </button>
                    <button onClick={() => { setToggle("reservations") }} type="button" class="border-t border-b border-gray-400 bg-neutral-50 text-sm font-medium px-4 py-2 text-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                        Reservations
                    </button>
                    <button onClick={() => { setToggle("properties") }} type="button" class="rounded-r-md border border-gray-400 bg-neutral-50 text-sm font-medium px-4 py-2 text-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                        My Properties
                    </button>
                </div>
            </div>
            {
                toggle == "stat" && (<div> <HostCardStats /> <HostBarGraph /> </div>)
            }
            {
                toggle == "reservations" && <HostTable />
            }
            {
                toggle == "properties" && <PropertyCard />
            }
            <Footer />
        </div>
    )
}

export default HostDashboard
