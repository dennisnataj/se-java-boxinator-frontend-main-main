import { useEffect, useState } from "react";
import { changeShipmentState, getShipmentStatuses } from "../../api/ShipmentAPI";

//component for updating shipment status in dashboard
const ShipmentItem = ({shipment, updateShipments, completedShipments}) => {

    //state for showing statuses on page
    const [status, setStatus] = useState('');
    //state for setting and changing statuses
    const [statuses, setStatuses] = useState([]);

    //function for changing shipment status
    const handleStatusChange = async (event) => {
        setStatus(event.target.value)
        const [error] = await changeShipmentState(shipment.id, event.target.value)

        if (error != null) {
            console.log(error);
            return;
        }

        updateShipments();
        completedShipments();
    }

    useEffect(() => {
        //function for getting shipment statuses
        const getStatuses = async () => {
            const [error, payload] = await getShipmentStatuses();
            if(error != null) {
                console.log(error);
                return;
            }
            
            setStatuses(payload);
        }
        getStatuses();
    },[])

    return (
        <li className={`shipment-item bg-[${shipment.boxColor}] bg-opacity-50`} >
            <p>Receiver: {shipment.receiverName} - Status: {shipment.status}</p>
            Box Color: {shipment.boxColor} Weight: {shipment.weightOption} Cost: {shipment.cost} NOK
            <br></br>
            <select name='status' onChange={handleStatusChange} defaultValue={"Choose status"}>
                <option disabled>Choose status</option>
                {statuses.map((status, key) => {
                    return <option key={key}>{status.status}</option>
                })}
            </select>
        </li>
    )
}

export default ShipmentItem;