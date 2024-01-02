import React, { useContext, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightToBracket, faPowerOff, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Logo from './Images/Logo.png';
import './Navbar.css'
import { GetData } from '../../Other/Common';
import { Link } from 'react-router-dom';
import { Appcontext } from '../../App';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarEcom = () => {
    const cartnumb = useContext(Appcontext)
    console.log(cartnumb);
    const [data, setData] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [Admin, setAdmin] = useState();

    useEffect(() => {
        // to enable and disable the login and signUp in option
        const userInfo = localStorage.getItem("userinfo");
        const isAdmin = localStorage.getItem('isAdmin')
        if (userInfo !== null) {
            setIsLogin(true)
        } if (isAdmin) {
            setAdmin(isAdmin)
        }
        cartnumb.setActiveTB();
        cartnumb.getCartNum();
        GetData().then((Responcedata) => {
            setData(Responcedata);
        })
    }, []);
    // logout and show the login and sign up options
    const setActiveTAB = (path) => {
        const ls = localStorage.getItem("userinfo");
        const userInfo = JSON.parse(ls)
        if (userInfo !== null) {
            cartnumb.setActiveTB(path)
        }
    }
    const logout = () => {
        localStorage.clear();
        window.location.href = "/"

    }
    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark">
                <img src={Logo} alt="Shopzio Logo" style={{ width: "60px", marginRight: "12px" }} />
                <a href="/" className=" navbar-brand custom-text" style={{ fontSize: '25px' }} >Shopzio</a>
                <Nav className="me-auto">
                    {data.slice(0, 5).map((item, index) => {
                        return (
                            <Nav.Link as={Link} to={item.categoryName} onClick={() => setActiveTAB(item.categoryName)} style={cartnumb.curntPath.indexOf(item.categoryName) > -1 ? { color: "White" } : {}}>{item.categoryName}</Nav.Link>
                        )
                    })}
                    <Nav.Link as={Link} to="/AddtoCart" onClick={() => setActiveTAB("AddtoCart")} style={
                        cartnumb.curntPath.indexOf({ faCartShopping }) > -1 ? { color: "White" } : {}}>
                        <FontAwesomeIcon icon={faCartShopping} style={{ color: 'white', fontSize: '25px' }} /> <sup>{cartnumb.cartDatainfo?.length}</sup>
                    </Nav.Link>
                    {Admin && <NavDropdown title="Admin Module" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">
                            <Nav.Link as={Link} to="/AddProduct" onClick={() => setActiveTAB("AddProduct")} style={
                                cartnumb.curntPath.indexOf("AddProduct") > -1 ? { color: "White" } : {}}>Add-Product
                            </Nav.Link></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            <Nav.Link as={Link} to="/CreateCategory" onClick={() => setActiveTAB("CreateCategory")} style={
                                cartnumb.curntPath.indexOf("CreateCategory") > -1 ? { color: "White" } : {}}>Create Category
                            </Nav.Link>
                        </NavDropdown.Item>
                    </NavDropdown>}
                </Nav>
                <Nav className="ml-auto">
                    {!isLogin &&
                        <>
                            <Nav.Link as={Link} to="/LogIn" onClick={() => setActiveTAB("Login")}>
                                <FontAwesomeIcon icon={faUser} style={{ color: 'white', fontSize: '25px' }} />
                            </Nav.Link>
                            <Nav.Link as={Link} to="/SignUp" onClick={() => setActiveTAB("Signup")}>
                                <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: 'white', fontSize: '25px' }} />
                            </Nav.Link>
                        </>}
                    {isLogin && (
                        <Nav.Link as={Link} onClick={() => logout()} style={{ color: 'white', cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faPowerOff} style={{ color: 'white', fontSize: '25px' }} />
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar>
        </div>
    );
};

export default NavbarEcom;