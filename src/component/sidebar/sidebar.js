
import React from 'react';
import PropTypes from 'prop-types';
import Admin from './Admin';
import Table1 from './table1';
import Table2 from './Table2';
import Table3 from './table3';
import Table4 from './table4';
import Table5 from './table5';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Assignment from '@material-ui/icons/Assignment';
import Home from '@material-ui/icons/Home';
import Context from '../Context';
import Login from '../login/login';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Place from '@material-ui/icons/Place';
import Category from '@material-ui/icons/Category';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  render() {
    const { classes, theme } = this.props;

    return (
      <Context.Consumer>
        {ctx => {
          if (ctx.value.session.role === 1) {
            return (

              <div className={classes.root} >

                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar} >
                  <Toolbar style={{ backgroundColor: '#ffc107' }}>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerToggle}
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap id='logoHeader' >
                      <img id='logoHeaderimg' src={require('../../assets/logo.png')} alt='img' />
                    </Typography>
                  </Toolbar>
                </AppBar>

                <nav className={classes.drawer}>
                  {/* The implementation can be swapped with js to avoid SEO duplication of NavLinks. */}
                  <Hidden smUp implementation="css">
                    <Drawer
                      container={this.props.container}
                      variant="temporary"
                      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                      open={this.state.mobileOpen}
                      onClose={this.handleDrawerToggle}
                      classes={{
                        paper: classes.drawerPaper,
                      }}

                    >
                      <div id='sideBarBGC'>
                        <div id='sideBarBGC1'></div>
                        <div className={classes.toolbar} />
                        <Link to='/admin'>
                          <List>

                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<SettingsApplications />}</ListItemIcon>
                              <ListItemText><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الاعدادات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table5'>
                          <List>

                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Place />}</ListItemIcon>
                              <ListItemText ><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الفروع</span></ListItemText>
                            </ListItem>

                          </List>
                        </Link>
                        <Link to='/Table3'>
                          <List>

                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Category />}</ListItemIcon>
                              <ListItemText ><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الاقسام</span></ListItemText>
                            </ListItem>

                          </List>
                        </Link>
                        {/* <Link to='/Table4'>
                  <List>

                    <ListItem button>
                      <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Ballot />}</ListItemIcon>
                      <ListItemText ><span style={{ color: '#fb8c00',fontWeight:'bold' }}>الاصناف</span></ListItemText>
                    </ListItem>
                  </List>
                </Link> */}
                        <Link to='/Table1'>
                          <List>
                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Assignment />}</ListItemIcon>
                              <ListItemText ><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>احتياجات المعرض</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table2'>
                          <List>
                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<AssignmentTurnedIn />}</ListItemIcon>
                              <ListItemText><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الطلبات المنجزة</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/'>
                          <List>
                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Home />}</ListItemIcon>
                              <ListItemText><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الرئيسية</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                      </div>
                    </Drawer>
                  </Hidden>
                  <Hidden xsDown implementation="css">
                    <Drawer
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      variant="permanent"
                      open
                    >
                      <div id='sideBarBGC'>
                        <div id='sideBarBGC1'></div>
                        <div className={classes.toolbar} />

                        <Link to='/admin'>
                          <List>
                            <ListItem button >
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<SettingsApplications />}</ListItemIcon>
                              <ListItemText><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الاعدادات</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table5'>
                          <List>

                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Place />}</ListItemIcon>
                              <ListItemText ><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الفروع</span></ListItemText>
                            </ListItem>

                          </List>
                        </Link>
                        <Link to='/Table3'>
                          <List>

                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Category />}</ListItemIcon>
                              <ListItemText ><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الاقسام</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        {/* <Link to='/Table4'>
                  <List>

                    <ListItem button>
                      <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Ballot />}</ListItemIcon>
                      <ListItemText ><span style={{ color: '#fb8c00',fontWeight:'bold'  }}>الاصناف</span></ListItemText>
                    </ListItem>
                  </List>
                </Link> */}
                        <Link to='/Table1'>
                          <List>
                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Assignment />}</ListItemIcon>
                              <ListItemText ><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>احتياجات المعرض</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/Table2'>
                          <List>
                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<AssignmentTurnedIn />}</ListItemIcon>
                              <ListItemText><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الطلبات المنجزة</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                        <Link to='/'>
                          <List>
                            <ListItem button>
                              <ListItemIcon style={{ color: '#fb8c00', paddingLeft: 30 }}>{<Home />}</ListItemIcon>
                              <ListItemText><span style={{ color: '#fb8c00', fontWeight: 'bold' }}>الرئيسية</span></ListItemText>
                            </ListItem>
                          </List>
                        </Link>
                      </div>
                    </Drawer>
                  </Hidden>

                </nav>

                <main className={classes.content}>

                  <div className={classes.toolbar} />
                  {renderPage(this.props)}
                </main>
              </div>

            )
          }
          else if(ctx.value.spinner){
            return(
              <div id="loading"></div>
            )
          }
          else 
          {
            return (
              <Login/>
            )
          }
        }}
      </Context.Consumer>
    )
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};
const renderPage = (props) => {
  if (props.match.path === '/admin') {
    return (<Admin />)

  }
  else if (props.match.path === '/table5') {
    return (<Table5 />)
  }
  else if (props.match.path === '/table3') {
    return (<Table3 />)
  }
  else if (props.match.path === '/table4') {
    return (<Table4 />)
  }
  else if (props.match.path === '/table1') {
    return (<Table1 />)
  }
  else if (props.match.path === '/table2') {
    return (<Table2 />)
  }
}
export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);



