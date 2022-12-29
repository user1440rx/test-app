import { Routes, Route } from 'react-router-dom';

// NavBar, Footer
import NavBar from './components/Navbar/MainNavBar'
// import FooterMain from './components/Footer/MainFooter';

import Listing from './components/Homepage/Listing';
import CartListing from './components/Cart/Listing';
import OrdersListing from './components/Orders/Listing';

// Login, Register
import Register from './components/LoginRegister/Register';
import Login from './components/LoginRegister/Login';
import Logout from './components/LoginRegister/Logout';
import AccountPage from './components/LoginRegister/Account';
import ListUsers from './components/LoginRegister/ListUsers';

const App = () => {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={<Listing />} />
      <Route path='/cart' element={<CartListing />} />
      <Route path='/orders' element={<OrdersListing />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Logout' element={<Logout />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/list-users' element={<ListUsers />} />
    </Routes>
    {/* <FooterMain /> */}
    </>
  );
}

export default App;
