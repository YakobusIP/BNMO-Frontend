import NavbarCust from "../../components/NavbarCust/NavbarCust";
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
    // Pull account data
    const [accountData, setAccountData] = useState();

    // Profile data
    const [profileData, setProfileData] = useState([]);

    // Set modal states
    const [showModal, setShowModal] = useState(false);

    // States
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);

    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        const Account = localStorage.getItem("account");
        if (Account) {
            const parseAccount = JSON.parse(Account);
            setAccountData(parseAccount);
        } else {
            navigate("/login");
        }
    }, [])

    // Get profile data from backend
    const getProfileData = async () => {
        await axios.get(`http://localhost:8080/api/profile/${accountData.account_id}`, {
            withCredentials: true,
        }).then(response => {
            console.log(response.data);
            setProfileData(response.data.data);
        }).catch(err => {
            console.log(err);
        });
    }

    // Change image
    const changeImage = async (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            const fileName = e.target.files[0].name;
            const file = e.target.files[0]

            let formData = new FormData();
            formData.append("image", file);
            formData.append("name", fileName);

            const config = {
                headers: { "content-type": "multipart/form-data" },
                withCredentials: true,
            };
            
            await axios.post('http://localhost:8080/api/upload-image', formData, config).then(response => {
                console.log(response.data);
                setImageUrl(response.data.url);
                setIsUploaded(true);   
            }).catch(err => {
                console.log(err);
            })    
        }
        
    }

    const updateFiles = () => {
        if (isUploaded) {
            const data = {
                "id": accountData.account_id,
                "old_url": profileData.image_path,
                "new_url": imageUrl
            }

            console.log(data);

            axios.post('http://localhost:8080/api/updateimage', data, {
                withCredentials: true,
            }).then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        }
        setIsUploaded(false);
    }

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

    const onButtonClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        getProfileData();
        updateFiles();
    }, [accountData, isUploaded]);
    return (
        <>
            <div className="min-h-screen">
                <NavbarCust/>
                {
                    showModal ? (
                        <>
                            <div className="relative z-10">
                                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                                <div className="fixed z-10 inset-0">
                                    <div className="flex min-h-full items-center justify-center">
                                        <div className="relative bg-white rounded-lg shadow-xl transform transition-all w-auto max-w-lg p-4 font-main">
                                            <img className="object-scale-down mb-4" src={profileData.image_path} alt="id_photo"></img>
                                            <div className="flex flex-col justify-center items-center">
                                                <div className="flex flex-col justify-center items-center mb-4 w-full">
                                                    <input ref={inputRef} id="upload_image" type="file" className="hidden" onChange={changeImage}/>
                                                    <button onClick={onButtonClick} className="large-btn text-center w-full text-2xl border-primary border-2 border-black transition duration-200 hover:bg-theme-1 hover:border-theme-1 hover:drop-shadow-md">CHANGE IMAGE</button>
                                                </div>
                                                <button onClick={() => setShowModal(false)} className="large-btn w-full text-black border-primary border-2 border-black transition duration-200 hover:bg-theme-2 hover:border-theme-2 hover:drop-shadow-md">CLOSE</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null
                }
                <div className="flex flex-col justify-center items-center font-main px-16 py-8">
                    <div>
                        <p className="text-4xl py-4">PROFILE</p>
                    </div>
                    <div className="green-box grid grid-col-3 grid-row-3 items-center px-16 py-8 w-2/3 my-4 gap-y-4">
                        <p className="text-6xl col-span-2 row-start-1 row-end-1">{profileData.first_name} {profileData.last_name}</p>
                        <p className="text-2xl col-span-2 row-start-2 row-end-2">{profileData.email}</p>
                        <p className="text-2xl col-span-2 row-start-3 row-end-3">Username : {profileData.username}</p>
                        <p className="text-4xl col-start-3 row-start-1 row-end-1 text-center">CURRENT BALANCE:</p>
                        <p className="text-4xl col-start-3 row-start-2 row-end-2 text-center">Rp {profileData.balance}</p>
                        <button onClick={() => setShowModal(true)} className="btn border-primary border-2 border-black transition duration-200 hover:bg-black hover:text-white">OPEN IMAGE</button>
                    </div>
                    <button onClick={logOut} className="large-btn px-2 border-primary border-2 border-black transition duration-200 hover:bg-theme-2 hover:border-theme-2 hover:drop-shadow-md">LOG OUT</button>
                </div>
            </div>
        </>
    );
}

export default Profile;