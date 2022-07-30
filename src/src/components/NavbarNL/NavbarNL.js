import logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom';

function NavbarNL() {
    return (
        <nav className="sticky top-0 flex bg-white justify-between items-center py-2 px-4">
            <Link to='/' className="w-1/12">
                <img src={logo} alt='logo' />
            </Link>
            <div className="text-black font-main text-sm lg:text-2xl px-4">
                <Link to='/login' className='btn px-2 ml-2 border-primary border-2 border-black transition duration-200 hover:bg-theme-1 hover:border-theme-1 hover:drop-shadow-md'>LOGIN</Link>
            </div>
        </nav>
    );
}

export default NavbarNL;