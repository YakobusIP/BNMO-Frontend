import axios from "axios";
import NavBarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import { useEffect, useState } from 'react';
import moment from "moment";

function searchFullName(query, val) {
    const fullName = val?.first_name + ' ' + val?.last_name;
    return fullName.toLowerCase().includes(query?.toLowerCase().trim());
}

function searchUsername(query, val) {
    return val?.username.toLowerCase().includes(query?.toLowerCase().trim());
}

function searchDate(query, val) {
    return moment(val?.CreatedAt).format("DD/MM/YYYY").includes(query?.toLowerCase().trim());
}

function searchEmail(query, val) {
    return val?.email.toLowerCase() === query?.toLowerCase().trim();
}

function CustomerData() {
    // Customer Data data flow:
    // 1. Get all customer data from backend
    // 2. If no search query is available, display all datas
    // 3. If search query is available, display datas based on the query
    // Possible query filters are search by full name, search by username, 
    // search by registered date, and search by email

    // Search values
    const [query, setQuery] = useState('');

    // Save backend response to state
    const [customerDatas, setCustomerDatas] = useState([]);

    // Set modal states
    const [showModal, setShowModal] = useState(false);
    const [imageID, setImageID] = useState();

    // Display modal
    const displayModal = (accounts, state) => {
        if (!showModal) {
            setImageID(accounts.image_path);
        }
        setShowModal(state);
    }

    // Pull pending accounts from backend
    const getCustomerData = async () => {
        await axios.get('http://localhost:8080/api/customerdata', {
            withCredentials:true,
        }).then(response => {
            setCustomerDatas(response.data.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getCustomerData();
    }, []);

    return (
        <>
            <div className="min-h-screen">
                <NavBarAdmin />
                {
                    showModal ? (
                        <>
                            <div className="relative z-10">
                                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                                <div className="fixed z-10 inset-0">
                                    <div className="flex min-h-full items-center justify-center">
                                        <div className="relative bg-white rounded-lg shadow-xl transform transition-all w-auto max-w-lg p-4 font-main">
                                            <img className="object-scale-down mb-4" src={imageID} alt="id_photo"></img>
                                            <button onClick={() => displayModal(null, false)} className="large-btn w-full text-black border-primary border-2 border-black transition duration-200 hover:bg-theme-2 hover:border-theme-2 hover:drop-shadow-md">CLOSE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null
                }
                <div className="large-box justify-center">
                    <div className='flex flex-col items-center py-8'>
                        <div className="font-main drop-shadow-2xl text-white text-4xl lg:text-6xl xl:text-8xl text-center">
                            <h2>- CUSTOMER DATA -</h2>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center my-4 ">
                    <div className="relative items-center w-2/3 lg:w-1/2 ">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input 
                            type="search" 
                            onChange= { (e) => setQuery(e.target.value) }
                            className="block p-4 pl-10 w-full bg-gray-50 rounded-md border border-gray-300 focus:ring-theme-1 focus:border-theme-1 font-main" 
                            placeholder="Search customer data" 
                            required/>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center my-8">
                    {
                        customerDatas?.length > 0 ? 
                            customerDatas?.filter((val) => {
                                if (query === "") {
                                    return val;
                                } else if (searchFullName(query, val)) {
                                    return val;
                                } else if (searchUsername(query, val)) {
                                    return val;
                                } else if (searchDate(query, val)) {
                                    return val;
                                } else if (searchEmail(query, val)) {
                                    return val;
                                }
                            }).map((accounts) => (
                                <div key={accounts.profile_id} className="customerdata-card bg-white grid grid-cols-2 grid-rows-3 font-main my-2 py-4 px-8 gap-2 items-center">
                                    <p className="text-lg md:text-xl lg:text-2xl">Name: {accounts.first_name} {accounts.last_name}</p>
                                    <p className="text-lg md:text-xl lg:text-2xl col-start-1 col-end-1 row-start-2 row-end-2">Username: {accounts.username}</p>
                                    <p className="text-sm md:text-md lg:text-lg col-start-1 col-end-1 row-start-3 row-end-3">Registered on {moment(accounts.created_at).format("DD/MM/YYYY")}</p>
                                    <p className="text-sm md:text-md lg:text-lg text-right">Email: {accounts.email}</p>
                                    <p className="text-md md:text-lg lg:text-xl text-right row-start-2 row-end-2">Balance: {accounts.balance}</p>
                                    <button onClick={() => displayModal(accounts, true)} className="btn text-lg md:text-xl lg:text-2xl w-fit border-primary place-self-end border-2 border-black transition duration-200 hover:bg-theme-1 hover:border-theme-1 hover:drop-shadow-lg">OPEN IMAGE</button>
                                </div>
                            ))
                        :
                            <div className="flex items-center justify-center font-main text-3xl">NO CUSTOMER DATA AVAILABLE IN THE DATABASE</div>    
                    }
                </div>
            </div>
        </>
    );
}

export default CustomerData;