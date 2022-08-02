import axios from "axios";
import NavBarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import { useEffect, useState } from 'react';
import moment from "moment";
import { useNavigate } from "react-router-dom";

function AccountVerification() {
    // Account Verification data flow:
    // 1. Get pending accounts data from backend
    // 2. Display every item with a unique key id

    // Pagination
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const previousPage = () => {
        if (page !== 1) {
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if (page !== pageCount) {
            setPage(page + 1);
        }
    }

    // Save backend response to state
    const [pendingAccounts, setPendingAccounts] = useState([]);

    // Set modal states
    const [showModal, setShowModal] = useState(false);
    const [imageID, setImageID] = useState();

    const navigate = useNavigate();

    // Display modal
    const displayModal = (accounts, state) => {
        if (!showModal) {
            setImageID(accounts.image_path);
        }
        setShowModal(state);
    }

    // Pull pending accounts from backend
    const getPendingAccounts = async () => {
        await axios.get(`http://localhost:8080/api/displaypending?page=${page}`, {
            withCredentials:true,
        }).then(response => {
            setPendingAccounts(response.data.data);
            setPageCount(response.data.metadata.last_page);
        }).catch(err => {
            if (err.response.status === 401) {
                navigate('/login');
            }
        })
    }

    // Function to accept account
    const acceptAccount = async (id) => {
        const data = {
            "id": id,
            "validation": "accepted",
        }
        await axios.post('http://localhost:8080/api/validateaccount', data, {
            withCredentials: true,
        }).then(response => {
            console.log(response);
        }).catch(err => {
            if (err.response.status === 401) {
                navigate('/login');
            }
        })
        window.location.reload();
    }

    // Function to reject account
    const rejectAccount = async (id) => {
        const data = {
            "id": id,
            "validation": "rejected",
        }
        await axios.post('http://localhost:8080/api/validateaccount', data, {
            withCredentials: true,
        }).then(response => {
            console.log(response);
        }).catch(err => {
            if (err.response.status === 401) {
                navigate('/login');
            }
        })
        window.location.reload();
    }

    // Move screen to top when load the page
    // Pull pending accounts from backend
    useEffect(() => {
        window.scrollTo(0, 0);
        getPendingAccounts();
    }, [page]);
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
                                    <div className="flex items-center justify-center min-h-screen">
                                        <div className="relative flex flex-col items-center justify-center bg-white rounded-lg shadow-xl transform transition-all max-w-md p-4 font-main" >
                                            <img className="object-scale-down object-center mb-4 max-h-screen-fit" src={imageID} alt="id_photo"></img>
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
                            <h2>- ACCOUNT VERIFICATION -</h2>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center">
                    {
                        pageCount > 1 ?
                            <button onClick={ previousPage } className="pagination-btn items-center border-primary border-2 border-black font-main ml-16  transition duration-200 hover:bg-theme-1 hover:border-theme-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        : null
                    }
                    <div className="flex flex-col grow justify-center items-center my-8">
                        {
                            pendingAccounts.length >= 1 ? 
                                pendingAccounts.map((accounts) => (
                                    <div key={accounts.ID} className="history-card bg-white grid grid-cols-3 grid-rows-3 font-main my-2 py-4 px-8 gap-2 items-center">
                                        <p className="text-lg md:text-xl lg:text-2xl">Name: {accounts.first_name} {accounts.last_name}</p>
                                        <p className="text-lg md:text-xl lg:text-2xl col-start-1 col-end-1 row-start-2 row-end-2">Username: {accounts.username}</p>
                                        <p className="text-sm md:text-md lg:text-lg col-start-1 col-end-1 row-start-3 row-end-3">Registered on {moment(accounts.CreatedAt).format("DD/MM/YYYY")}</p>
                                        <p className="text-md md:text-lg lg:text-xl text-right col-span-2">Email: {accounts.email}</p>
                                        <button onClick={() => displayModal(accounts, true)} className="btn text-lg md:text-xl lg:text-2xl ml-16 col-span-2 text-center border-primary border-2 border-black transition duration-200 hover:bg-theme-1 hover:border-theme-1 hover:drop-shadow-lg">OPEN IMAGE</button>
                                        <div className="text-lg md:text-xl lg:text-2xl col-span-2 grid grid-cols-2 grid-rows-1 gap-4 ml-16">
                                            <button onClick={() => acceptAccount(accounts.ID)} className="btn text-center border-primary border-2 border-theme-1 bg-theme-1 transition duration-200 hover:text-white hover:drop-shadow-lg">ACCEPT</button>
                                            <button onClick={() => rejectAccount(accounts.ID)} className="btn text-center border-primary border-2 border-theme-2 bg-theme-2 transition duration-200 hover:text-white hover:drop-shadow-lg">REJECT</button>
                                        </div>
                                    </div>
                                ))
                            :
                                <div className="flex items-center justify-center font-main text-3xl">NO ACCOUNTS TO VERIFY</div>
                        }
                    </div>
                    {
                        pageCount > 1 ?
                            <button onClick={ nextPage } className="pagination-btn flex items-center border-primary border-2 border-black font-main justify-end mr-16 transition duration-200 hover:bg-theme-1 hover:border-theme-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        : null
                    }
                </div>
            </div>
        </>
    );
}

export default AccountVerification;