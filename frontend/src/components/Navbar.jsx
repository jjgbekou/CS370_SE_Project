import { Link } from "react-router-dom"
import { managerRoutes, adminRoutes } from "../data/routes"
import logo from "../assets/Truman_Bulldogs_logo.svg.png"
import { useNavigate } from "react-router-dom"

export function Navbar() {

    let user = JSON.parse(sessionStorage.getItem("User"))
    let view = user.view
    let userId = user.userId
    let navigate = useNavigate()

    const userRoutes = [
        {
            name: "Schedule",
            path: '/home'
        },
        {
            name: "Desk Availability",
            path: '/da_availability'
        },
        {
            name: "My Schedule",
            path: `/myschedule/${userId}`
        }
    ]
    
    function handleLogout() {
        sessionStorage.removeItem("User")
        navigate('/')
    }

    return (
        <nav className="bg-truman-purple border-gray-200 bg-gray-900 w-screen fixed top-0 left-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/home" className="flex items-center w-24 space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">TruFlow</span>
            </Link>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button type="button" onClick={handleLogout} className="flex p-2 mr-16 text-sm bg-truman-blue border-4 border-solid border-black rounded-md focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button">
                    Logout
                </button>
            
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                    <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <Link href="/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
                    </li>
                    <li>
                        <Link href="/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</Link>
                    </li>
                    <li>
                        <Link to ="/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                    </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul className="flex flex-col font-medium md:p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {view === "User" &&
                userRoutes.map((route, key) => {
                    return (
                        <li key={key}>
                            <Link to={route.path} className="block py-2 px-3 bg-truman-blue text-black rounded-md" aria-current="page">
                                {route.name}
                            </Link>
                        </li>
                    )
                })}
                {view === "Manager" &&
                managerRoutes.map((route, key) => {
                    return (
                        <li key={key}>
                            <Link to={route.path} className="block py-2 px-3 text-black bg-truman-blue rounded-md" aria-current="page">
                                {route.name}
                            </Link>
                        </li>
                    )
                })}
                {view === "Admin" &&
                adminRoutes.map((route) => {
                    return (
                        <li>
                            <Link to={route.path} className="block py-2 px-3 text-black bg-truman-blue rounded-md" aria-current="page">
                                {route.name}
                            </Link>
                        </li>
                    )
                })}
                </ul>
            </div>
            </div>
        </nav>
    )
}