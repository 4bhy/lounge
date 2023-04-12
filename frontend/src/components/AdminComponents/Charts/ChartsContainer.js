import React from 'react'
import { LineChart } from 'recharts'
import BarGraph from './Bar'
import NewPie from './NewPie'

import Spider from './Spider'
import Stats from './Stats'



const ChartsContainer = () => {
  return (
    <div>
     <Stats/>
     <Spider/>
    </div>
  )
}

export default ChartsContainer
