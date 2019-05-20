import React from 'react';
import Component from "@reactions/component";
import { Table, Pane, Dialog } from 'evergreen-ui';
import Prints from '@material-ui/icons/Print';
import CustomizedTable from '../sidebar/print';
import { PrintProvider, NoPrint, Print } from 'react-easy-print';
import Context from '../Context';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../host';
import 'react-toastify/dist/ReactToastify.css';
const cookies = new Cookies();
class Table1 extends React.Component {
constructor(){
  super();
  this.state={
    data:[]
  }
}


  render() {
    return (
      <Context.Consumer>
        {ctx => {
          return (
            <div>
              <div id='titleTable'>
                <span>  احتياجات المعرض </span>
              </div>
              <Table style={{ textAlign: "right" }}>
                <Table.Head>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    طباعة
                </Table.TextHeaderCell>

                  <Table.TextHeaderCell >
                    التاريخ
                </Table.TextHeaderCell>
                  <Table.TextHeaderCell >
                    الفرع
                </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    الرقم
                </Table.TextHeaderCell >

                </Table.Head>
                <Table.Body height={340}>
                  {ctx.value.orders.map((order, i) => (
                    <Table.Row key={order._id}>
                      <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>

                        <Component initialState={{ isShown: false }}>
                          {({ state, setState }) => (
                            <Pane>
                              <Dialog
                                isShown={state.isShown}
                                title="طباعة"
                                onCloseComplete={() => setState({ isShown: false })}
                                confirmLabel="طباعة"
                                cancelLabel="الغاء"
                                onConfirm={() => {
                                  ctx.action.chengeOrderToDone(order._id)

                                  window.print();


                                  // window.print();
                                  setState({ isShown: false })
                                }}
                              >
                                <PrintProvider>

                                  <NoPrint>
                                    <Print single name="foo">
                                     
                                        <CustomizedTable item={this.state.data} order={order.user.name} date={order.uptime}/>
                                
                                    </Print>
                                  </NoPrint>
                                </PrintProvider>
                              </Dialog>
                              <Prints
                                onClick={() => {
                                  // ctx.action.HandlePrintDone(order.items)
                                  // ctx.action.GetOrderId(order._id)
 
                                  axios.get(host + `api/v1/Store/order/`+order._id, { headers: { "Content-Type": "application/json", token: cookies.get("token")} })
                                  .then(response => {
                                    this.setState({ data:response.data.order[0].sections })
                                    console.log(response.data.order[0].sections);
                                    
                                  })
                                  .catch((error) => { console.log('error ' + error) })
                                  console.log(order._id)
                                 
                                  setState({ isShown: true })
                                }} style={{ color: '#ffc107', cursor: 'pointer' }} />

                            </Pane>
                          )}
                        </Component>
                      </Table.TextCell>
                      <Table.TextCell>{order.uptime}</Table.TextCell>
                      <Table.TextCell>{order.user.name}</Table.TextCell>

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

export default Table1;