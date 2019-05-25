import React from 'react';
import Context from '../Context';


class CustomizedTable extends React.Component {
   constructor(props) {
      super(props);
      this.state = {

      }
   }
   render() {

      return (
         <Context.Consumer>
            {ctx => {
               return (
                  <div id='tablePrintMargin'>


                     {this.props.item.map((dnone, i) => (
                        <div key={i} id='tablePrintMargin' >
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
                           <tbody >
                              {dnone.items.map((item, ii) => (
                                 <tr key={ii}>
                                    <td style={{ width: 60 }} >{ii + 1}</td>
                                    <td  >{item.name}</td>
                                    <td style={{ width: 100 }} >{item.count + ' ' +item.type}</td>
                                 </tr>

                              ))}
                           </tbody>
                           
                        </table>
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