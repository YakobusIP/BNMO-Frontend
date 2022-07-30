import logo from '../../assets/Logo.png'
import graph from '../../assets/Graph.png'
import lock from '../../assets/Lock.png'
import { Link } from 'react-router-dom';
import NavbarNL from '../../components/NavbarNL/NavbarNL';
import { useEffect, useState } from 'react';
import NavbarCust from '../../components/NavbarCust/NavbarCust';

function Home() {
    // Flag states
    const [customerLogged, setCustomerLogged] = useState(false);
    //const [adminLogged, setAdminLogged] = useState(false);
    const [notLogged, setNotLogged] = useState(true);

    useEffect(() => {
        const account = localStorage.getItem("account");
        if (account) {
            setCustomerLogged(true);
            setNotLogged(false);
        }
    }, [])
    return (
        <>
            { customerLogged && <NavbarCust /> }
            { notLogged && <NavbarNL/> }
            <div className="large-box justify-center">
                <div className='flex flex-col items-center py-4'>
                    <div className="w-4/6">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="font-main text-3xl">
                        <h2>YOUR SOLUTION FOR MONEY</h2>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center py-4 px-8 lg:pr-8 lg:pl-24'>
                <div className='max-w-sm lg:max-w-xl'>
                    <p className='font-main text-sm lg:text-xl'>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                        est laborum."
                    </p>
                </div>
                <div className='w-3/12'>
                    <img src={graph} alt='graph' />
                </div>
            </div>
            <div className='large-box flex justify-between items-center py-4 px-8 lg:pl-8 lg:pr-24'>
                <div className='w-1/6'>
                    <img src={lock} alt='lock' />
                </div>
                <div className='max-w-sm lg:max-w-xl'>
                    <p className='font-main text-sm lg:text-xl text-right'>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                        est laborum."
                    </p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center py-4 px-8'>
                <div>
                    <p className='font-main text-sm lg:text-xl text-center'>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                        est laborum."
                    </p>
                </div>
                <div className='text-black py-6 font-main text-base lg:text-3xl px-4'>
                    <a href='/signup' className='btn px-2 transition duration-200 bg-theme-1 hover:text-white hover:drop-shadow-md'>GET STARTED</a>
                </div>
            </div>
        </>
    );
}

export default Home;