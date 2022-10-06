import React, { useEffect, useState } from 'react'
import withKeycloak from '../../hoc/withKeycloak';
import KeycloakService from '../../services/KeycloakService'
import './Dashboard.css'
import { getAllShipments, getCompletedShipments, getShipmentStatuses } from '../../api/ShipmentAPI';
import ShipmentItem from '../Shipment/ShipmentItem';
import ShipmentModal from '../Shipment/ShipmentModal';
import CountryMultiplierModal from '../Country/CountryMultiplierModal';


//Dashboard component
const Dashboard = () => {

  //state for shipments and completed shipments
  const [shipments, setShipments] = useState([]);
  const [completedShipments, setCompletedShipments] = useState([]);


  //function for setting completed shipments in state
  const updateCompletedShipments = async () => {
    const [error, completedShipments] = await getCompletedShipments();
    if (error != null) {
      console.log(error);
      return;
    }
    setCompletedShipments(completedShipments);
  }

  //function for getting all shipments in state
  const updateShipments = async () => {
    const [error, shipments] = await getAllShipments();
    if (error != null) {
      console.log(error);
      return;
    }
    setShipments(shipments);
  }

  //calling functions on mount
  useEffect(() => {

    getShipmentStatuses();
    updateCompletedShipments();
    updateShipments();
  }, [])



  return (
    <div className='main-page-wrapper'>
      <div className="user-info">
        <h1 className="font-medium leading-tight text-3xl mt-0 mb-2 text-slate-700">Welcome {KeycloakService.getGivenName()} {KeycloakService.getUsername()}</h1>
      </div>
      <br></br>
      <h4>Current shipments:</h4>

      <ul>
        {shipments.map((shipment) => {
          return <ShipmentItem key={shipment.id} shipment={shipment} updateShipments={updateShipments} completedShipments={updateCompletedShipments} />
        })}
      </ul>
      <h4>Completed shipments:</h4>

      <ul>
        {completedShipments.map((shipment) => {
          return <li className='shipment-item' key={shipment.id}><p>Receiver: {shipment.receiverName} - Status: {shipment.status}</p>
            Box Color: {shipment.boxColor} Weight: {shipment.weightOption} Cost: {shipment.cost} NOK</li>
        })}
      </ul>
      <ShipmentModal updateShipments={updateShipments} />
      {KeycloakService.hasRole('Administrator') ? <CountryMultiplierModal /> : null}
    </div>
  )
}

export default withKeycloak(Dashboard);
