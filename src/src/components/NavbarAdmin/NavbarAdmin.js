import axios from 'axios';
import logo from '../../assets/Logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavBarAdmin() {
    const navigate = useNavigate();
    // Send post to logout
    const logOut = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/api/logout', {
            withCredentialsL: true,
        }).then(response => {
            console.log(response.data.message);
            navigate('/');
        }).catch(err => {
            console.log(err);
        })
        localStorage.removeItem("account");
    }

    const currentLoc = useLocation().pathname;
    return (
        <nav className="sticky top-0 flex bg-white bg-opacity-95 justify-between items-center py-2 px-4 z-20">
            <Link to='/' className="flex flex-row w-auto font-main items-center">
                <img src={logo} alt='logo' className='w-1/6' />
                <p className='pl-2 text-2xl text-theme-2 cursor-default'>ADMIN MODE</p>
            </Link>
            <div className="text-black font-main text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl px-4">
                {  
                    <Link to='/accountverification' className={(
                        currentLoc === '/accountverification' ?
                            'px-2 mx-2 transition duration-200 border-b-4 border-black'
                        :
                            'px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'
                    )}>ACCOUNT VERIFICATION</Link>
                }
                {
                    <Link to='/validaterequest' className={(
                        currentLoc === '/validaterequest' ?
                            'px-2 mx-2 transition duration-200 border-b-4 border-black'
                        :
                            'px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'
                    )}>VALIDATE REQUEST</Link>
                }
                {
                    <Link to='/customerdata' className={(
                        currentLoc === '/customerdata' || currentLoc === '/transferhistory' ?
                            'px-2 mx-2 transition duration-200 border-b-4 border-black'
                        :
                            'px-2 mx-2 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in'
                    )}>CUSTOMER DATA</Link>
                }
                <button onClick={ logOut } className='btn px-2 ml-2 border-primary border-2 border-black transition duration-200 hover:bg-theme-2 hover:border-theme-2 hover:drop-shadow-md'>LOGOUT</button>
            </div>
        </nav>
    )
}

export default NavBarAdmin;