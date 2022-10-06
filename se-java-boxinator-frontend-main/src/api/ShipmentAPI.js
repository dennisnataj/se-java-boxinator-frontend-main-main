import {BASE_URL } from ".";
import { authorizationHeaderInfo } from "./helper";

//endpoint for creating a shipment
export async function createShipment(receiverName, boxColor,weightOption, sender, country) {

    try {
        const response = await fetch(`${BASE_URL}shipments`, {
            method: 'POST',
            headers: authorizationHeaderInfo(),

            body:JSON.stringify({
                shipment: {
                    receiverName: receiverName,
                    boxColor: boxColor,
                    weightOption: weightOption,
                    destinationCountry: country
                },
                guest: sender
            })
        })

        if(!response.ok) {
            throw new Error('Could not create order')
        }

        let data = await response.json();

        return [null, data.payload]
        
    }catch(err){
        return [err.message, null]
    }
       
}

//endpoint for getting all shipment data
export const getAllShipments = async () => {

    try {
        const response = await fetch(`${BASE_URL}shipments`,{
            method: 'GET',
            headers: authorizationHeaderInfo()

        });

        if(!response.ok) {
            throw new Error("Something went wrong...");
        }

        const data = await response.json();

        return [null, data.payload];

    } catch (error) {
        return [error.message, null];
    }

}

export const getShipmentStatuses = async () => {

    try {
        const response = await fetch(`${BASE_URL}status`,{
            method: 'GET',
            headers:authorizationHeaderInfo()
        });
    
        if(!response.ok) {
            throw new Error("Something went wrong...")
        }

        const data = await response.json();

        return [null, data.payload]

    } catch (error) {
        return [error.message, null]
    }
}

export const getCompletedShipments = async () => {

    try {
        const response = await fetch(`${BASE_URL}shipments/complete`,{
            method: 'GET',
            headers:authorizationHeaderInfo()
        });
    
        if(!response.ok) {
            throw new Error("Something went wrong...")
        }

        const data = await response.json();

        return [null, data.payload]

    } catch (error) {
        return [error.message, null]
    }
}

//endpoint for getting country data
export const getCountryData = async () => {
    try {
        const response = await fetch(`${BASE_URL}settings/countries`,{
            method: 'GET',
            headers: authorizationHeaderInfo()
        });
        
        if(!response.ok){
            throw new Error("Something went wrong...");
        }

        const data = await response.json();

        return [null, data.payload]

    }catch(error){
        return [error.message, null]
    }
}

//put request for changing shipment state
export const changeShipmentState = async (id, status) => {
    let shipment;

    console.log("Inputs", id, status);
    await fetch(`${BASE_URL}shipments/${id}`, {
        method: 'PUT',
        headers: authorizationHeaderInfo(),
        
        body: JSON.stringify({
            id: id,
            status: status
           
        })
    })
    .then((response) => {
        if(!response.ok){
            throw new Error("Could not update shipment state");
        }
        return response.json();
    })
    .then((data) => {
        shipment = data
    })
    .catch(console.error)
    return [null, shipment];

}