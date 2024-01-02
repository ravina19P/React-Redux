import axios from 'axios';
import React, { useState } from 'react';
import { Link, json } from 'react-router-dom';
import Label from '../UI/Label/Label';
import Text from '../UI/Text/Text';

const SignUp = () => {
    const [info, setInfo] = useState({ Name: '', MobileNo: '', password: '' })
    const [error, setError] = useState([]);

    const OnchangeHandle = (event, fieldname) => {
        setInfo((prevstate) => ({ ...prevstate, [fieldname]: event.target.value }))
    }
    const submitHandle = async (event) => {
        const { Name, MobileNo, password } = info;
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
                "Name": Name,
                "MobileNo": MobileNo,
                "Password": password
            }
            const result = await axios.post("https://onlinetestapi.gerasim.in/api/Ecomm/RegisterCustomer", reqBody)
            console.log(result.data);
            const responce = result.data;
            if (responce.data !== null && responce.result) {
                alert("Signin Succesfull")
                localStorage.setItem("userinfo", JSON.stringify(responce.data))
                window.location.href = '/';
            } else {
                alert(responce.message)
            }
        }
    }
    const HandleError = (value) => {
        return error.indexOf(value) > -1 ? true : false;
    }
    return (
        <div>
            <div className='container d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
                <div className='row col-md-5 border p-4'>
                    <form className='mt-3' onSubmit={(e) => submitHandle(e)}>
                        <h3>Sign-Up</h3>
                        <div className="form-group">
                            <Label labelName="Name"></Label>
                            <Text type="text" value={info.Name} placeholder="please enter Name "
                                onChange={(e) => OnchangeHandle(e, 'Name')} fieldname="Name"
                                handleError={HandleError("Name")}
                            ></Text>
                        </div>
                        <div className="form-group">
                            <Label labelName="Mobile No"></Label>
                            <Text type="tel" value={info.MobileNo} placeholder="please enter Mobile No"
                                onChange={(e) => OnchangeHandle(e, 'MobileNo')} fieldname="MobileNo"
                                handleError={HandleError("MobileNo")}
                            ></Text>
                        </div>
                        <div className="form-group">
                            <Label labelName="Password"></Label>
                            <Text type="password" value={info.password} placeholder="please enter password"
                                onChange={OnchangeHandle} fieldname="password"
                                handleError={HandleError("password")}
                            ></Text>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default SignUp;