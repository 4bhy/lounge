import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getHostStats } from '../../../actions/hostActions';

const HostPieChart = () => {

    const dispatch = useDispatch()
    const { stats } = useSelector((state) => state.hostStats)

    useEffect(() => {
        dispatch(getHostStats())
    }, [])

    const getIntroOfPage = (label) => { 
        return '';
    };


    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                    <p className="intro">{getIntroOfPage(label)}</p>
                   
                </div>
            );
        }

        return null;
    };

    return (

        <div className='h-48'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={stats?.report}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="pname" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="totalAmount" barSize={20} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default HostPieChart
