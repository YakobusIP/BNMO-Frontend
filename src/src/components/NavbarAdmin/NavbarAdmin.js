import logo from '../../assets/Logo.png'
import { Link, useLocation } from 'react-router-dom';

function NavBarAdmin() {
    const currentLoc = useLocation().pathname;
    return (
        <nav className="sticky top-0 flex bg-white justify-between items-center py-2 px-4">
            <Link to='/' className="flex flex-row w-auto font-main items-center">
                <img src={logo} alt='logo' className='w-1/6' />
                <p className='pl-2 text-2xl text-theme-2 cursor-default'>ADMIN MODE</p>
            </Link>
            <div className="text-black font-main text-sm lg:text-2xl px-4">
                {  
                    <Link to='/transfer' className={(
                        currentLoc === '/accountverification' ?
                            'px-2 mx-2 transition duration-200 border-b-4 border-black'
                        :
                            'px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'
                    )}>ACCOUNT VERIFICATION</Link>
                }
                {
                    <Link to='/validaterequest' className={(
                        currentLoc === '/customerrequest' ?
                            'px-2 mx-2 transition duration-200 border-b-4 border-black'
                        :
                            'px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'
                    )}>VALIDATE REQUEST</Link>
                }
                {
                    <Link to='/customerdata' className={(
                        currentLoc === '/requesthistory' || currentLoc === '/transferhistory' ?
                            'px-2 mx-2 transition duration-200 border-b-4 border-black'
                        :
                            'px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'
                    )}>CUSTOMER DATA</Link>
                }
                <button className='btn px-2 ml-2 border-primary border-2 border-black transition duration-200 hover:bg-theme-2 hover:border-theme-2 hover:drop-shadow-md'>LOGOUT</button>
            </div>
        </nav>
    )
}

export default NavBarAdmin;