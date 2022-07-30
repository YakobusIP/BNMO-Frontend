import logo from '../../assets/Logo.png'
import NavbarNL from '../../components/NavbarNL/NavbarNL';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    // Input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Post message
    const [postMessage, setPostMessage] = useState(null);
    const navigate = useNavigate();

    const loginAccount = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        await axios.post('http://localhost:8080/api/login', data, {
            withCredentials: true,
        }).then(response => {
            setPostMessage(response.data.message);
            localStorage.setItem("account", JSON.stringify(response.data.account));
            e.target.reset();
            navigate('/customerrequest');
            }).catch(err => {
                setPostMessage(err.response.data?.message);
            })
    }
    useEffect(() => {
        window.scrollTo(0, 150)
    }, [])

    return (
        <>
            <NavbarNL/>
            <div className="flex flex-row justify-center items-center my-32">
                <div className="flex justify-center mx-16 xl:mx-32 my-36 w-6/12 xl:w-1/4">
                    <form className="bg-white px-8 py-8 font-main" onSubmit={loginAccount}>
                        <h2 className="my-4 font-main text-6xl text-center">- LOGIN -</h2>
                        <div className="my-4">
                            <input 
                                className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                onChange={ (e) => setEmail(e.target.value) }
                                type="email" 
                                placeholder="Email" 
                                required/>
                        </div>
                        <div className="my-4">
                            <input 
                                className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                onChange={ (e) => setPassword(e.target.value) }
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
        </>
    );
}

export default Login;