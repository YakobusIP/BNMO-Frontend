import logo from '../../assets/Logo.png'
import { Link, useLocation } from 'react-router-dom';

function NavbarCust(props) {
    const currentLoc = useLocation().pathname;
    return (
        <nav className="sticky top-0 flex bg-white bg-opacity-95 justify-between items-center py-2 px-4 z-20">
            <a href='/' className="w-1/12">
                <img src={logo} alt='logo' />
            </a>
            <div className="text-black font-main text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl px-4">
                {  
                    <Link to='/transfer' className={(
                        currentLoc === '/transfer' ?
                            'px-2 mx-2 transition duration-200 border-b-4 border-black'
                        :
                            'px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'
                    )}>TRANSFER</Link>
                }
                {
                    <Link to='/customerrequest' className={(
                        currentLoc === '/customerrequest' ?
                            'px-2 mx-2 transition duration-200 border-b-4 border-black'
                        :
                            'px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'
                    )}>REQUEST</Link>
                }
                {
                    <Link to='/requesthistory' className={(
                        currentLoc === '/requesthistory' || currentLoc === '/transferhistory' ?
                            'px-2 mx-2 transition duration-200 border-b-4 border-black'
                        :
                            'px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'
                    )}>HISTORY</Link>
                }
                {
                    <Link to='/profile' className={(
                        currentLoc === '/profile' ?
                            'btn px-2 ml-2 border-primary border-2 bg-theme-1 border-theme-1 drop-shadow-md'
                        :
                            'btn px-2 ml-2 border-primary border-2 border-black transition duration-200 hover:bg-theme-1 hover:border-theme-1 hover:drop-shadow-md'
                    )}>PROFILE</Link>
                }
            </div>
        </nav>
    )
}

export default NavbarCust;