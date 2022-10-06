import { useNavigate } from "react-router-dom";
import GuestForm from "../components/Guest/GuestForm"

//Guest page view
const Guest = () => {
    const navigate = useNavigate();

    function redirect() {
        navigate("/login")
    }
    return (
        <>
            <div className="title">
                <h1 className="home-btn" onClick={redirect}>Boxinator</h1>
                <h1>Enter Package Information Below!</h1>
            </div>
            <div id="guest-form" className="flex flex-col">
                <GuestForm />
            </div>
        </>
    )
}
export default Guest