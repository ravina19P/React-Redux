import './App.css';
import NavbarEcom from './Component/Navbar/NavbarEcom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogIn from './Component/Log-in/LogIn'
import Mobile from './Component/Mobile/Mobile'
import Camera from './Component/Camera/Camera'
import Tablet from './Component/Tablet/Tablet'
import Laptop from './Component/Laptop/Laptop'
import Monitor from './Component/Monitor/Monitor'
import Default from './Other/Default'
import Logo from './Component/Logo/Logo'
import React, { createContext, useState } from 'react'
import axios from 'axios';
import ProductDetailpg from './Component/ProducDetail/ProductDetailpg';
const LazyAddproduct = React.lazy(() => import('./Component/AddProduct/Addproduct'))
const LazyCreateCategory = React.lazy(() => import('./Component/CreateCategory/CreateCategory'))
const LazysignUp = React.lazy(() => import('./Component/Sign-up/SignUp'))
const LazyAddtoCart = React.lazy(() => import('./Component/Cart/AddtoCart'))
const UpdateProd = React.lazy(()=>import('./Other/UpdateProduct'));
const Appcontext = createContext();
function App() {
  const [currentPath, setCurrentPath] = useState("")
  const [cartData, setCartData] = useState([]);
  const [globalObj, setGlobalObj] = useState({
    mobileData: [],
    cameraData: [],
    tabletData: [],
    laptopData: [],
    monitorData: []

  })
  
  const getCartNumber = async () => {
    try {
      const ls = localStorage.getItem('userinfo');
      const userInfo = JSON.parse(ls);
      const res = await axios.get(`https://onlinetestapi.gerasim.in/api/Ecomm/GetCartProductsByCustomerId?id=${userInfo.custId}`);
      console.log(res.data.data)
      const cartArray = res.data.data
      setCartData(cartArray);
    } catch (error) {
    }
  }
  const setActiveTAB = (pathNamefromNavbar) => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    console.log(url.pathname);
    if (pathNamefromNavbar) {
      setCurrentPath(pathNamefromNavbar);

    } else {
      setCurrentPath(url.pathname);
    }
  }

  return (
    <div className="App">
      <Appcontext.Provider value={{ cartDatainfo: cartData, getCartNum: getCartNumber, curntPath: currentPath, setActiveTB: setActiveTAB }}>
        <BrowserRouter>
          <NavbarEcom></NavbarEcom>
          <Routes>
            <Route path='/' element={<Logo></Logo>}></Route>
            <Route path='/LogIn' element={<LogIn></LogIn>}></Route>
            <Route path='/SignUp' element={<React.Suspense fallback='loading...'><LazysignUp /></React.Suspense>}></Route>
            <Route path='/Mobile' element={<Mobile></Mobile>}></Route>
            <Route path='/Camera' element={<Camera></Camera>}></Route>
            <Route path='/Tablet' element={<Tablet></Tablet>}></Route>
            <Route path='/Laptop' element={<Laptop></Laptop>}></Route>
            <Route path='/Monitor' element={<Monitor></Monitor>}></Route>
            <Route path="/AddtoCart" element={<React.Suspense fallback='loading...'><LazyAddtoCart /></React.Suspense>}></Route>
            <Route path="/AddProduct" element={<React.Suspense fallback='loading...'><LazyAddproduct /></React.Suspense>}></Route>
            <Route path="/CreateCategory" element={<React.Suspense fallback='loading...'><LazyCreateCategory /></React.Suspense>}></Route>
            <Route path='/updateProduct' element={<React.Suspense><UpdateProd /></React.Suspense>}></Route>
            <Route path="/ProductDetailpg" element={<ProductDetailpg></ProductDetailpg>}></Route>
            <Route path='*' element={<Default></Default>}></Route>
          </Routes>
        </BrowserRouter>
      </Appcontext.Provider>
    </div>
  );
}

export default App;
export { Appcontext }

