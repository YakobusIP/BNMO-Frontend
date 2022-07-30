import NavbarCust from "../../components/NavbarCust/NavbarCust";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import axios from "axios";

function RequestHistory() {
    // Request history states
    const [requestHistory, setRequestHistory] = useState([]);

    // Pagination
    const [page, setPage] = useState(1);

    const getRequestHistory = () => {
        axios.get(`http://localhost:8080/api/requesthistory?page=${page}`, {
            withCredentials: true,
        }).then(response => {
            setRequestHistory(response.data.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getRequestHistory();
    }, [getRequestHistory()]);
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
                <div className="flex flex-col justify-center items-center">
                    {
                        requestHistory.length >= 1 ?
                            requestHistory.map((histories) => (
                                histories.status === "pending" ?
                                    <div className="history-card bg-theme-3 grid grid-cols-2 grid-rows-2 my-2 py-4 px-8 gap-2">
                                        <p>{histories.request_type.toUpperCase()} BALANCE</p>
                                        <p className="text-right">REQUESTED ON {moment(histories.CreatedAt).format("DD/MM/YYYY")}</p>
                                        <p>STATUS {histories.status.toUpperCase()}</p>
                                        <p className="text-right">AMOUNT: RP {histories.converted_amount}</p>
                                    </div>
                                :
                                    histories.status === "accepted" ?
                                        <div className="history-card bg-theme-1 grid grid-cols-2 grid-rows-2 my-2 py-4 px-8 gap-2">
                                            <p>{histories.request_type.toUpperCase()} BALANCE</p>
                                            <p className="text-right">REQUESTED ON {moment(histories.CreatedAt).format("DD/MM/YYYY")}</p>
                                            <p>STATUS {histories.status.toUpperCase()}</p>
                                            <p className="text-right">AMOUNT: RP {histories.converted_amount}</p>
                                        </div>
                                    :
                                        <div className="history-card bg-theme-2 grid grid-cols-2 grid-rows-2 my-2 py-4 px-8 gap-2">
                                            <p>{histories.request_type.toUpperCase()} BALANCE</p>
                                            <p className="text-right">REQUESTED ON {moment(histories.CreatedAt).format("DD/MM/YYYY")}</p>
                                            <p>STATUS {histories.status.toUpperCase()}</p>
                                            <p className="text-right">AMOUNT: RP {histories.converted_amount}</p>
                                        </div>
                            ))
                        :
                            <div className="flex items-center justify-center font-main text-3xl">REQUEST HISTORY IS EMPTY. START REQUESTING</div>
                    }
                </div>
            </div>
        </>
    );
}

export default RequestHistory;