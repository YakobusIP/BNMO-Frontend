import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';

import './App.css';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Request from './pages/Request/Request';
import Transfer from './pages/Transfer/Transfer';
import Footer from './components/Footer/Footer';
import RequestHistory from './pages/History/RequestHistory';
import TransferHistory from './pages/History/TransferHistory';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/register' element={ <Register /> } />
                <Route path='/customerrequest' element={ <Request /> } />
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/transfer' element={ <Transfer /> } />
                <Route path='/requesthistory' element= { <RequestHistory />} />
                <Route path='/transferhistory' element= { <TransferHistory />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
