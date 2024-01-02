import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
const HOC = (Wrapcomponent)=>{
       
    class NewComponent extends Component {
        render() {
            const ls = localStorage.getItem('userinfo')
            const userInfo = JSON.parse(ls)
            if(userInfo !== null){
                return <Wrapcomponent/>
            }else{
                return <Navigate to="/LogIn"></Navigate>;
            }
        }
    }
    return NewComponent
}
export default HOC;