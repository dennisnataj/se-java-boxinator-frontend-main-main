import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getCountryData, updateCountryData } from "../../api/CountryAPI";
import { toast, ToastContainer } from "react-toastify";
import './Country.css'

const MultiplierForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    //state for storing countries in multiplier form
    const [country, setCountries] = useState([]);

    //function for getting country multiplier data on page mount
    useEffect(() => {
        const fetchMultiplierData = async () => {
            await getCountryData();
        }
        fetchMultiplierData()
    }, [])

    //setting country state with country data
    useEffect(() => {
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

    //function for updating the country multiplier 
    const onSubmit = (data, e) => {
        e.preventDefault();
        updateCountryData(data.country, data.multiplier)
        toast.success('Updated country multiplier!')
        e.target.reset();
    }

    return (
        <>
            <div className="container flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} >
                    
                    <div className="mr-auto flex items-center justify-between w-full">
                        <label id="country-label" htmlFor="guest-email" className="guest-email">
                            Country:
                        </label>
                        <select id="select-country" name="countryOption" className="w-56" {...register("country")}>
                            <option>Choose Country</option>
                            {country.map((data, key) => {
                                return <option key={key} value={data.id}>{data.name}</option>
                            })}
                        </select>
                    </div>

                    <div className="mr-auto flex items-center justify-between w-full">
                        <label id="multiplier-label" htmlFor="multiplier-country" className="multipliercountry" name="multiplier">
                            Multiplier:
                        </label>
                        <input type="text" required="number" className="multiplier w-56" placeholder="5" name="multiplier" {...register("multiplier", { pattern: /^[0-9]+$/ })}>
                        </input>
                    </div>
                    {errors.multiplier && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">❗Please provide a number❗</p>}
                    <button id="country-btn" type="submit" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-3 border-b-4 border-green-700 hover:border-green-500 rounded">Update Multiplier</button>
                </form>
            </div>
            <ToastContainer theme="colored" position="bottom-right" hideProgressBar/>
        </>
    )
}
export default MultiplierForm