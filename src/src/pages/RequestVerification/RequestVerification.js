import axios from "axios";
import NavBarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import { useEffect, useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import moment from "moment";
import { useNavigate } from "react-router-dom";

function RequestVerification() {
    // Request Verification data flow:
    // 1. Get pending requests data from backend
    // 2. Display every item with a unique key id

    // Pagination
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    
    // Warning
    const [message, setMessage] = useState();
    const [openSnackbar] = useSnackbar();

    const navigate = useNavigate();

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
    const [pendingRequests, setPendingRequests] = useState([]);

    // Pull pending requests from backend
    const getPendingRequests = async () => {
        await axios.get(`http://localhost:8080/api/displayrequest?page=${page}`, {
            withCredentials:true,
        }).then(response => {
            setPendingRequests(response.data.data);
            setPageCount(response.data.metadata.last_page);
        }).catch(err => {
            if (err.response.status === 401) {
                navigate('/login');
            }
        })
    }

    const acceptAccount = async (id) => {
        const data = {
            "id": id,
            "validation": "accepted",
        }
        await axios.post('http://localhost:8080/api/validaterequest', data, {
            withCredentials: true,
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err.response);
            if (err.response.status === 401) {
                navigate('/login');
            } else if (err.response.status === 400) {
                openSnackbar(err.response.data.message);
            }
        })
        window.location.reload();
    }

    const rejectAccount = async (id) => {
        const data = {
            "id": id,
            "validation": "rejected",
        }
        await axios.post('http://localhost:8080/api/validaterequest', data, {
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
    // Pull pending requests from backend
    useEffect(() => {
        window.scrollTo(0, 0);
        getPendingRequests();
    }, [page]);
    return (
        <>
            <div className="min-h-screen">
                <NavBarAdmin />
                <div className="large-box justify-center">
                    <div className='flex flex-col items-center py-8'>
                        <div className="font-main drop-shadow-2xl text-white text-4xl lg:text-6xl xl:text-8xl text-center">
                            <h2>- REQUEST VALIDATION -</h2>
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
                            pendingRequests.length >= 1 ? 
                                pendingRequests.map((requests) => (
                                    <div key={requests.id} className="history-card bg-white grid grid-cols-3 grid-rows-2 font-main my-2 py-4 px-8 gap-2 items-center">
                                        <p className="text-lg md:text-xl lg:text-2xl col-start-1 col-end-1 row-start-1 row-end-1">Amount: Rp {requests.converted_amount}</p>
                                        <p className="text-sm md:text-md lg:text-lg col-start-1 col-end-1 row-start-2 row-end-2">Registered on {moment(requests.CreatedAt).format("DD/MM/YYYY")}</p>
                                        <p className="text-lg md:text-xl lg:text-2xl text-right col-span-2 row-start-1 row-end-1">{requests.request_type.toUpperCase()} BALANCE</p>
                                        <div className="text-lg md:text-xl lg:text-2xl col-span-2 row-span-2 grid grid-cols-2 grid-rows-1 row-start-2 row-end-2 gap-4 ml-16">
                                            <button onClick={() => acceptAccount(requests.ID)} className="btn text-center border-primary border-2 border-theme-1 bg-theme-1 transition duration-200 hover:text-white hover:drop-shadow-lg">ACCEPT</button>
                                            <button onClick={() => rejectAccount(requests.ID)} className="btn text-center border-primary border-2 border-theme-2 bg-theme-2 transition duration-200 hover:text-white hover:drop-shadow-lg">REJECT</button>
                                        </div>
                                    </div>
                                ))
                            :
                                <div className="flex items-center justify-center font-main text-3xl">NO REQUEST TO VALIDATE</div>
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

export default RequestVerification;