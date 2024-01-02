import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Appcontext } from '../../App';
import { DeleteProduct, ShowDetail, commonAPi, getMobileData, getParamspair } from '../../Other/Common'
import { Navigate, useNavigate } from 'react-router-dom';
import HOC from '../../Other/HOC';
import { useDispatch, useSelector } from 'react-redux';
import { storeMobileData } from '../../Redux/react-redux/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import style from './mobile.module.css';
import Card from '../../Other/Card';

const Mobile = () => {
    const ReducerData = useSelector(state => state.reducers)
    console.log(ReducerData.mobileData);
    const dispatch = useDispatch();
    const cartnumb = useContext(Appcontext)
    console.log(cartnumb);
    const navigate = useNavigate();
    const userInfo = localStorage.getItem("userinfo");
    const [Products, setProducts] = useState([]);
    const [Admin, setAdmin] = useState();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin')
        setAdmin(isAdmin)
        // to call the active tab in navabar
        cartnumb.setActiveTB("Mobile")
        if (ReducerData.mobileData.length === 0) {
            getMobileData().then((data) => {
                dispatch(storeMobileData(data))

            });
            getMobileData();
        }
    }, []);
    const addtoCart = useCallback(async (item) => {
        try {
            const userInfols = localStorage.getItem("userinfo");
            const getCutstId = JSON.parse(userInfols)
            let reqBody = {
                "CustId": getCutstId.CustId,
                "ProductId": item.productId,
                "Quantity": item.quantity,
                "AddedDate": new Date()
            }
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Ecomm/AddToCart", reqBody)
            console.log("Add to card >>", result);
            // call function from app.js  
            cartnumb.getCartNum()
        } catch (error) {
            console.log(error);
        }
    }, [])
    const deletProduct = useCallback(async (product) => {
        const res = await axios.get("https://onlinetestapi.gerasim.in/api/Ecomm/DeleteProductById", { params: { id: product.productId } });
        console.log(res);
        commonAPi(1).then((data) => {
            dispatch(storeMobileData(data))

        });
    }, [])
    const openUpdateCart = useCallback((product) => {
        navigate(`/updateProduct?id=${product.productId}`, { state: product });
    }, [])
    const OpenProduct = useCallback((product) => {
        navigate(`/ProductDetailpg?id=${product.productId}`, { state: product });
    }, [])

    const IncrementLogic = useCallback(async (index) => {
        const ItemData = ReducerData.mobileData;
        ItemData[index].quantity = ItemData[index].quantity ? ItemData[index].quantity + 1 : 1;
        dispatch(storeMobileData(ItemData))
    }, [])
    const DecrementLogic = useCallback(async (index) => {
        const ItemData = ReducerData.mobileData;
        ItemData[index].quantity = ItemData[index].quantity ? ItemData[index].quantity - 1 : 0;
        dispatch(storeMobileData(ItemData))
    }, [])
    return (
        <div className={`container mt-2 ${style.backgroundchange}`}>
            <h1>Mobile</h1>
            <div className='row'>
                {ReducerData.mobileData.length > 0 && ReducerData.mobileData.map((item, index) => {
                    return (
                        <div key={index} className="col-md-4"> {/* Add col-md-4 class here */}
                            <Card item={item} index={index} addtoCart={addtoCart} deletProduct={deletProduct} openUpdateCart={openUpdateCart} OpenProduct={OpenProduct} IncrementLogic={IncrementLogic} DecrementLogic={DecrementLogic} Admin={Admin} userInfo={userInfo}></Card>
                        </div>
                    )
                })}
            </div>
        </div>
    );

};

// export default Mobile;
export default HOC(Mobile);