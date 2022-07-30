import logo from '../../assets/Logo.png'
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavbarNL from '../../components/NavbarNL/NavbarNL';

function Register() {
    // Check states
    const [isUploaded, setIsUploaded] = useState(false);
    const [forceRegister, setForceRegister]= useState(false);

    // Required inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    // Server message
    const [postMessage, setPostMessage] = useState(null);
    const navigate = useNavigate();

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
                setImageUrl(response.data.url);
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
            const data = {
                account_type: "customer",
                account_status: "pending",
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                password: password,
                image_path: imageUrl,
                balance: 0
            };
    
            await axios.post('http://localhost:8080/api/register', data, {
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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <NavbarNL/>
            <div className="flex flex-row justify-center items-center my-8">
                <div className="flex justify-center mx-16 xl:mx-32 w-6/12 xl:w-1/4">
                    <form className="bg-white p-8 font-main w-auto" onSubmit={registerAccount}>
                        <h2 className="my-4 font-main text-6xl text-center">- REGISTER -</h2>
                        <div className="my-4">
                            <input 
                                className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                onChange={ (e) => setFirstName(e.target.value) }
                                type="text" 
                                placeholder="First Name" 
                                required/>
                        </div>
                        <div className="my-4">
                            <input 
                                className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                onChange={ (e) => setLastName(e.target.value) }
                                type="text" 
                                placeholder="Last Name" 
                                required/>
                        </div>
                        <div className="my-4">
                            <input 
                                className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                onChange={ (e) => setUsername(e.target.value) }
                                type="text" 
                                placeholder="Username" 
                                required/>
                        </div>
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
                                onChange= { (e) => setPassword(e.target.value) }
                                type="password" 
                                placeholder="Password" 
                                required/>
                        </div>
                        <label>ID Photo</label>
                        <div {...getRootProps()} className="flex flex-col justify-center items-center my-4 border-dashed border-2 rounded-md border-black p-4 cursor-pointer">
                            <input {...getInputProps()}/>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>Drop files to upload</p>
                            <p>or</p>
                            <p>Click to select files</p>
                            { isUploaded ? <p className='mt-2 text-theme-1 drop-shadow-xl'>File uploaded successfully</p> : <p className='mt-2 text-theme-2 drop-shadow-xl'>No file selected</p> }
                        </div>
                        { forceRegister && <p className='mt-2 text-theme-2 drop-shadow-xl text-center'>Please upload your ID Photo</p> }
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
        </>
    );
}

export default Register;