import logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom';

function NavBarAdmin() {
    return (
        <nav className="sticky top-0 flex bg-white justify-between items-center py-2 px-4">
            <a href='/' className="w-1/12">
                <img src={logo} alt='logo' />
            </a>
            <div className="text-black font-main text-sm lg:text-2xl px-4">
                <a href='/accountverification' className='px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'>ACCOUNT VERIFICATION</a>
                <a href='/request' className='px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'>REQUEST</a>
                <a href='/customerdata' className='px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'>CUSTOMER DATA</a>
                <a href='/profile' className='btn px-2 ml-2 border-primary border-2 border-black transition duration-200 hover:bg-theme-1 hover:border-theme-1 hover:drop-shadow-md'>ADMIN</a>
            </div>
        </nav>
    )
}

export default NavBarAdmin;