import React from 'react';
import { Popover, Menu, Position, Button, Avatar } from 'evergreen-ui';
// import { Link } from 'react-router-dom';
import Cookies from "universal-cookie";
import Context from './Context';
// import axios from 'axios';
// import host from '../Host';
const cookies = new Cookies();


class Avatir extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }


    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div id='avatar'>
                            <Popover
                                position={Position.BOTTOM_LEFT}
                                content={
                                    <Menu>
                                        <Menu.Group>
                                            <Menu.Item>
                                                <p style={{ textAlign: 'center' }}>{ctx.value.session.email}</p>

                                            </Menu.Item>
                                        </Menu.Group>
                                        <Menu.Group >
                                            <Menu.Item >
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    < Button
                                                        onClick={() => {
                                                            cookies.remove("token");
                                                            window.location.href = "/"
                                                        }}
                                                        appearance="primary" intent="warning">تسجيل الخروج</Button>
                                                </div>
                                            </Menu.Item>
                                        </Menu.Group>
                                    </Menu>
                                } >
                                <Avatar id='editAvatar'
                                    src={require('../assets/man.png')}
                                    name={ctx.value.session.name}
                                    size={50}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Popover>
                        </div>)
                }
                }
            </Context.Consumer>
        )
    }
}
export default Avatir;

