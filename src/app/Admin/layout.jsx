'use client'
import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocation } from "react-use";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/shared/Logo/Logo";
import AvatarDropdown from "@/components/Header/AvatarDropdown";

const AdminBody = ({children}) => {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isProcessDropdownOpen, setIsProcessDropdownOpen] = useState(false);

  const [isInStockDropdownOpen, setIsInStockDropdownOpen] = useState(false);
  const [isBillsDropdownOpen, setIsBillsDropdownOpen] = useState(false);


  const [isOpen, setIsOpen] = useState(false);
    const [dropdown1, setdropdown1] = useState(false);

  const toggleInStockDropdown = () => {
      setIsInStockDropdownOpen((prevState) => !prevState);
      setIsBillsDropdownOpen(false); // Close Bills dropdown when opening In Stock dropdown
  };

  


  const toggleDropdown = () => {
    setdropdown1(!dropdown1);
  };
  

  

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };




  // HANDLE LOGOUT
  const handleLogout = () => {
      dispatch(logoutUserAsync()).then(() => {
          toast.success("user Logout ");
      });
  }


  const handleMoveTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      })
  }


  return (
    <>
          <div className="antialiased bg-gray-50 dark:bg-gray-900">
                {/* ---------------- NAVBAR ---------------- */}
                <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
                    <div className="flex flex-wrap justify-between items-center mx-5">
                        {/* ---------------- NAVBAR - LEFT ---------------- */}
                        <div className="flex justify-start items-center">
                            <button
                                aria-controls="drawer-navigation"
                                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={toggleSidebar}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    aria-hidden="true"
                                    className="hidden w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Toggle sidebar</span>
                            </button>

                            <Link href="/dashboard" className="hidden sm:flex items-center justify-between mr-4">
                                <Logo/>
                            </Link>
                        </div>

                        {/* ---------------- NAVBAR - RIGHT ---------------- */}
                        <div className="flex items-center gap-2 lg:order-2">
                          
                        <AvatarDropdown/>


                        </div>
                    </div>
                </nav>
                {/* ---------------- SIDEBAR ---------------- */}
                <aside aria-label="Sidenav" className={`fixed top-0 left-0 z-40 w-56 xl:w-64 h-screen pt-8 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}>

                    <div className="overflow-y-auto py-5 h-full bg-[#FAFAFA] dark:bg-gray-800">

                        <ul className="pt-10">

                            {/* DASHBOARD */}
                            <li>
                                <Link href="/Admin" onClick={handleMoveTop} className={`h-14 pl-4  flex items-center p-2 text-base font-medium ${pathname === "/Admin" ? "bg-[#434343] text-white dark:bg-gray-600 dark:text-gray-100 dark:border-gray-400" : "bg-[#FAFAFA] dark:bg-gray-800 text-gray-900 dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100"} group`}>
                                    {/* <FaStore size={22} className="text-gray-500 dark:text-gray-400" /> */}
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>

                            {/* INSTOCK DROPDOWN */}
                            <li className="relative">
                                <button
                                    className="h-14 pl-4 w-full border-t flex items-center p-2 text-base font-medium bg-[#FAFAFA] dark:bg-gray-800 text-gray-900 dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 group"
                                    onClick={toggleInStockDropdown}
                                >
                                    <span className="ml-3">Orders</span>
                                    <svg
                                        className={`ml-auto w-4 h-4 transform ${isInStockDropdownOpen ? 'rotate-180' : ''} transition-transform`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isInStockDropdownOpen && (
                                    <ul className="absolute left-0 z-10 mt-2 w-full border border-gray-200 rounded shadow-lg dark:bg-gray-800 dark:border-gray-700">

                                     
                                        <li>
                                            <Link href="/dashboard/accessories" onClick={handleMoveTop} className={`h-14 pl-12 border-t flex items-center p-2 text-base cursor-pointer font-medium ${pathname === "/dashboard/accessories" ? "bg-[#434343] text-white dark:bg-gray-600 dark:text-gray-100 dark:border-gray-400" : "bg-[#FAFAFA] dark:bg-gray-800 text-gray-900 dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100"} group`}>Accessories</Link>
                                        </li>

                                        <li>
                                            <Link href="/dashboard/expense" onClick={handleMoveTop} className={`h-14 pl-12 border-t flex items-center p-2 text-base cursor-pointer font-medium ${pathname === "/dashboard/expense" ? "bg-[#434343] text-white dark:bg-gray-600 dark:text-gray-100 dark:border-gray-400" : "bg-[#FAFAFA] dark:bg-gray-800 text-gray-900 dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100"} group`}>Expense</Link>
                                        </li>

                                    </ul>
                                )}
                            </li>

                         
                            <li className="relative" >
                                <Link
                                    className="h-14 pl-4 w-full border-t flex items-center p-2 text-base font-medium bg-[#FAFAFA] dark:bg-gray-800 text-gray-900 dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 group"
                                   href={'/Admin/Products'}
                                >
                                    <span className="ml-3">Products</span>
                                    
                                </Link>
                             
                            </li>

                            {/* BILLS DROPDOWN */}
                            {/* <li className="relative">
                                <button
                                    className="h-14 pl-4 w-full border-t flex items-center p-2 text-base font-medium bg-[#FAFAFA] dark:bg-gray-800 text-gray-900 dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 group"
                                    onClick={toggleBillsDropdown}
                                >
                                    <span className="ml-3">Bills</span>
                                    <svg
                                        className={`ml-auto w-4 h-4 transform ${isBillsDropdownOpen ? 'rotate-180' : ''} transition-transform`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isBillsDropdownOpen && (
                                    <ul className="absolute left-0 z-10 mt-2 w-full border border-gray-200 rounded shadow-lg dark:bg-gray-800 dark:border-gray-700">

                                        <li>
                                            <Link href="/dashboard/naila-arts-buyer" onClick={handleMoveTop} className={`h-14 pl-12 border-t flex items-center p-2 text-base cursor-pointer font-medium ${location.pathname === "/dashboard/naila-arts-buyer" ? "bg-[#434343] text-white dark:bg-gray-600 dark:text-gray-100 dark:border-gray-400" : "bg-[#FAFAFA] dark:bg-gray-800 text-gray-900 dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100"} group`}>Naila Arts Buyer</Link>
                                        </li>
                                    
                                      
                                    </ul>
                                )}
                            </li> */}


                        </ul>

                    </div>
                    {/* <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
                        <a
                            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                            href="#"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                            </svg>
                        </a>
                    </div> */}
                </aside >
                {/* ---------------- DASHBOARD ---------------- */}
                < main className="ml-0 md:ml-56 lg:ml-56 xl:ml-64 h-auto pt-16 bg-white dark:bg-gray-900" >
                   {children}
                </ main>
            </div >
    </>
  );
};

export default AdminBody;
