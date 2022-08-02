import NavbarCust from "../../components/NavbarCust/NavbarCust";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CurrencyFormat from 'react-currency-format';

// BUGGED (WILL SWITCH TO LOCALSTORAGE DATA)
function Profile() {
    // Profile data flow:
    // 1. Pull account data from local storage
    // 2. Fetch the ID from account data in local storage
    // 3. Use the ID as variable in getting account data from backend
    // 4. Display account data

    // Pull account data
    const [accountData, setAccountData] = useState({});

    // Profile data
    const [profileData, setProfileData] = useState({});

    // Set modal states
    const [showModal, setShowModal] = useState(false);

    // States
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);

    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
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
        if (Object.keys(accountData).length !== 0) {
            await axios.get(`http://localhost:8080/api/profile/${accountData?.ID}`, {
                withCredentials: true,
            }).then(response => {
                setProfileData(response.data.data);
            }).catch(err => {
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
        }
        
    }

    // Change image
    const changeImage = async (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
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
                setImageUrl(response.data.url);
                setIsUploaded(true);   
            }).catch(err => {
                console.log(err);
            })    
        }
        
    }

    // Update images
    const updateFiles = () => {
        if (isUploaded) {
            const data = {
                "id": accountData.ID,
                "old_url": profileData.image_path,
                "new_url": imageUrl
            }

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

    // Move screen to top when load the page
    // Pull profile data from backend
    useEffect(() => {
        window.scrollTo(0, 0);
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
                                    <div className="flex items-center justify-center min-h-screen">
                                        <div className="relative flex flex-col items-center justify-center bg-white rounded-lg shadow-xl transform transition-all max-w-md p-4 font-main">
                                            <img className="object-scale-down object-center max-h-screen-fit mb-4" src={profileData.image_path} alt="id_photo"></img>
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
                        <CurrencyFormat value={profileData.balance} displayType={'text'} thousandSeparator={true} prefix={'Rp'} className="text-4xl col-start-3 row-start-2 row-end-2 text-center" />
                        <button onClick={() => setShowModal(true)} className="btn border-primary border-2 border-black transition duration-200 hover:bg-black hover:text-white">OPEN IMAGE</button>
                    </div>
                    <button onClick={logOut} className="large-btn px-2 border-primary border-2 border-black transition duration-200 hover:bg-theme-2 hover:border-theme-2 hover:drop-shadow-md">LOG OUT</button>
                </div>
            </div>
        </>
    );
}

export default Profile;