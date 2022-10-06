import './App.css';
import Guest from './views/Guest';
import MainPage from './views/MainPage.jsx';
import Login from './components/Login/Login.jsx';
import UserAccountManagement from './components/UserAccount/UserAccountManagement';
import logo from "./images/boxinator.png"

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';


function App() {
  const basename =
    process.env.NODE_ENV === 'production'
      ? '/se-java-boxinator-frontend/'
      : '/';
  return (
    <BrowserRouter basename={basename}>
      <div className="App">
        <div className="image-run">
          <img src={logo} alt="" />
        </div>
        <Navbar />
        <div className='flex flex-col h-screen'>
          <div className='mb-auto'>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/guest' element={<Guest />} />
              <Route path='/dashboard' element={<MainPage />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/account' element={<UserAccountManagement />}></Route>
            </Routes>

          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>

  );
}
export default App;
