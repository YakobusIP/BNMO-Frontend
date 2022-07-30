import axios from 'axios';
import { currencies } from '../../components/Currencies/Currencies';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarCust from '../../components/NavbarCust/NavbarCust';

function Request() {
    // Account data
    const [accountData, setAccountData] = useState();

    // Input values
    const [amount, setAmount] = useState(0);
    
    // Flags for chosen currency
    const [leftCurrency, setLeftCurrency] = useState('IDR');
    const [rightCurrency, setRightCurrency] = useState('IDR');

    // Post message
    const [leftPostMessage, setLeftPostMessage] = useState(null);
    const [rightPostMessage, setRightPostMessage] = useState(null);

    const navigate = useNavigate();

    // Click events for individual currencies
    function changeLeftCurrencies(e) {
        setLeftCurrency(e.target.value);
    }

    function changeRightCurrencies(e) {
        setRightCurrency(e.target.value);
    }

    // Function to send add request
    // No maximum limit
    const sendAddRequest = async (e) => {
        e.preventDefault();

        const data = {
            request_type: "add",
            status: "pending",
            amount: parseInt(amount),
            currency: leftCurrency,
            converted_amount: 0,
            account_id: String(accountData.account_id)
        };

        console.log(data);

        await axios.post('http://localhost:8080/api/customerrequest/add', data, {
            withCredentials: true,
        }).then(response => {
            setLeftPostMessage(response.data.message);
            e.target.reset();
        }).catch(err => {
            setLeftPostMessage(err.response.data.message);
        });
    }

    // Function to send subtract request
    // No maximum limit
    const sendSubtractRequest = async (e) => {
        e.preventDefault();

        const data = {
            request_type: "subtract",
            status: "pending",
            amount: parseInt(amount),
            currency: rightCurrency,
            converted_amount: 0,
            account_id: String(accountData.account_id)
        };

        console.log(data);

        await axios.post('http://localhost:8080/api/customerrequest/subtract', data, {
            withCredentials: true,
        }).then(response => {
            setRightPostMessage(response.data.message);
            e.target.reset();
        }).catch(err => {
            setRightPostMessage(err.response.data.message);
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        const Account = localStorage.getItem("account");
        if (Account) {
            const parseAccount = JSON.parse(Account);
            setAccountData(parseAccount);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <>
            <div className="min-h-screen">
                <NavbarCust />
                <div className="large-box justify-center">
                    <div className='flex flex-col items-center py-8'>
                        <div className="font-main drop-shadow-2xl text-white text-8xl">
                            <h2>- REQUEST -</h2>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <form className="request-card mx-6 my-20 lg:my-16 lg:ml-12 flex flex-col justify-center items-center" onSubmit={ sendAddRequest }>
                        <p className="mt-4 text-4xl text-center">ADD BALANCE</p>
                        <select className='flex my-2 justify-center rounded-xl shadow-md border px-4 py-2' onChange={ changeLeftCurrencies }>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            <option value="IDR" selected>IDR - Indonesian Rupiah</option>
                            {
                                Object.entries(currencies).map(([key, item]) => <option value = { key } className="text-gray-700 block px-4 py-2 text-sm hover:bg-theme-1">{ key } - { item }</option>)
                            }
                                
                        </select>
                        <div className="my-4 w-full lg:w-1/2 px-8">
                            <input 
                                className="-z-1 shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                onChange={ (e) => setAmount(e.target.value)}
                                type="number" 
                                placeholder="Amount" 
                                required/>
                        </div>
                        { leftPostMessage && <p className='text-xl mt-2 drop-shadow-xl text-center'>{leftPostMessage}</p>}
                        <div className='flex my-4 justify-center z-0'>
                            <button type="submit" className='large-btn bg-theme-1 transition duration-200 hover:text-white hover:drop-shadow-md'>REQUEST</button>
                        </div>
                    </form>
                    <form className="request-card mx-6 my-20 lg:my-16 lg:mr-12 flex flex-col justify-center items-center" onSubmit={ sendSubtractRequest }>
                        <p className="mt-4 text-4xl text-center">SUBTRACT BALANCE</p>
                        <select className='flex my-2 justify-center rounded-xl shadow-md border px-4 py-2' onChange={ changeRightCurrencies }>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            <option value="IDR" selected>IDR - Indonesian Rupiah</option>
                            {
                                Object.entries(currencies).map(([key, item]) => <option value = { key } className="text-gray-700 block px-4 py-2 text-sm hover:bg-theme-1">{ key } - { item }</option>)
                            }
                                
                        </select>
                        <div className="my-4 w-full lg:w-1/2 px-8">
                            <input 
                                className="-z-1 shadow-md appearance-none border rounded-full w-full px-4 py-2 focus:outline-none focus:shadow-outline" 
                                onChange={ (e) => setAmount(e.target.value)}
                                type="number" 
                                placeholder="Amount" 
                                required/>
                        </div>
                        { rightPostMessage && <p className='text-xl mt-2 drop-shadow-xl text-center'>{rightPostMessage}</p>}
                        <div className='flex my-4 justify-center z-0'>
                            <button type="submit" className='large-btn bg-theme-1 transition duration-200 hover:text-white hover:drop-shadow-md'>REQUEST</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Request;