import logo from '../../assets/Logo.png'
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavbarNL from '../../components/NavbarNL/NavbarNL';

function Register() {
    // Register data flow:
    // 1. User input all form data values [first_name, last_name, username, email, password]
    // 2. User upload photo
    // 3. Send photo to backend and receive the url as a return message
    // 4. Put image url into the user data
    // 5. Send user data to backend
    // 6. If any error occured, receive message from backend and display it

    // Check states
    const [isUploaded, setIsUploaded] = useState(false);
    const [forceRegister, setForceRegister]= useState(false);

    // Required inputs
    const [user, setUser] = useState({
        account_type: "customer",
        account_status: "pending",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        image_path: "",
        balance: 0,
    })

    // Server message
    const [postMessage, setPostMessage] = useState(null);
    const navigate = useNavigate();

    // Handle input change events
    const handleChange = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    // Drop zone states
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles[0] && !isUploaded) {
            setForceRegister(false);
            const fileName = acceptedFiles[0].name;
            const file = acceptedFiles[0]

            let formData = new FormData();
            formData.append("image", file);
            formData.append("name", fileName);

            const config = {
                headers: { "content-type": "multipart/form-data" },
                withCredentials: true,
            };
            
            axios.post('http://localhost:8080/api/upload-image', formData, config).then(response => {
                setUser(prev => ({...prev, image_path: response.data.url}));
            }).catch(err => {
                console.log(err);
            })
            setIsUploaded(true);
        } else {
            console.log("File already uploaded")
        }
    }, [isUploaded])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    // Send data to backend
    const registerAccount = async (e) => {
        e.preventDefault();

        if (isUploaded) {
            await axios.post('http://localhost:8080/api/register', user, {
                withCredentials: true,
            }).then(response => {
                setPostMessage(response.data.message)
                e.target.reset();
                navigate('/login');
                }).catch(err => {
                    setPostMessage(err.response.data.message);
                })
            setIsUploaded(false);
        } else {
            setForceRegister(true);
        }
    };

    // Move screen to top when load the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className='min-h-screen'>
                <NavbarNL/>
                <div className="flex flex-row justify-center items-center my-8">
                    <div className="flex justify-center mx-16 xl:mx-32 w-6/12 xl:w-1/4">
                        <form className="bg-white p-8 font-main w-auto" onSubmit={registerAccount}>
                            <h2 className="my-4 font-main text-6xl text-center">- REGISTER -</h2>
                            <div className="my-4">
                                <input 
                                    className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                    name="first_name"
                                    onChange={ handleChange }
                                    type="text" 
                                    placeholder="First Name" 
                                    required/>
                            </div>
                            <div className="my-4">
                                <input 
                                    className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                    name="last_name"
                                    onChange={ handleChange }
                                    type="text" 
                                    placeholder="Last Name" 
                                    required/>
                            </div>
                            <div className="my-4">
                                <input 
                                    className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                    name="username"
                                    onChange={ handleChange }
                                    type="text" 
                                    placeholder="Username" 
                                    required/>
                            </div>
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
                                    onChange= { handleChange }
                                    type="password" 
                                    placeholder="Password" 
                                    required/>
                            </div>
                            <label>ID Photo</label>
                            <div {...getRootProps()} className="flex flex-col justify-center items-center my-4 border-dashed border-2 rounded-md border-black p-4 cursor-pointer">
                                <input {...getInputProps()}/>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p>Drop files to upload</p>
                                <p>or</p>
                                <p>Click to select files</p>
                                { isUploaded ? <p className='mt-2 text-theme-1 drop-shadow-xl'>File uploaded successfully</p> : <p className='mt-2 text-theme-2 drop-shadow-xl'>No file selected</p> }
                            </div>
                            { forceRegister && <p className='mt-2 text-theme-2 drop-shadow-xl text-center'>Please complete the registration form</p> }
                            { postMessage && <p className='text-xl mt-2 drop-shadow-xl text-center'>{postMessage}</p> }
                            <button type="submit" className='flex large-btn my-4 bg-theme-1 transition duration-200 hover:text-white hover:drop-shadow-md'>REGISTER</button>
                            <div className="flex justify-center items-center">
                                <p>Already have an account? <Link to="/login" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Log in</Link></p>
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

export default Register;