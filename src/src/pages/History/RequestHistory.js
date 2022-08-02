import NavbarCust from "../../components/NavbarCust/NavbarCust";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import moment from "moment";
import axios from "axios";

function RequestHistory() {
    // Request history data flow:
    // 1. Get account id from local storage
    // 2. Use ID to get request histories from backend
    // 3. Update get request history everytime page changes

    // Request history states
    const [requestHistory, setRequestHistory] = useState([]);
    const [accountData, setAccountData]= useState({});

    // Pagination
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const Account = localStorage.getItem("account");
        if (Account) {
            const parseAccount = JSON.parse(Account);
            setAccountData(parseAccount);
        } else {
            navigate("/login");
        }
    }, [])

    // Function to switch pages
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

    // Get request history from backend
    const getRequestHistory = () => {
        if (Object.keys(accountData).length !== 0) {
            axios.get(`http://localhost:8080/api/requesthistory?id=${accountData?.ID}&page=${page}`, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data);
                setRequestHistory(response.data.data);
                setPageCount(response.data.metadata.last_page);
            }).catch(err => {
                if (err.response.status === 401) {
                    navigate('/login');
                }
            })
        }
    }

    // Get request history and refresh everytime page changes
    useEffect(() => {
        getRequestHistory();
    }, [accountData, page]);
    return (
        <>
            <div className="min-h-screen">
                <NavbarCust/>
                <div className="large-box justify-center">
                    <div className='flex flex-col items-center py-8'>
                        <div className="font-main drop-shadow-2xl text-white text-8xl">
                            <h2>- HISTORY -</h2>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="my-8 font-main text-3xl">
                        <Link to='/requesthistory' className="mx-8 transition duration-200 border-b-4 border-black hover:ease-in">REQUEST</Link>
                        <Link to='/transferhistory' className="mx-8 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in">TRANSFER</Link>
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
                    <div className="flex flex-col grow justify-center items-center pb-8">
                        {
                            requestHistory?.length >= 1 ?
                                requestHistory?.map((histories) => (
                                    histories.status === "pending" ?
                                        <div key={histories.ID} className="history-card bg-theme-3 grid grid-cols-2 grid-rows-2 my-2 py-4 px-8 gap-2">
                                            <p>{histories.request_type.toUpperCase()} BALANCE</p>
                                            <p className="text-right">REQUESTED ON {moment(histories.CreatedAt).format("DD/MM/YYYY")}</p>
                                            <p>STATUS {histories.status.toUpperCase()}</p>
                                            <div className="col-start-2 row-start-2 inline-flex justify-end">
                                                <p>AMOUNT: </p>
                                                <CurrencyFormat value={histories.converted_amount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} className="pl-2" />
                                            </div>
                                        </div>
                                    :
                                        histories.status === "accepted" ?
                                            <div key={histories.ID} className="history-card bg-theme-1 grid grid-cols-2 grid-rows-2 my-2 py-4 px-8 gap-2">
                                                <p>{histories.request_type.toUpperCase()} BALANCE</p>
                                                <p className="text-right">REQUESTED ON {moment(histories.CreatedAt).format("DD/MM/YYYY")}</p>
                                                <p>STATUS {histories.status.toUpperCase()}</p>
                                                <div className="col-start-2 row-start-2 inline-flex justify-end">
                                                    <p>AMOUNT: </p>
                                                    <CurrencyFormat value={histories.converted_amount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} className="pl-2" />
                                                </div>
                                            </div>
                                        :
                                            <div key={histories.ID} className="history-card bg-theme-2 grid grid-cols-2 grid-rows-2 my-2 py-4 px-8 gap-2">
                                                <p>{histories.request_type.toUpperCase()} BALANCE</p>
                                                <p className="text-right">REQUESTED ON {moment(histories.CreatedAt).format("DD/MM/YYYY")}</p>
                                                <p>STATUS {histories.status.toUpperCase()}</p>
                                                <div className="col-start-2 row-start-2 inline-flex justify-end">
                                                    <p>AMOUNT: </p>
                                                    <CurrencyFormat value={histories.converted_amount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} className="pl-2" />
                                                </div>
                                            </div>
                                ))
                            :
                                <div className="flex items-center justify-center font-main text-3xl">REQUEST HISTORY IS EMPTY. START REQUESTING</div>
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

export default RequestHistory;