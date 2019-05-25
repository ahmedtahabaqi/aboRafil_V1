import React, { Component } from 'react';
import Context from './component/Context';
import TemporaryDrawer from './component/sidebar/sidebar';
import Home from './component/home';
import Login from './component/login/login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { toaster } from 'evergreen-ui';
import { ToastContainer, toast } from 'react-toastify';
import './assets/dashboard.css'
import './assets/home.css'
import axios from 'axios';
import Cookies from "universal-cookie";
import host from './component/host';
import 'react-toastify/dist/ReactToastify.css';
const cookies = new Cookies();
class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      nameCate: '',
      nameItem: '',
      cate: [],
      orders: [],
      ordersDone: [],
      DonePrint: [],
      Root: [],
      auth: "load",
      session: [],
      Color: '',
      spinner:true,
    }
  }

  componentDidMount() {

    axios.get(host + `api/v1/items/all`, { headers: {} })
      .then(response => {
        this.setState({ items: response.data.Items })
        // console.log(response.data.Items[0]);
      })

      .catch((error) => { console.log('error ' + error) })

    axios.get(host + `api/v1/sections`, { headers: {} })
      .then(response => {
        this.setState({ cate: response.data.sections })
      })
      .catch((error) => { console.log('error ' + error) })
    axios.get(host + `api/v1/Store/done`, { headers: {} })
      .then(response => {
        this.setState({ ordersDone: response.data })
      })
      .catch((error) => { console.log('error ' + error) })
    axios.get(host + `api/v1/Store/`, { headers: {} })
      .then(response => {
        this.setState({ orders: response.data })
        // console.log(response.data);

      })
      .catch((error) => { console.log('error ' + error) })
    var headers = { "Content-Type": "application/json", token: cookies.get("token") };
    axios.get(host + `api/v1/auth/users`, { headers: headers })
      .then(response => {
        this.setState({ Root: response.data })
        // console.log(response.data);
      })
      .catch((error) => { console.log('error ' + error) })

    if (cookies.get("token")) {
      axios.get(host + `api/v1/auth/checklogin`,
        { headers: headers })
        .then(response => {
          this.setState({
            auth: response.data[0].auth,
            session: response.data[1].sesson,
          })
          if(response.status===200){
        this.setState({spinner:false})
      }
        })
        .catch((error) => {
          this.setState({
            auth: "notLogin",
          })
          console.log(error)
        })
        
    }else{
      setTimeout(() => {
        this.setState({spinner:false})
      }, 2000);
      
    }

  }

  render() {
      return (
        <BrowserRouter>
          <Context.Provider value={{
            value: this.state,
            action: {
              handleChangeComplete : (color) => {
                this.setState({ Color: color.hex });
            },
              handleChange: (e) => {
                this.setState({ nameCate: e })
              },
              handleChange1: (e) => {
                this.setState({ nameItem: e })
              },
              EditItem: (id) => {
                var formData = new FormData();
                var headers = { "Content-Type": "application/json", token: cookies.get("token") };
                formData.append("name", this.state.nameItem);

                axios({ url: host + "api/v1/items/edit/" + id, method: "POST", data: formData, headers: headers })
                  .then(response => {
                    if (response.status === 200) {
                      window.location.reload();
                      this.componentDidMount();
                      toast('تم تعديل الصنف', {
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
              },
              EditCate: (id) => {
                var formData = new FormData();
                var headers = { "Content-Type": "application/json", token: cookies.get("token") };
                formData.append("name", this.state.nameCate);
                formData.append("color", this.state.Color);
                axios({ url: host + "api/v1/sections/edit/" + id, method: "POST", data: formData, headers: headers })
                  .then(response => {
                    if (response.status === 200) {
                      this.componentDidMount();
                      toast('تم تعديل القسم', {
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
              },
              deleteItems: (id) => {
                var headers = { "Content-Type": "application/json", token: cookies.get("token") };

                axios({ url: host + "api/v1/items/delete/" + id, method: "POST", headers: headers })
                  .then(response => {
                    if (response.status === 200) {
                      this.componentDidMount();
                      toast('تم حذف الصنف', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                      });
                    }
                  })
                  .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });
              },
              deleteCate: (id) => {
                var headers = { "Content-Type": "application/json", token: cookies.get("token") };

                axios({ url: host + "api/v1/sections/delete/" + id, method: "POST", headers: headers })
                  .then(response => {
                    if (response.status === 200) {
                      toaster.success("Successful");
                      this.componentDidMount();
                    }
                  })
                  .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });
              },
              chengeOrderToDone: (id) => {
                var headers = { "Content-Type": "application/json", token: cookies.get("token") };

                axios({ url: host + "api/v1/Store/OrderDone/" + id, method: "POST", headers: headers })
                  .then(response => {
                    if (response.status === 200) {
                      this.componentDidMount();
                      toast('تم انجاز الطلب', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                      });
                    }
                  })
                  .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });
              },
              HandlePrintDone: (items) => {
                this.setState({ DonePrint: items })
              },
            }
          }}>
            <div className="App" >
              <Switch>
                <Route path='/admin' component={TemporaryDrawer} />
                <Route path='/table5' component={TemporaryDrawer} />
                <Route path='/table3' component={TemporaryDrawer} />
                <Route path='/table4' component={TemporaryDrawer} />
                <Route path='/table1' component={TemporaryDrawer} />
                <Route path='/table2' component={TemporaryDrawer} />
                <Route path='/Login' component={Login} />
                <Route path='/' component={Home} />
              </Switch>
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

          </Context.Provider>
        </BrowserRouter>
      )

    
  }
}
export default App;
