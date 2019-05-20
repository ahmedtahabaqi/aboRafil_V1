import React from 'react';
import Component from "@reactions/component";
import { Table, Pane, Dialog, TextInput, Paragraph, SideSheet } from 'evergreen-ui';
import Input from '@material-ui/icons/Input';
import Context from '../Context';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../host';
import 'react-toastify/dist/ReactToastify.css';
const cookies = new Cookies();

class Table5 extends React.Component {
  constructor() {
    super();
    this.state = {
      userOrder: []
    }
  }
  netWork(id) {
    var headers = { "Content-Type": "application/json", token: cookies.get("token") };
    axios.get(host + `api/v1/auth/orders/` + id, { headers: headers })
      .then(response => {
        this.setState({ userOrder: response.data })
        console.log(response.data);
      })
      .catch((error) => { console.log('error ' + error) })
    }
    getOrders(id){
      var headers = { "Content-Type": "application/json", token: cookies.get("token") };
      axios.get(host + `api/v1/Store/order/` + id, { headers: headers })
        .then(response => {
          this.setState({ userOrder: response.data })
          console.log(response.data);
        })
        .catch((error) => { console.log('error ' + error) })
  }
  render() {
    return (
      <Context.Consumer>
        {ctx => {
          return (
            <div>
              <div id='titleTable'>
                <span> الفروع </span>
              </div>
              <Table style={{ textAlign: "right" }}>
                <Table.Head>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    دخول
           </Table.TextHeaderCell>
                  <Table.TextHeaderCell >
                    رقم الهاتف
           </Table.TextHeaderCell>
                  <Table.TextHeaderCell >
                    البريد الالكتروني
            </Table.TextHeaderCell>
                  <Table.TextHeaderCell >
                    اسم الفرع
            </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    الرقم
            </Table.TextHeaderCell >

                </Table.Head>
                <Table.Body minHeight={340}>
                  {ctx.value.Root.map((root, i) => (
                    <Table.Row isSelectable key={root._id}>
                      <Component initialState={{ isShown: false }}>
                        {({ state, setState }) => (
                          <React.Fragment>
                            <SideSheet
                              isShown={state.isShown}
                              onCloseComplete={() => setState({ isShown: false })}
                            >
                              <Paragraph marginLeft={20} marginRight={20} >
                                <div id='SliderEverGreen'>
                                  <table id='students'>
                                    <tr ><th style={{ width: 100 }}>الطلب</th><th style={{ width: 400 }}>التاريخ</th><th>دخول</th></tr>
                                    {this.state.userOrder.map((order, j) => (
                                      <tbody>
                                        <tr>
                                          <td style={{ width: 100}}>{'#'+(j + 1)}</td>
                                          <td style={{ width: 400,direction:'ltr'  }}>{order.uptime}</td>
                                          <td ><Input  onClick={() => {
                              setState({ isShown: true })
                              
                            }}
                                          /></td>
                                    
                                        </tr>
                                      </tbody>
                                    ))}
                                  </table>
                                </div></Paragraph>
                            </SideSheet>
                            <Table.TextCell onClick={() => {
                              setState({ isShown: true })
                              this.netWork(root._id)
                            }} flexBasis={80} flexShrink={0} flexGrow={0}><Input /></Table.TextCell>
                          </React.Fragment>
                        )}
                      </Component>



                      <Table.TextCell>{root.phone}</Table.TextCell>
                      <Table.TextCell>{root.email}</Table.TextCell>
                      <Table.TextCell>{root.name}</Table.TextCell>
                      <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>{i + 1}</Table.TextCell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default Table5;