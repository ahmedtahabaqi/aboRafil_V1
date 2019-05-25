import React from 'react';
import Component from "@reactions/component";
import Context from '../Context';
import { ToastContainer, toast } from 'react-toastify';
import Category from '@material-ui/icons/Category';
import Assignment from '@material-ui/icons/Assignment';
import Ballot from '@material-ui/icons/Ballot';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import { CirclePicker } from 'react-color';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Pane, Dialog, TextInput } from 'evergreen-ui';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../host';

const cookies = new Cookies();
var type;

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            cateName: '',
            cateSelect: '',
            ItemName: '',
            RootName: '',
            Email: '',
            PSW: '',
            Phone: '',
            Color: ''
        }
    }

    AddCate() {
        let formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

        formData.append("name", this.state.cateName);
        formData.append("color", this.state.Color);

        axios({ url: host + "api/v1/sections/add", method: "POST", data: formData, headers: headers })
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();

                    toast('تم اضافة قسم', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
            })
            .catch(function (error) {
                if (error.request.response) {
                    toast(error.request.response, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });

                }
            });
    }
    AddItem() {
        let formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

        formData.append("name", this.state.ItemName);
        formData.append("sections", this.state.cateSelect);
        if (type !== "") {
            formData.append("type", type);
        }



        axios({ url: host + "api/v1/items/add", method: "POST", data: formData, headers: headers })
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                    toast('تم اضافة صنف', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });


                }
            })
            .catch(function (error) {
                if (error.request.response) {
                    toast(error.request.response, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });

                }
            });
    }
    AddRoot() {
        let formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

        formData.append("name", this.state.RootName);
        formData.append("email", this.state.Email);
        formData.append("password", this.state.PSW);
        formData.append("phone", this.state.Phone);
        formData.append("color", "#ffffff");

        axios({ url: host + "api/v1/auth/register", method: "POST", data: formData, headers: headers })
            .then(response => {
                if (response.status === 200) {
                    toast('تم اضافة فرع', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
            })
            .catch(function (error) {
                if (error.request.response) {
                    toast(error.request.response, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
            });
    }
    handleChangeComplete = (color) => {
        this.setState({ Color: color.hex });
    };
    render() {


        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div>
                            <Row style={{ margin: 0, padding: 0 }} >
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <div className='maincardDashContiner'>
                                        <div className='cardDashContiner'>
                                            <div className='cardDashContiner2'>
                                                <AssignmentTurnedIn color='action' fontSize="large" />
                                            </div>
                                            <div className='cardDashContiner1'>
                                                <div className='cardDashContinertext'>
                                                    <p id='titleCardAdmin'>الطلبات المنجزه</p>
                                                    <p id='ContentCardAdmin'>{ctx.value.ordersDone.length}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <div className='maincardDashContiner'>
                                        <div className='cardDashContiner'>
                                            <div className='cardDashContiner2'>
                                                <Assignment color='action' fontSize="large" />
                                            </div>
                                            <div className='cardDashContiner1'>
                                                <div className='cardDashContinertext'>
                                                    <p id='titleCardAdmin'>الطلبات</p>
                                                    <p id='ContentCardAdmin'>{ctx.value.orders.length}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <div className='maincardDashContiner'>
                                        <div className='cardDashContiner'>
                                            <div className='cardDashContiner2'>
                                                <Ballot color='action' fontSize="large" />
                                            </div>
                                            <div className='cardDashContiner1'>
                                                <div className='cardDashContinertext'>
                                                    <p id='titleCardAdmin'>الاصناف</p>
                                                    <p id='ContentCardAdmin'>{ctx.value.items.length}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <div className='maincardDashContiner'>
                                        <div className='cardDashContiner'>
                                            <div className='cardDashContiner2'>
                                                <Category color='action' fontSize="large" />
                                            </div>
                                            <div className='cardDashContiner1'>
                                                <div className='cardDashContinertext'>
                                                    <p id='titleCardAdmin'>الاقسام</p>
                                                    <p id='ContentCardAdmin'>{ctx.value.cate.length}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 100 }}>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <Component initialState={{ isShown: false }}>
                                        {({ state, setState }) => (
                                            <Pane>
                                                <Dialog
                                                    isShown={state.isShown}
                                                    title="ترتيب الاصناف"
                                                    onCloseComplete={() => setState({ isShown: false })}
                                                    confirmLabel="التالي"
                                                    cancelLabel="الغاء"
                                                    onConfirm={() => {

                                                        window.location.href = `/Table4?category=${this.state.cateSelect}`
                                                        setState({ isShown: false })
                                                    }}
                                                >
                                                    <Form.Group style={{ direction: 'rtl' }} id='selectCategoryContiner' >

                                                        <Form.Control as="select" id='selectCategoryCInput'
                                                            onChange={(even) => {
                                                                if (even.target.value !== 'SelectCategory') {
                                                                    this.setState({ cateSelect: even.target.value })
                                                                }
                                                            }}>
                                                            <option value="SelectCategory">اختيار قسم </option>
                                                            {ctx.value.cate.map(cate =>
                                                                <option key={cate._id} value={cate._id} >
                                                                    {cate.name}
                                                                </option>

                                                            )}
                                                        </Form.Control>

                                                    </Form.Group>
                                                </Dialog>

                                                <Button id='colorbtn' variant="warning"
                                                    height={50}
                                                    style={{ fontSize: 20, fontWeight: 600,width:150 }}
                                                    onClick={() => setState({ isShown: true })}>ترتيب الاصناف</Button>
                                            </Pane>
                                        )}
                                    </Component>
                                </Col>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <Component initialState={{ isShown: false }}>
                                        {({ state, setState }) => (
                                            <Pane>
                                                <Dialog
                                                    isShown={state.isShown}
                                                    title="اضافة فرع"
                                                    onCloseComplete={() => setState({ isShown: false })}
                                                    confirmLabel="اضافة"
                                                    cancelLabel="الغاء"
                                                    onConfirm={() => {
                                                        this.AddRoot()
                                                        setState({ isShown: false })
                                                    }}
                                                >
                                                    <TextInput id='AddRootNameInput'
                                                    autocomplete="off"
                                                        name="text-input-name"
                                                        placeholder="...اسم الفرع"
                                                        onChange={(e) => this.setState({ RootName: e.target.value })}
                                                    />
                                                    <TextInput id='AddRootNameInput'
                                                    autocomplete="off"
                                                        name="text-input-name"
                                                        placeholder="...البريد الالكتروني"
                                                        onChange={(e) => this.setState({ Email: e.target.value })}
                                                    />
                                                    <TextInput id='AddRootNameInput'
                                                    autocomplete="off"
                                                        name="text-input-name"
                                                        placeholder="...كلمة المرور"
                                                        onChange={(e) => this.setState({ PSW: e.target.value })}
                                                    />
                                                    <TextInput id='AddRootNameInput'
                                                    autocomplete="off"
                                                        name="text-input-name"
                                                        placeholder="...رقم الهاتف"
                                                        onChange={(e) => this.setState({ Phone: e.target.value })}
                                                    />
                                                    {/* <div id='Piker'>
                                            <CirclePicker 
                                            onChangeComplete={this.handleChangeComplete}
                                            />
                                            </div> */}

                                                </Dialog>

                                                <Button id='colorbtn' variant="warning"
                                                    height={50}
                                                    style={{ fontSize: 20, fontWeight: 600 ,width:150}}
                                                    onClick={() => setState({ isShown: true })}>اضافة فرع</Button>
                                            </Pane>
                                        )}
                                    </Component>
                                </Col>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <Component initialState={{ isShown: false }}>
                                        {({ state, setState }) => (
                                            <Pane>
                                                <Dialog
                                                    isShown={state.isShown}
                                                    title="اضافة صنف"
                                                    onCloseComplete={() => setState({ isShown: false })}
                                                    confirmLabel="اضافة"
                                                    cancelLabel="الغاء"
                                                    onConfirm={() => {
                                                        this.AddItem()
                                                        setState({ isShown: false })
                                                    }}
                                                >

                                                    <Form.Group style={{ direction: 'rtl' }} id='selectCategoryContiner' >

                                                        <Form.Control as="select" id='selectCategoryCInput'
                                                            onChange={(even) => {
                                                                if (even.target.value !== 'SelectCategory') {
                                                                    this.setState({ cateSelect: even.target.value })
                                                                }
                                                            }}>
                                                            <option value="SelectCategory">اختيار قسم </option>
                                                            {ctx.value.cate.map(cate =>
                                                                <option key={cate._id} value={cate._id} >
                                                                    {cate.name}
                                                                </option>

                                                            )}
                                                        </Form.Control>

                                                    </Form.Group>
                                                    <div id='AddCateContiner'>

                                                        <TextInput width={'98%'}
                                                        style={{fontSize:18}}
                                                         id='AddCateInput'
                                                         autocomplete="off"
                                                            // name="text-input-name"
                                                            placeholder="...اسم الصنف"
                                                            onChange={(e) => this.setState({ ItemName: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Form.Group as={Row} id="RadioContiner">

                                                            <label id='CheckContiner'>قطع
                                                                <Form.Check
                                                                    type="radio" label=""
                                                                    onChange={(e) => { type = 'قطع'; }}
                                                                    custom name="formHorizontalRadios" id="step1"
                                                                />
                                                            </label>
                                                            <label id='CheckContiner1'>كغ
                                                                <Form.Check
                                                                    type="radio" label=""
                                                                    onChange={(e) => { type = 'كغ'; }}
                                                                    custom name="formHorizontalRadios" id="step2"
                                                                />
                                                            </label>
                                                        </Form.Group>
                                                    </div>

                                                </Dialog>

                                                <Button id='colorbtn' variant="warning"
                                                    height={50}
                                                    style={{ fontSize: 20, fontWeight: 600,width:150 }}
                                                    onClick={() => setState({ isShown: true })}>اضافة صنف</Button>
                                            </Pane>
                                        )}
                                    </Component>
                                </Col>
                                <Col id='rowDash' xs={12} md={6} xl={3}>
                                    <Component initialState={{ isShown: false }}>
                                        {({ state, setState }) => (
                                            <Pane>
                                                <Dialog
                                                    isShown={state.isShown}
                                                    title="اضافة قسم"
                                                    onCloseComplete={() => setState({ isShown: false })}
                                                    confirmLabel="اضافة"
                                                    cancelLabel="الغاء"
                                                    onConfirm={() => {
                                                        this.AddCate()
                                                        setState({ isShown: false })
                                                    }}
                                                >
                                                    <div id='AddCateContiner'>
                                                        <TextInput width={'100%'}
                                                        style={{fontSize:18}}
                                                        autocomplete="off"
                                                            placeholder="اسم القسم..."
                                                            onChange={(e) => this.setState({ cateName: e.target.value })}
                                                         />
                                                        <div id='Piker'>
                                                            <CirclePicker
                                                                onChangeComplete={this.handleChangeComplete}
                                                            />
                                                        </div>
                                                    </div>

                                                </Dialog>

                                                <Button id='colorbtn' variant="warning"
                                                    height={50}
                                                    style={{ fontSize: 20, fontWeight: 600 ,width:150}}
                                                    onClick={() => setState({ isShown: true })}>اضافة قسم</Button>
                                            </Pane>
                                        )}
                                    </Component>
                                </Col>
                            </Row>
                            <ToastContainer
                                position="bottom-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnVisibilityChange
                                draggable
                                pauseOnHover
                            />
                        </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}
export default Admin;