import React, { PureComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { getStat } from '../../../actions/adminActions';

const Spider = () => {


  const dispatch = useDispatch();
  const { statsData } = useSelector((state) => state.stats)

  useEffect(() => {
    dispatch(getStat())
  }, [])


  return (

    <div className='h-screen mt-16'>
      <div style={{ width: '100%' }}>


        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={900}
            height={600}
            data={statsData?.salesReport}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hotelName" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalSales" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <p></p>

      </div>
    </div>
  )
}

export default Spider
