import axios from 'axios';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Label from '../UI/Label/Label';
import Text from '../UI/Text/Text';
import Select from '../UI/Select/Select';
import Checkbox from '../UI/Checkbox/Checkbox';
import axiosInstance from '../../AxiosInterceptor/axiosInterceptor';

const LogIn = () => {
    // const [info, setInfo] = useState({ UserName: '', password: '', Dropvalue: '', gender: '' })
    const [info, setInfo] = useState({ UserName: '', password: '' })
    const [error, setError] = useState([]);
    const OnchangeHandle = (event, fieldname) => {
        setInfo((prevstate) => ({ ...prevstate, [fieldname]: event.target.value }))
    }
    const jswTokenCall = async () => {
        // http://localhost:8000/auth/login  
        try {
            let reqBody = {
                email: "nilson4@email.com",
                password: "nilson"
            }
            const res = await axios.post("http://localhost:8000/auth/login", reqBody)
            console.log(res);
            localStorage.setItem("token", res.data.access_token)
            alert("Login Succesfull")
            window.location.href = '/';
        } catch (error) {
            console.log(error)
        }
    }
    const submitHandle = async (event) => {
        console.log("Submit handle called")
        const { UserName, password } = info;
        event.preventDefault();
        let ErrorArray = [];
        for (let x in info) {
            if (info[x] === "") {
                ErrorArray.push(x)
            }
        }
        setError(ErrorArray);
        if (ErrorArray.length <= 0) {
            let reqBody = {
                "UserName": UserName,
                "UserPassword": password
            }
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Ecomm/Login", reqBody)
            console.log(result.data);
            const responce = result.data;
            if (responce.data !== null && responce.result) {
                jswTokenCall();
                localStorage.setItem("userinfo", JSON.stringify(responce.data))             
            } if (UserName === 'admin' && password === '1234') {
                localStorage.setItem("isAdmin", true);
            }
            else {
                alert(responce.message)
            }
        }
    }
    const HandleError = (value) => {
        return error.indexOf(value) > -1 ? true : false;
    }
    const optionArray = ["item1", "item2", "item3"];
    const CheckboxArray = ["male", "female", "other"];

    return (
        <div className='container d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
            <div className='row col-md-5 border p-4'>
                <form className='mt-3' onSubmit={(e) => submitHandle(e)}>
                    <h3>Log-In</h3>
                    <div className="form-group mt-2">
                        <Label labelName="User Name"></Label>
                        <Text type="text" value={info.UserName} placeholder="please enter username "
                            onChange={OnchangeHandle} fieldname="UserName"
                            handleError={HandleError("UserName")}
                        ></Text>
                    </div>
                    <div className="form-group mt-2">
                        <Label labelName="Password"></Label>
                        <Text type="password" value={info.password} placeholder="please enter password"
                            onChange={OnchangeHandle} fieldname="password"
                            handleError={HandleError("password")} 
                        ></Text>
                    </div>
                    <div className="form-group">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    {/* <div className="form-group mt-2">
                        <Label labelName="Drop Down"></Label>
                        <Select
                            value={info.Dropvalue} fieldname="Dropvalue"  options={optionArray}
                            onChangeHandler={OnchangeHandle}
                            HandleError={HandleError}  
                        />
                    </div>
                    <div className="form-group">
                        <Label labelName="Gender"></Label>
                        <Checkbox
                            options={CheckboxArray}
                            onchangeHandle={OnchangeHandle} fieldname="gender"
                            HandleError={HandleError("gender")}
                        />
                    </div> */}

                </form>
            </div>
        </div>
    );
};

export default LogIn;