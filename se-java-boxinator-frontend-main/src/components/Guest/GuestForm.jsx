import emailjs from "emailjs-com"
import React, { useState } from "react"
import { useForm } from "react-hook-form";
import { createShipment, getCountryData } from "../../api/ShipmentAPI";
import { ChromePicker } from "react-color";
import KeycloakService from "../../services/KeycloakService";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import './Guest.css'
import 'react-toastify/dist/ReactToastify.css'

const GuestForm = ({updateShipments}) => {

    //state for colorpicker, countries and modal
    const [color, setColor] = useState('#FFFFFF');
    const [show, setShow] = useState(false)
    const [country, setCountries] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm()

    //function for checking if user is logged in
    const isLoggedIn = () => KeycloakService.isLoggedIn();

    //function for changing color in color picker
    const handleColorChange = (color, event) => {
        setColor(color.hex);
    }

    const handleClose = () => {
        setShow(false)
    }

    //function for sending emails 
    const sendEmail = (e) => {
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE, process.env.REACT_APP_EMAILJS_TEMPLATE, e.target, process.env.REACT_APP_EMAILJS_USER_ID)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    //function for creating a new shipment in guest form
    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log(data.country);
        const [error, payload] = await createShipment(data.receiverName, color, data.weightOption, data.sender, data.country)

        if (error != null) {
            toast.error(error);
            return;
        }

        toast.success('Shipment sent!')
        if(updateShipments != null){
            updateShipments();
        }

        //check if user is not logged in, for sending email
        if (!isLoggedIn()) {
            sendEmail(e);
            toast.info('Confirmation mail sent to ' + data.sender)
        }
        e.target.reset();
    }

    useEffect(() => {

        //function for getting country data for guest form
        const getCountryState = async () => {
            const [error, payload] = await getCountryData();
            if (error != null) {
                console.log(error);
                return;
            }
            setCountries(payload);

        }

        getCountryState();
    }, [])

    return (
        <>
            <div className="guest-wrapper">

                <div className="flex flex-col items-center">

                    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>

                        {!isLoggedIn() && <div className="mr-auto flex items-center justify-between w-full">
                            <label htmlFor="sender">Sender Email: </label>
                            <input type="text" className="" placeholder="johndoe@live.se" name="sender" {...register("sender", {
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: '❗Invalid email format❗'
                                },
                                required: '❗Sender is required❗'
                            })}>
                            </input>
                        </div>}

                        <div className="mr-auto flex items-center justify-between w-full">
                            <label htmlFor="receiverName" className="receiver-fullname">Receiver: </label>
                            <input type="text" className="receiverFullName" placeholder="John Doe" name="receiverName" {...register("receiverName", { pattern: { value: /[a-zA-Z]+/, message: '❗Invalid receiver name❗' }, required: '❗Receiver is required❗' })}></input>
                        </div>

                        <div className="mr-auto flex items-center justify-between w-full gap-2">
                            <label htmlFor="destination-country" className="destinationcountry">Select Country: </label>

                            <select className="w-56" name='destination-country' defaultValue={"Destination Country"} {...register("country", { required: true, validate: v => v !== 'Destination Country' })}>
                                <option disabled>Destination Country</option>
                                {country.map((data, key) => {
                                    return <option key={key} value={data.name}>{data.name}</option>
                                })}
                            </select>
                        </div>

                        <div className="mr-auto flex items-center justify-between w-full">
                            <label htmlFor="weightOption">Select Weight Option: </label>
                            <select id="select-weight" name="weightOption" {...register("weightOption", { required: true })}>
                                <option value={2}>2KG</option>
                                <option value={5}>5KG</option>
                                <option value={8}>8KG</option>
                            </select>
                        </div>

                        <div className="mr-auto relative flex justify-between w-full">
                            <label htmlFor="boxColor">Box Color: </label>
                            <input hidden name="boxColor" value={color} readOnly />
                            <div name="boxColor" className="w-20 h-6 border-2 rounded-md " style={{ backgroundColor: color }} onClick={(e) => { setShow(true) }} ></div>
                            {show && <div className="absolute -right-56 -top-24">
                                <div className="fixed top-0 right-0 left-0 bottom-0" onClick={handleClose}></div>
                                <ChromePicker className=""
                                    color={color}
                                    onChange={handleColorChange}
                                />
                            </div>}
                        </div>

                        <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" type="submit" onClick={handleSubmit}>Send Package!</button>

                        {errors.sender && <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{errors.sender.message}</p>}
                        {errors.receiverName && <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{errors.receiverName.message}</p>}
                        {errors.country && <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">❗Country is required❗</p>}

                    </form>
                </div>
            </div>
            <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
        </>
    )
}
export default GuestForm