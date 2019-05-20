import React from 'react';
import Component from "@reactions/component";
import { Table, Pane, Dialog } from 'evergreen-ui';
import Context from '../Context';
import Prints from '@material-ui/icons/Print';
import Done from '@material-ui/icons/Done';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';

import CustomizedTable from '../sidebar/print';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../host';
import 'react-toastify/dist/ReactToastify.css';
const cookies = new Cookies();

class Table2 extends React.Component {
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
                <span> الطلبات المنجزة </span>
              </div>
              <Table style={{ textAlign: "right" }}>
                <Table.Head>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    منجزة
            </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    طباعة
            </Table.TextHeaderCell>

                  <Table.TextHeaderCell >
                    التاريخ
          </Table.TextHeaderCell>
                  <Table.TextHeaderCell >
                    الاسم
            </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    الرقم
            </Table.TextHeaderCell >

                </Table.Head>
                <Table.Body minHeight={340}>
                  {ctx.value.ordersDone.map((orderDone, i) => (
                    <Table.Row key={orderDone._id} isSelectable>
                      <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}><Done /></Table.TextCell>
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
                                  ctx.action.chengeOrderToDone(orderDone._id)

                                  window.print();


                                  // window.print();
                                  setState({ isShown: false })
                                }}
                              >
                                <PrintProvider>

                                  <NoPrint>
                                    <Print single name="foo">
                                        <CustomizedTable item={this.state.data} order={orderDone.user.name} date={orderDone.uptime} />
                                    </Print>
                                  </NoPrint>
                                </PrintProvider>
                              </Dialog>
                              <Prints
                                onClick={() => {
                                  // ctx.action.HandlePrintDone(order.items)
                                  // ctx.action.GetOrderId(order._id)
 
                                  axios.get(host + `api/v1/Store/order/`+orderDone._id, { headers: { "Content-Type": "application/json", token: cookies.get("token")} })
                                  .then(response => {
                                    this.setState({ data:response.data.order[0].sections })
                                    console.log(response.data.order[0].sections);
                                    
                                  })
                                  .catch((error) => { console.log('error ' + error) })
                                  console.log(orderDone._id)
                                 
                                  setState({ isShown: true })
                                }} style={{ color: '#ffc107', cursor: 'pointer' }} />

                            </Pane>
                          )}
                        </Component>
                      </Table.TextCell>
                      <Table.TextCell>{orderDone.uptime}</Table.TextCell>
                      <Table.TextCell>{orderDone.user.name}</Table.TextCell>
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
export default Table2;