import axios from 'axios';
import React, { useState } from 'react';

const FilterPage = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [sensorData, setSensorData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    
    const showData = () =>{
        console.log('mitansh')
        console.log(startDate);
        console.log(endDate);
        const obj = {
            startDate: startDate,
            endDate: endDate
        }

        axios.post('http://localhost:4500/getData',obj)
        .then((res)=> setSensorData(res.data))
        .catch(err => console.log(err))
        
        setShowTable(true)
        console.log(sensorData)
    }

    return ( <div>
        <h1 className="heading">Set Filters for display Historical Data</h1>
        <div className='filter-container'>
            <label>Start Date:
                <input type="date" onChange={(e)=> setStartDate(e.target.value)} value={startDate} />
            </label>
            <label>End Date:
                <input type='date' onChange={(e)=> setEndDate(e.target.value)} value={endDate} />
            </label>
            <button onClick={showData}>Display Data</button>
        </div>
        {showTable ?  <table>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Temperature</th>
                        <th>Battery Level</th>
                        <th>Time Stamp</th>
                    </tr>
                </thead>
                <tbody>
                    {sensorData.length? sensorData.map((item,index) => <TableRow index={index} item = {item} />) : <tr><td colSpan="4">There is no data</td></tr>}
                </tbody>
            </table> : ""}
    </div> );
}
 
export default FilterPage;

const TableRow = ({item,index}) => {
    return ( <tr>
        <td>{index + 1}</td>
        <td>{`${item.temperature}`}<sup>o</sup> C</td>
        <td>{`${item.batteryLevel}%`}</td>
        <td>{item.timeStamp}</td>
    </tr> );
}