import logo from '../../assets/Logo.png'
import NavbarNL from '../../components/NavbarNL/NavbarNL';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    // Login data flow:
    // 1. User input all form data values [email, password]
    // 2. Send user data to backend
    // 3. If any error occured, receive message from backend and display it

    // Input values
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    // Post message
    const [postMessage, setPostMessage] = useState(null);
    const navigate = useNavigate();

    // Handle input change events
    const handleChange = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    // Send data to backend
    const loginAccount = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:8080/api/login', user, {
            withCredentials: true,
        }).then(response => {
            setPostMessage(response.data.message);
            localStorage.setItem("account", JSON.stringify(response.data.account));
            e.target.reset();
            if (response.data.account.account_type === "customer") {
                navigate('/customerrequest');
            } else {
                navigate('/accountverification');
            }
            
            }).catch(err => {
                setPostMessage(err.response.data?.message);
            })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className='min-h-screen'>
                <NavbarNL/>
                <div className="flex flex-row justify-center items-center">
                    <div className="flex justify-center mx-16 xl:mx-32 my-36 w-6/12 xl:w-1/4">
                        <form className="bg-white px-8 py-8 font-main" onSubmit={loginAccount}>
                            <h2 className="my-4 font-main text-6xl text-center">- LOGIN -</h2>
                            <div className="my-4">
                                <input 
                                    className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                    name="email"
                                    onChange={ handleChange }
                                    type="email" 
                                    placeholder="Email" 
                                    required/>
                            </div>
                            <div className="my-4">
                                <input 
                                    className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                    name="password"
                                    onChange={ handleChange }
                                    type="password" 
                                    placeholder="Password" 
                                    required/>
                            </div>
                            { postMessage && <p className='text-xl mt-2 drop-shadow-xl text-center'>{postMessage}</p> }
                            <button type="submit" className='flex large-btn bg-theme-1 transition duration-200 hover:text-white hover:drop-shadow-md my-4'>LOGIN</button>
                            <div className="flex justify-center items-center">
                                <p>Don't have an account? <Link to="/register" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Create one</Link></p>
                            </div>
                        </form>
                    </div>
                    <div className="hidden flex-col font-main text-black rounded-full bg-theme-1 items-center justify-center mx-16 xl:mx-32 w-96 h-96 2xl:w-128 2xl:h-128 xl:flex">
                        <div className="w-4/6">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="font-main text-3xl text-center">
                            <h2>YOUR SOLUTION FOR MONEY</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;