import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:4500';
const socket = io(ENDPOINT, { transports: ['websocket'] })

const Home = () => {

    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        socket.on('connect',() => {
            socket.emit('join', 'Hello client connected!!');
        })

        socket.on('start', (data) => {
            setSensorData([...data])
        })

        return () => {
            socket.off();
        }
    }, [])

    useEffect(() => {

        socket.on('message',(data) => {
            setSensorData([...data])
        })
        console.log(sensorData)
        return () => {
            socket.off();
        }
    }, [sensorData])



    return ( 
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Temperature</th>
                        <th>Battery Level</th>
                        <th>Time Stamp</th>
                    </tr>
                </thead>
                <tbody>
                    {sensorData?.map((item,index) => <TableRow index={index} item = {item} />)}
                </tbody>
            </table>
        </div>
     );
}
 
export default Home;

const TableRow = ({item,index}) => {
    return ( <tr>
        <td>{index + 1}</td>
        <td>{`${item.temperature}`}<sup>o</sup> C</td>
        <td>{`${item.batteryLevel}%`}</td>
        <td>{item.timeStamp}</td>
    </tr> );
}