import React, { Component } from 'react';
import { Link, json } from 'react-router-dom';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            mobile: ["9875412522"]
        }
    }
    componentDidMount = () => {
        console.log("componentDidMount")
        this.setState({
            name: "code-first",
            address: "pune",
            mobile: [...this.state.mobile, "8574123699"]
        })
    }
    render() {
        const { name, address, mobile } = this.state
        return (
            <div className='container d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
                <h1>sign-up</h1>
                <h4>{this.state.name}</h4>
                <h4>{name}</h4>
                <h4>{address}</h4>
                {mobile.map((item) => {
                    return (
                        <p>{item}</p>
                    )
                })}
            </div>
        );
    }
}

export default SignUp;