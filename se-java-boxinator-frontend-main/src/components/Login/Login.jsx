import { useNavigate } from "react-router-dom";
import KeycloakService from "../../services/KeycloakService"
import { useEffect } from "react"
import './Login.css'

//Login page 
const Login = () => {


    const navigate = useNavigate();

    //check if user is logged in, then navigate to dashboard page
    useEffect(() => {
        if (KeycloakService.isLoggedIn()) {
            navigate('/dashboard')
        }
    }, [])

    const handleLoginClick = () => {
        KeycloakService.doLogin();
    }

    //function for navigating to guest page
    function redirect() {
        navigate("/guest")
    }

    return (
        <div className="">
            <div className="title">
                <h1>Boxinator</h1>

                <h1>Welcome To Boxinator!</h1>
            </div>

            <div className="flex flex-col justify-evenly border-red-200 gap-4 p-5">
                <p className="text-lg font-semibold">
                    An application designed for calculating the shipping cost for mystery
                    boxes to specific locations around the world. You can try sending a package as a guest or login/register as a user! 📦
                </p>
                <p className="text-lg font-bold">Do you want to log in or continue as a guest?</p>

                <div className="flex flex-wrap justify-evenly items-center">
                    <button onClick={handleLoginClick} className="bg-[#FFA737] appearance-none hover:text-white font-bold hover:bg-[#DC851F] border-gray-200 py-2 px-4 text-grey-700 text-xl leading-tight min-w-[10rem]">User</button>
                    <button onClick={redirect} className="bg-[#FC4F4F] appearance-none hover:text-white font-bold hover:bg-[#E83A14] py-2 px-4 text-gray-700 text-xl leading-tight min-w-[10rem]">Guest</button>
                </div>
            </div>
        </div>
    )

}

export default Login;