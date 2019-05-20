import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { TextInput, Button, toaster } from 'evergreen-ui';
// import {Link} from 'react-router-dom';
import '../../assets/login.css';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../host';


const cookies = new Cookies();
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    Logins(event) {
        event.preventDefault();
        axios.post(host + `api/v1/auth/login`, {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                cookies.set("token", response.data.token, {
                    path: "/",
                    expires: new Date(Date.now() + 604800000)
                });
                window.location.href = "/admin";
            })
            .catch(function (error) {
                if (error.response) {
                    toaster.danger("Please check your email and password then try again");
                }
            });
    }

    render() {
        return (
            <div id='mainLoginContiner'>
                <Row id='RowLoginContiner'>
                    <Col id='Coool1' sm={12} md={4} >
                        <div id='SideOneContiner'>
                            <img id='logologinrimg' src={require('../../assets/logo.png')} alt='img' />
                        </div>
                    </Col >
                    <Col id='Coool2' sm={12} md={4}>
                        <div id='SideTwoContiner'>
                            <div id='SINgnINTItle'>تسجيل الدخول</div>
                            <form id='FOrmS'>
                                <TextInput id='NAMlogIN' 
                                    name="text-input-name"
                                    placeholder="اسم المستخدم"
                                    onChange={(event) => this.setState({ email: event.target.value })}

                                />
                                <TextInput id='PWSlogIN' 
                                    name="text-input-name"
                                    type={'password'}
                                    placeholder="كلمة المرور"
                                    onChange={(event) => this.setState({ password: event.target.value })}

                                />
                                

                                <Button appearance="primary" intent="warning"
                                    onClick={(event) => this.Logins(event)}>تسجيل الدخول</Button>

                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Login;