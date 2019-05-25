import React from 'react';
import Component from "@reactions/component";
import Context from '../Context';
import { Table, Pane, Dialog, TextInput } from 'evergreen-ui';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
import host from '../../component/host';


class Table4 extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],

        }
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);

        const category = urlParams.get('category');
        console.log(category)




        axios.get(host + `api/v1/items/all`, { headers: {} })
            .then(response => {
                console.log(response.data.Items)
                const result = response.data.Items.filter(
                    sort =>
                        sort.sections._id === category
                );
                console.log(result)
                this.setState({ items: result })
                // console.log(response.data.Items[0]);
            })
    }


    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div>
                            <div id='titleTable'>
                                <span> الاصناف </span>
                            </div>
                            <Table style={{ textAlign: "right" }}>
                                <Table.Head>
                                    <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                        حذف
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                        تعديل
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell >
                                        القسم
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                        النوع
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell >
                                        الصنف
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                        الرقم
                                    </Table.TextHeaderCell >

                                </Table.Head>
                                <Table.Body minHeight={340}>
                                    {this.state.items.map((item, i) => (
                                        <Table.Row key={item._id}>
                                            <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                                <Component initialState={{ isShown: false }}>
                                                    {({ state, setState }) => (
                                                        <Pane>
                                                            <Dialog
                                                                isShown={state.isShown}
                                                                title="حذف صنف"
                                                                intent="danger"
                                                                onCloseComplete={() => setState({ isShown: false })}
                                                                confirmLabel="حذف"
                                                                cancelLabel="الغاء"
                                                                onConfirm={() => {
                                                                    ctx.action.deleteItems(item._id)
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
                                                                title="تعديل صنف"
                                                                onCloseComplete={() => setState({ isShown: false })}
                                                                confirmLabel="حفظ"
                                                                cancelLabel="الغاء"
                                                                onConfirm={() => {
                                                                    ctx.action.EditItem(item._id)
                                                                    setState({ isShown: false })
                                                                }}
                                                            >
                                                                    <TextInput width={'100%'}
                                                                        style={{ fontSize: 18 }}
                                                                        id='AddCateInput'
                                                                        autocomplete="off"
                                                                        placeholder="اسم الصنف..."
                                                                        onChange={(e) => ctx.action.handleChange1(e.target.value)}
                                                                    />
                                                            
                                                            </Dialog>
                                                            <Edit style={{ color: '#fb8c00',cursor:'pointer' }} onClick={() => setState({ isShown: true })} />
                                                        </Pane>
                                                    )}
                                                </Component>

                                            </Table.TextCell>

                                            <Table.TextCell >{item.sections.name}</Table.TextCell>
                                            <Table.TextCell >{item.type}</Table.TextCell>
                                            <Table.TextCell>{item.name}</Table.TextCell>
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
export default Table4;