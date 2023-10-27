import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Redirect

// home components
import Header from './components/Header/header';
import Login from './components/Login/login';
import Register from './components/Register/register';
import About from './components/About/about';
import Home from './components/Home/home';
import Services from './components/Services/services';
import Contact from './components/Contact/contact';

// user components
import Sidebar from './userComponents/SideBar/sidebar';
import Profile from './userComponents/Profile/profile';
import UploadDocument from './userComponents/UploadDocument/uploadDocument';
import MySummary from './userComponents/MySummary/mySummary';
import MakePayment from './userComponents/MakePayment/makePayment';
import MyTaxDocuments from './userComponents/MyTaxDocuments/myTaxDocuments';
import TaxInterview from './userComponents/TaxInterview/taxInterview';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {/* <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<About/>}/>
            <Route path='/services' element={<Services />} />
            <Route path='/contact' element={<Contact />} /> 
          </Routes> */}
        <div className='d-flex'>
          <Sidebar />
          <Routes>
            <Route path='/profile' element={<Profile />} />
            <Route path='/tax-interview' element={<TaxInterview/>}/>
            <Route path='/upload-document' element={<UploadDocument />} />
            <Route path='/my-summary' element={<MySummary />} />
            <Route path='/make-payment' element={<MakePayment />} />
            <Route path='/my-tax-documents' element={<MyTaxDocuments />} />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
