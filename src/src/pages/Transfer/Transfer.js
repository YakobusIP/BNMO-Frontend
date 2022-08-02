import NavbarCust from "../../components/NavbarCust/NavbarCust";
import { currencies } from '../../components/Currencies/Currencies';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Transfer() {
    // Transfer data flow:
    // 1. Pull currency names from Currencies.js
    // 2. Pull account data from local storage
    // 3. Get destination accounts data from backend
    // 4. User input transfer amount with the preferred currency 
    // 5. Send transfer data to backend
    // 6. If any error occured, receive message from backend and display it

    // Account data
    const [accountData, setAccountData] = useState({});
    const [transferData, setTransferData] = useState([]);

    // Input values
    const [amount, setAmount] = useState();

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
        setDestination(e.target.value);
    }

    // Retrieve customer data from backend
    const getTransferData = () => {
        axios.get('http://localhost:8080/api/displayaccounts', {
            withCredentials: true,
        }).then(response => {
            setTransferData(response.data.data);
        }).catch(err => {
            console.log(err);
        })
    }

    // Move screen to top when load the page
    // Pull account data from local storage
    useEffect(() => {
        window.scrollTo(0, 0);
        const Account = localStorage.getItem("account");
        if (Account) {
            const parseAccount = JSON.parse(Account);
            setAccountData(parseAccount);
        } else {
            navigate("/login");
        }
        getTransferData();
    }, []);

    // Function to check if data id is the same as account id
    function checkID(data) {
        return data.id !== accountData.ID;
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
            account_id: accountData.ID
        };

        await axios.post('http://localhost:8080/api/transfer', data, {
            withCredentials: true,
        }).then(response => {
            setPostMessage(response.data.message);
            e.target.reset();
            const transfer_dest = document.getElementById("transfer_dest");
            transfer_dest.selectedIndex = null;
            const currency = document.getElementById("currency");
            currency.selectedIndex = null;
        }).catch(err => {
            setPostMessage(err.response.data.message);
        });
    }

    return (
        <>
            <div className="min-h-screen">
                <NavbarCust />
                <div className="large-box justify-center">
                    <div className='flex flex-col items-center py-8'>
                        <div className="font-main drop-shadow-2xl text-white text-8xl">
                            <h2>- TRANSFER -</h2>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <form className="request-card my-20 lg:my-16 flex flex-col justify-center items-center" onSubmit={ sendTransfer }>
                        <p className="text-2xl lg:text-4xl">From: {accountData.first_name} {accountData.last_name} ({accountData.username})</p>
                        <p className="flex flex-row items-center text-2xl lg:text-4xl">To: 
                            <select id="transfer_dest" className='flex my-2 justify-center rounded-xl shadow-md border px-4 py-2 text-xl lg:text-2xl' onChange={ changeTransferDestination }>
                                <option value="" className="text-gray-700 block px-4 py-2 text-sm hover:bg-theme-1" disabled selected>Please choose the transfer destination</option>
                                {
                                    filteredData.map((accounts) => (
                                        <option key={accounts.id} value={accounts.id} className="text-gray-700 block px-4 py-2 text-sm hover:bg-theme-1">{ accounts.first_name } { accounts.last_name } ({ accounts.username })</option>
                                    ))
                                }
                            </select></p>
                        <select id="currency" className='flex my-2 justify-center rounded-xl shadow-md border px-4 py-2 text-base lg:text-xl' onChange={ changeCurrency }>
                            <option value="" className="text-gray-700 block px-4 py-2 text-sm hover:bg-theme-1" disabled selected>Please choose the preffered currency</option>
                            {
                                Object.entries(currencies).map(([key, item]) => <option key={ key } value = { key } className="text-gray-700 block px-4 py-2 text-sm hover:bg-theme-1">{ key } - { item }</option>)
                            }  
                        </select>
                        <div className="my-4 w-full md:w-2/3 lg:w-3/4 px-8">
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