import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';

import './App.css';
import SnackbarProvider from 'react-simple-snackbar'
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Request from './pages/Request/Request';
import Transfer from './pages/Transfer/Transfer';
import Footer from './components/Footer/Footer';
import RequestHistory from './pages/History/RequestHistory';
import TransferHistory from './pages/History/TransferHistory';
import AccountVerification from './pages/AccountVerification/AccountVerification';
import RequestVerification from './pages/RequestVerification/RequestVerification';
import CustomerData from './pages/CustomerData/CustomerData';

function App() {
    return (
        <div>
            <SnackbarProvider>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/login' element={ <Login /> } />
                    <Route path='/register' element={ <Register /> } />
                    <Route path='/customerrequest' element={ <Request /> } />
                    <Route path='/profile' element={ <Profile /> } />
                    <Route path='/transfer' element={ <Transfer /> } />
                    <Route path='/requesthistory' element= { <RequestHistory />} />
                    <Route path='/transferhistory' element= { <TransferHistory />} />
                    <Route path='/accountverification' element= { <AccountVerification /> } />
                    <Route path='/validaterequest' element= { <RequestVerification /> } />
                    <Route path='/customerdata' element= { <CustomerData /> } />
                </Routes>
                <Footer />
            </SnackbarProvider>
        </div>
    );
}

export default App;
