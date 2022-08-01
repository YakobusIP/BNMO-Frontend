import NavbarCust from "../../components/NavbarCust/NavbarCust";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import axios from "axios";

function TransferHistory() {
    // Request history states
    const [transferHistory, setTransferHistory] = useState([]);

    // Pagination
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const previousPage = () => {
        if (page != 1) {
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if (page != pageCount) {
            setPage(page + 1);
        }
    }

    const getTransferHistory = () => {
        axios.get(`http://localhost:8080/api/transferhistory?page=${page}`, {
            withCredentials: true,
        }).then(response => {
            setTransferHistory(response.data.data);
            setPageCount(response.data.metadata.last_page);
            console.log(response.data);
        }).catch(err => {
            console.log(err.response.data);
        })
    }

    useEffect(() => {
        getTransferHistory();
    }, [page]);
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
                        <Link to='/requesthistory' className="mx-8 transition duration-200 border-b-4 border-transparent hover:border-black hover:ease-in">REQUEST</Link>
                        <Link to='/transferhistory' className="mx-8 transition duration-200 border-b-4 border-black">TRANSFER</Link>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center">
                    {
                        pageCount > 1 ?
                            <button onClick={ previousPage } className="pagination-btn items-center border-primary border-2 border-black font-main ml-16">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        : null
                    }
                    <div className="flex flex-col justify-center items-center">
                        {
                            transferHistory.length >= 1 ?
                                transferHistory.map((histories) => (
                                    histories.status === "success" ?
                                        <div className="history-card bg-theme-1 grid grid-cols-3 my-2 py-4 px-8">
                                            <p>TRANSFER {histories.status.toUpperCase()}FUL</p>
                                            <p className="text-center">{moment(histories.CreatedAt).format("DD/MM/YYYY")}</p>
                                            <p className="text-right">AMOUNT: RP {histories.converted_amount}</p>
                                        </div>
                                    :
                                        <div className="history-card bg-theme-2 grid grid-cols-3 my-2 py-4 px-8">
                                            <p>TRANSFER {histories.status.toUpperCase()}</p>
                                            <p className="text-center">{moment(histories.CreatedAt).format("DD/MM/YYYY")}</p>
                                            <p className="text-right">AMOUNT: RP {histories.converted_amount}</p>
                                        </div>
                                ))
                            :
                                <div className="flex items-center justify-center font-main text-3xl">TRANSFER HISTORY IS EMPTY. START TRANSFERRING</div>
                        }
                    </div>
                    {
                        pageCount > 1 ?
                            <button onClick={ nextPage } className="pagination-btn flex items-center border-primary border-2 border-black font-main justify-end mr-16">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        : null
                    }
                </div>
                
            </div>
        </>
    );
}

export default TransferHistory;