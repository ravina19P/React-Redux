import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Appcontext } from '../../App';
import HOC from '../../Other/HOC';
import { DeleteProduct, GetLaptopData, commonAPi } from '../../Other/Common';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeLaptopData } from '../../Redux/react-redux/action';
import style from './Laptop.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Laptop = () => {
    const ReducerData = useSelector(state => state.reducers)
    const dispatch = useDispatch()
    const context = useContext(Appcontext)
    const navigate = useNavigate();
    const userInfo = localStorage.getItem("userinfo");
    const [Products, setProducts] = useState([]);
    const [Admin, setAdmin] = useState();
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin')
        setAdmin(isAdmin)
        context.setActiveTB("Laptop")
        if (ReducerData.laptopData.length === 0) {
            GetLaptopData().then((data) => {
                dispatch(storeLaptopData(data))
            });
            GetLaptopData();
        }
    }, [])
    const Increment = (index) => {
        // setQty(qty + 1);
        console.log(index, Products[index])
        setProducts(prevstate => {
            let updatedObj = prevstate.map((item, ind) => {
                if (index === ind) {
                    let quantity = item.quantity ? item.quantity + 1 : 1;
                    return { ...item, quantity: quantity }
                } else {
                    return { ...item }
                }
            })
            return updatedObj
        })
    }
    const Decrement = (index) => {
        console.log(index, Products[index])
        setProducts(prevstate => {
            let updatedObj = prevstate.map((item, ind) => {
                if (index === ind) {
                    let quantity = item.quantity ? item.quantity - 1 : 0;
                    return { ...item, quantity: quantity }
                } else {
                    return { ...item }
                }
            })
            return updatedObj
        })
    }
    const addtoCart = async (item) => {
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
            context.getCartNum()
        } catch (error) {
            console.log(error);
        }
    }
    const deletProduct = async (product) => {
        const res = await axios.get("https://onlinetestapi.gerasim.in/api/Ecomm/DeleteProductById", { params: { id: product.productId } });
        console.log(res);
        commonAPi(1).then((data) => {  
            dispatch(storeLaptopData(data)) 

        });

    }
    const openUpdateCart = (product) => {
        navigate(`/updateProduct?id=${product.productId}`, { state: product });
    }
    const OpenProduct = (product) => {
        navigate(`/ProductDetailpg?id=${product.productId}`, { state: product });
    }
    const IncrementLogic = (index) => {
        const ItemData = ReducerData.laptopData;
        ItemData[index].quantity = ItemData[index].quantity ? ItemData[index].quantity + 1 : 1;
        dispatch(storeLaptopData(ItemData))
    }
    const DecrementLogic = (index) => {
        const ItemData = ReducerData.laptopData;
        ItemData[index].quantity = ItemData[index].quantity ? ItemData[index].quantity - 1 : 0;
        dispatch(storeLaptopData(ItemData))
    }
    return (
        <div className={`container mt-2 ${style.backgroundchange}`}>
            <h1>Laptop</h1>
            <div className='row'>
                {ReducerData.laptopData.length > 0 && ReducerData.laptopData.map((item, index) => {
                    return (
                        <div className="card col-md-4 m-3 p-2" style={{ width: "18rem" }}>
                            {Admin &&
                                <div className="d-flex justify-content-end" >
                                    <FontAwesomeIcon className="left mr-3" onClick={() => openUpdateCart(item)} style={{ cursor: "pointer", color: "grey" }} icon={faEdit} />
                                    <FontAwesomeIcon className="right" onClick={() => deletProduct(item)} icon={faTrash} style={{ cursor: "pointer", color: "grey" }} />
                                </div>
                            }
                            <img src={item.productImageUrl} className="card-img-top" alt="Card Image" onClick={() => OpenProduct(item)} />
                            <div className="card-body">
                                <h5 className="card-title">{item.productName}</h5>
                                <h5 className="card-text">₹ {item.productPrice}</h5>
                                <p className="card-text"><strong>FREE delivery - </strong>{item.deliveryTimeSpan}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {userInfo !== null && <>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary" onClick={() => IncrementLogic(index)}>+</button>
                                            <button type="button" className="btn btn-primary">{item.quantity ? item.quantity : 0}</button>
                                            <button type="button" className="btn btn-primary" onClick={() => DecrementLogic(index)}>-</button>
                                        </div>
                                        < button disabled={item.quantity ? false : true} type="button" className="btn btn-primary" onClick={() => addtoCart(item)}>Add to Cart</button> </>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default HOC(Laptop);