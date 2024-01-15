import { useState } from 'react';

function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>

            <nav className={`bg-black bg-opacity-85 fixed w-full z-20 ${isNavOpen ? 'bg-opacity-100' : 'bg-opacity-85'} `}>
                <div className="flex flex-wrap items-center justify-between p-4 sm:mx-14 md:mx-14 lg:mx-32">
                    <a className="flex items-center rtl:space-x-reverse">
                        <img src="logo.png" className="h-16" alt="Logo" />
                    </a>

                    <button
                        type="button"
                        onClick={toggleNav}
                        className="inline-flex items-center justify-center w-10 h-10 p-2 text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
                        aria-expanded={isNavOpen ? 'true' : 'false'}
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <svg
                            className={`w-5 h-5 transition-transform transform ${isNavOpen ? 'rotate-45' : ''
                                }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>

                    <div
                        className={`text-center items-center justify-between ${isNavOpen ? 'block' : 'hidden'
                            } w-full md:flex md:w-auto md:order-1`}
                        id="navbar-sticky"
                    >
                        <ul className="flex flex-col p-4 mt-4 text-lg font-medium md:p-0 text-light-green md:space-x-16 rtl:space-x-reverse md:flex-row md:mt-0">
                            <li>
                                <a href="#" className="block px-3 py-2 rounded md:bg-transparent md:p-0 hover:text-green-200" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block px-3 py-2 rounded md:p-0 hover:text-green-200">Features</a>
                            </li>
                            <li>
                                <a href="#" className="block px-3 py-2 rounded md:p-0 hover:text-green-200">Customize</a>
                            </li>
                            <li>
                                <a href="#" className="block px-3 py-2 rounded md:p-0 hover:text-green-200">Search</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>)
}

export default Navbar