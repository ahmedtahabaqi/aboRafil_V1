import React from 'react';
import Component from "@reactions/component";
import { Table, Pane, Dialog, TextInput } from 'evergreen-ui';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Context from '../Context';
import { CirclePicker } from 'react-color';

class Table3 extends React.Component {

  render() {
    return (
      <Context.Consumer>
        {ctx => {
          return (
            <div>
              <div id='titleTable'>
                <span> الاقسام </span>
              </div>
              <Table style={{ textAlign: "right" }}>
                <Table.Head>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    حذف
            </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    تعديل
            </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    اللون
            </Table.TextHeaderCell>
                  <Table.TextHeaderCell >
                    القسم
            </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                    الرقم
            </Table.TextHeaderCell >

                </Table.Head>
                <Table.Body minHeight={340}>
                  {ctx.value.cate.map((cate, i) => (
                    <Table.Row key={cate._id} >
                      <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                        <Component initialState={{ isShown: false }}>
                          {({ state, setState }) => (
                            <Pane>
                              <Dialog
                                isShown={state.isShown}
                                title="حذف قسم"
                                intent="danger"
                                onCloseComplete={() => setState({ isShown: false })}
                                confirmLabel="حذف"
                                cancelLabel="الغاء"
                                onConfirm={() => {
                                  ctx.action.deleteCate(cate._id)
                                  setState({ isShown: false })
                                }}
                              >
                                <span id='msgDelete'> هل انت متأكد من عملية الحذف</span>
                              </Dialog>


                              <Delete style={{ color: '#fb8c00',cursor:'pointer' }} onClick={() => setState({ isShown: true })} />
                            </Pane>
                          )}
                        </Component>

                      </Table.TextCell>
                      <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                        <Component initialState={{ isShown: false }}>
                          {({ state, setState }) => (
                            <Pane>
                              <Dialog
                                isShown={state.isShown}
                                title="تعديل قسم"
                                onCloseComplete={() => setState({ isShown: false })}
                                confirmLabel="حفظ"
                                cancelLabel="الغاء"
                                onConfirm={() => {
                                  ctx.action.EditCate(cate._id)
                                  setState({ isShown: false })
                                }}
                              >

                                <div id='AddCateContiner'>
                                  <TextInput 
                                  autocomplete="off"
                                   width={'100%'}
                                   style={{fontSize:18}}
                                    name="text-input-name"
                                    placeholder="اسم القسم..."
                                    onChange={(e) => ctx.action.handleChange(e.target.value)}
                                  />
                                  <div id='Piker'>
                                    <CirclePicker
                                      onChangeComplete={ctx.action.handleChangeComplete}
                                    />
                                  </div>
                                </div>
                              </Dialog>
                              <Edit style={{ color: '#fb8c00',cursor:'pointer' }} onClick={() => setState({ isShown: true })} />
                            </Pane>
                          )}
                        </Component>

                      </Table.TextCell>
                      <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}><div
                        style={{ backgroundColor: cate.color, width: 30, height: 30, marginLeft: 30 }} /></Table.TextCell>
                      <Table.TextCell style={{ marginRight: -20 }}>{cate.name}</Table.TextCell>
                      <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>{i + 1}</Table.TextCell>
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
export default Table3;