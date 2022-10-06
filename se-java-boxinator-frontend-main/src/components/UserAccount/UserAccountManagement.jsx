import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import KeycloakService from "../../services/KeycloakService";
import withKeycloak from "../../hoc/withKeycloak";
import { getUserData, updateUserData } from "../../api/AccountAPI";
import debounce from "lodash/debounce";
import { getCountryData } from "../../api/ShipmentAPI";
import './UserAccount.css'

//
const UserAccountManagement = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    //state for setting account information
    const [account, setAccount] = useState([]);
    const [editAccount, setEditAccount] = useState(false);
    const [dob, setDob] = useState('')
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        //function for getting specific user data/information
        const fetchAccountData = async () => {
            const [error, account] = await getUserData();

            if (error != null) {
                console.log(error);
                return;
            }

            setAccount(account);
            setDob(new Date(account.dob).toISOString().split("T")[0])
        }

        //function for getting country data
        const getCountryState = async () => {
            const [error, payload] = await getCountryData();
            if (error != null) {
                console.log(error);
                return;
            }
            setCountries(payload);
            debounce(async () => {
                setCountries(await payload);
            }, 300)
        }

        getCountryState();
        fetchAccountData()
    }, [])

    //function for updating a specific user with new information/data
    const onSubmit = async (data, e) => {
        e.preventDefault();

        let date = new Date(data.dob).getTime();
        const [error, account] = await updateUserData(date, data.postal_code, data.contact_number, data.country)

        if (error != null) {
            console.log(error);
            return;
        }
        setAccount(account)
        setDob(new Date(account.dob).toISOString().split("T")[0])

        setEditAccount(false);
    }

    //function for edit account modal
    const handleEditAccount = () => {
        setEditAccount(true)
    }

    //function for setting date of birth to state
    const handleDateChange = (e) => {
        setDob(e.value);
    }

    return (
        <div id="management-wrapper" className="flex flex-col items-center gap-4">
            <h2 className="text-4xl underline">Account Management</h2>
            {!editAccount && <div id="account-management" className="flex flex-col border-1 max-w-3xl gap-2">
                <p className="mr-auto text-xl">First name: {KeycloakService.getParsedToken().given_name}</p>
                <p className="mr-auto text-xl">Last name: {KeycloakService.getParsedToken().family_name}</p>
                <p className="mr-auto text-xl">Email: {KeycloakService.getParsedToken().email}</p>
                <p className="mr-auto text-xl">Date of Birth: {dob}</p>
                <p className="mr-auto text-xl">Postal code: {account?.postalCode}</p>
                <p className="mr-auto text-xl">Contact number: {account?.contactNumber}</p>
                <p className="mr-auto text-xl">Country: {account?.country}</p>
                <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={handleEditAccount}>Edit account</button>
            </div>
            }
            {editAccount && <div id="account-management" className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <p className="mr-auto text-xl">First name: {KeycloakService.getParsedToken().given_name}</p>
                    <p className="mr-auto text-xl">Last name: {KeycloakService.getParsedToken().family_name}</p>
                    <p className="mr-auto text-xl">Email: {KeycloakService.getParsedToken().email}</p>
                </div>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>

                    <div className="mr-auto flex items-center justify-between w-full">
                        <label htmlFor="dob" className="text-xl" >Date of birth: </label>
                        <input type="date" id="start" name="dob" min="1900-01-01" max="2030-12-31" {...register("dob")} value={dob} onChange={handleDateChange} />
                    </div>

                    <div className="mr-auto flex items-center justify-between w-full">
                        <label htmlFor="postalCode" className="text-xl">Postal Code: </label>
                        <input type="text" placeholder="Postal Code" name="postalCode" {...register("postal_code")} value={account.postal_code} />
                    </div>

                    <div className="mr-auto flex items-center justify-between w-full gap-2">
                        <label htmlFor="contactNumber" className="text-xl">Contact Number: </label>
                        <input type="text" placeholder="Contact Number" name="contactNumber" {...register("contact_number", { pattern: /^[0-9]+$/ })} value={account.contact_number} />
                    </div>

                    <div className="mr-auto flex items-center justify-between w-full gap-2">
                        <label htmlFor="destination-country" className="destinationcountry text-xl">Select Country: </label>

                        <select className="w-56" name='destination-country' {...register("country")} defaultValue={countries.findIndex((country) => country.name === account.country) + 1}>
                            <option disabled>Destination Country</option>
                            {countries.map((data, key) => {
                                return <option key={key} value={data.name}>{data.name}</option>
                            })}
                        </select>
                    </div>

                    {errors.contact_number && <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">❗Please provide a number❗</p>}
                    <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" type="submit">Update Information</button>
                    <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={() => setEditAccount(false)} >Cancel</button>
                </form>
            </div>}
        </div>
    )
}

export default withKeycloak(UserAccountManagement)
