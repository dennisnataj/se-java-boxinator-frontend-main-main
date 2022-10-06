import { NavLink } from "react-router-dom"
import KeycloakService from "../../services/KeycloakService"
import './Navbar.css'

const NavbarUserMenu = () => {

	//function for handling user logout
	const handleLogoutClick = () => {
		if (window.confirm('Are you sure?')) {
			KeycloakService.doLogout()
		}
	}

	return (
		<ul className="NavbarMenu NavbarMenuRight text-3xl font-bold underline">
			{KeycloakService.isLoggedIn() && <li className="NavbarMenuItem">
				<NavLink activeclassname="NavbarActive" to="/dashboard">Dashboard</NavLink>
			</li>}
			{KeycloakService.isLoggedIn() && <li className="NavbarMenuItem">
				<NavLink activeclassname="NavbarActive" to="/account">
					Account
				</NavLink>
				<button className="inline-block px-6 py-2.5 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg" onClick={handleLogoutClick}>Logout</button>

			</li>}

		</ul>

	)
}
export default NavbarUserMenu