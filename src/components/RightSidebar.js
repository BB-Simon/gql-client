import React from 'react';
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion';
import {CgProfile} from 'react-icons/cg'
import {FaChartPie} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {BsFilePost} from 'react-icons/bs'

const menuItems = [
    { 
        title: "Dhasboard",
        Icon: FaChartPie,
        path: "/dhasboard"
    },
    { 
        title: "Profile",
        Icon: CgProfile,
        path: "/profile"
    },
    { 
        title: "Password",
        Icon: RiLockPasswordLine,
        path: "/update-password"
    },
    { 
        title: "Posts",
        Icon: BsFilePost,
        path: "/post/create"
    },
]

function RightSidebar({openMenu, handleOpenMenu}) {
    
    return (
        <div className="flex w-full " style={{height: "calc(100vh - 64px)"}}>
            {/* Start SideBar */}
            <aside className="w-20 relative z-20 flex-shrink-0  px-2 overflow-y-auto bg-indigo-600 ">
                <div className="mb-6">
                    <div className="flex justify-center">
                        <div className="w-14 h-14 rounded-full bg-gray-300 border-2 border-white mt-2">
                            <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxhAxJ4D7MOeTTj6kR9PBeZonW5HM7giKjTbEmR-HMBwf3G1VqGnlwpO1kWrdyIZu8_U&usqp=CAU" 
                            className="rounded-full w-auto"
                            alt="hello"
                            />
                        </div>
                    </div>
                    <div>
                        <ul className="mt-6 leading-10 px-4">
                            <li className="mb-3 p-2 rounded-md flex items-center justify-center bg-blue-400 cursor-pointer"
                                onClick={handleOpenMenu} 
                            >
                                <i className="fas fa-align-left fa-sm text-white"></i>
                            </li>
                            <li className="mb-3 p-2 rounded-md flex items-center justify-center bg-pink-400 cursor-pointer">
                                <i className="fas fa-question-circle fa-sm text-white"></i>
                            </li>
                            <li className="mb-3 p-2 rounded-md flex items-center justify-center bg-yellow-400 cursor-pointer">
                                <i className="fas fa-headphones fa-sm text-white"></i>
                            </li>
                            <li className="absolute bottom-0 mb-3 p-2 rounded-full flex items-center mx-auto bg-white cursor-pointer">
                                <i className="fas fa-power-off fa-sm text-indigo-600"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Start Open Menu  */}
            <motion.aside 
                initial={{ x: -300, opacity: 0, display: "non"}}
                animate={{ x: openMenu ? 0 : -300, opacity: openMenu ? 1 : 0, display: openMenu ? "block" : "none" }}
                transition={{ duration: 1}}
                className=" w-52 relative z-0 flex-shrink-0 hidden px-4 overflow-y-auto bg-gray-100 sm:block"
            >
                <div className="mb-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
                        {menuItems.map(({title, Icon, path}) => (
                            <Link to={path} key={path} className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                                <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                                    <Icon className="text-indigo-600" />
                                </div>
                                <p className="text-xs mt-1 text-center font-semibold">{title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.aside>
        </div>
    )
}

export default RightSidebar
