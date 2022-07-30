import NavbarCust from "../../components/NavbarCust/NavbarCust";
import { currencies } from '../../components/Currencies/Currencies';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Transfer() {
    // Account data
    const [accountData, setAccountData] = useState();
    const [transferData, setTransferData] = useState([]);

    // Input values
    const [amount, setAmount] = useState();

    // Required data
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();

    // Flags for chosen currency
    const [currency, setCurrency] = useState('IDR');
    const [destination, setDestination] = useState(0);

    // Post message
    const [postMessage, setPostMessage] = useState(null);

    const filteredData = transferData?.filter((data) => checkID(data));
    const navigate = useNavigate();

    // Change currency
    function changeCurrency(e) {
        setCurrency(e.target.value);
    }

    // Change destination
    function changeTransferDestination(e) {
        console.log("test");
        setDestination(e.target.value);
    }

    // Retrieve customer data from backend
    const getTransferData = () => {
        axios.get('http://localhost:8080/api/displayaccounts', {
            withCredentials: true,
        }).then(response => {
            setTransferData(response.data.data);
            //console.log(response.data.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        const Account = localStorage.getItem("account");
        if (Account) {
            const parseAccount = JSON.parse(Account);
            setAccountData(parseAccount);
            setFirstName(parseAccount.first_name);
            setLastName(parseAccount.last_name);
            setUsername(parseAccount.username);
        } else {
            navigate("/login");
        }
        getTransferData();
    }, []);

    function checkID(data) {
        return data.id !== accountData.id;
    }

    // Function to send transfer data
    const sendTransfer = async (e) => {
        e.preventDefault();

        const data = {
            destination: String(destination),
            status: "pending",
            amount: parseInt(amount),
            currency: currency,
            converted_amount: 0,
            account_id: String(accountData.id)
        };

        console.log(data);

        await axios.post('http://localhost:8080/api/transfer', data, {
            withCredentials: true,
        }).then(response => {
            setPostMessage(response.data.message);
            console.log(response.data);
            e.target.reset();
        }).catch(err => {
            setPostMessage(err.response.data.message);
        });
    }

    return (
        <>
            <div className="min-h-screen">
                <NavbarCust current="transfer" />
                <div className="large-box justify-center">
                    <div className='flex flex-col items-center py-8'>
                        <div className="font-main drop-shadow-2xl text-white text-8xl">
                            <h2>- TRANSFER -</h2>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <form className="request-card my-20 lg:my-16 flex flex-col justify-center items-center" onSubmit={ sendTransfer }>
                        <p className="text-2xl lg:text-4xl">From: {firstName} {lastName} ({username})</p>
                        <p className="flex flex-row items-center text-2xl lg:text-4xl">To: 
                            <select className='flex my-2 justify-center rounded-xl shadow-md border px-4 py-2 text-xl lg:text-2xl' onChange={ changeTransferDestination }>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                                <option value="" className="text-gray-700 block px-4 py-2 text-sm hover:bg-theme-1" disabled selected>Please choose the transfer destination</option>
                                {
                                    filteredData.map((accounts) => (
                                        <option value={accounts.id} className="text-gray-700 block px-4 py-2 text-sm hover:bg-theme-1">{ accounts.first_name } { accounts.last_name } ({ accounts.username })</option>
                                    ))
                                }
                            </select></p>
                        <select className='flex my-2 justify-center rounded-xl shadow-md border px-4 py-2 text-base lg:text-xl' onChange={ changeCurrency }>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            <option value={"IDR"} selected>IDR - Indonesian Rupiah</option>
                            {
                                Object.entries(currencies).map(([key, item]) => <option value = { key } className="text-gray-700 block px-4 py-2 text-sm hover:bg-theme-1">{ key } - { item }</option>)
                            }  
                        </select>
                        <div className="my-4 w-full lg:w-3/4 px-8">
                            <input 
                                className="shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                onChange={ (e) => setAmount(e.target.value)}
                                type="number" 
                                placeholder="Amount"/>
                        </div>
                        { postMessage && <p className='text-xl mt-2 drop-shadow-xl text-center'>{postMessage}</p>}
                        <button type="submit" className='large-btn bg-theme-1 transition duration-200 hover:text-white hover:drop-shadow-md flex my-4 justify-center'>TRANSFER</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Transfer;