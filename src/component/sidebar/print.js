import React from 'react';
import Context from '../Context';
import { DH_CHECK_P_NOT_PRIME } from 'constants';

class CustomizedTable extends React.Component {
   constructor(props) {
      super(props);
      this.state = {

      }
   }



   // renderTableData(done) {
   //    return 

   //       return (

   //          <React.Fragment>
   //             {dnone.items.map((item, ii) => (
   //                <tr>
   //                   <td >{ii}</td>
   //                   <td style={{ width: 250 }}>{item.name}</td>
   //                   <td >{item.name}</td>
   //                </tr>
   //             ))}

   //          </React.Fragment>


   //       )
   //    })
   // }
   render() {

      return (
         <Context.Consumer>
            {ctx => {
               return (
                  <div>


                     {this.props.item.map((dnone, i) => (
                        <div>
                           <div id='RootNAmeprint'>
                           <div> {this.props.date}</div>
                              <div> {this.props.order}</div>
                           </div>
                           <div id='SectionTable'>{dnone.sections_name}</div>
                        <table id='students' key={dnone._id}>
                           <tr>
                              <th>الرقم</th>
                              <th>الصنف</th>
                              <th>العدد/الوزن</th>
                           </tr>
                           <tbody>
                              {dnone.items.map((item, ii) => (
                                 <tr>
                                    <td >{ii + 1}</td>
                                    <td style={{ width: 200 }}>{item.name}</td>
                                    <td style={{ width: 100 }} >{item.count + ' ' +item.type}</td>
                                 </tr>

                              ))}
                           </tbody>
                           
                        </table>
                        <div id='notsAllOrder'>الملاحضات:{dnone.note}</div>
                        </div>
                     ))}


                  </div>

               );
            }}
         </Context.Consumer>
      )
   }
}

export default CustomizedTable;