import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getHostStats } from '../../../actions/hostActions';

const HostPieChart = () => {

    const data = [
        {
            name: 'Page A',
        
            pv: 2400,
        
        },
        {
            name: 'Page B',
        
            pv: 2800,
        
        },
      
    ];

    const dispatch = useDispatch()

    
    const { stats } = useSelector((state) => state.hostStats)

    useEffect(() => {
      
        dispatch(getHostStats())
    }, [])

    return (

        <div className='h-48'>
            <ResponsiveContainer width="50%" height="100%">
                <BarChart
                    width={50}
                    height={300}
                    data={stats.report}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="pname" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="totalAmount" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        </div>

    )
}

export default HostPieChart
