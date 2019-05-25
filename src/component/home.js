import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Avatir from './avatar';
import Login from './login/login';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function Home(props) {
    const { classes } = props;
    return (
        <Context.Consumer>
            {ctx => {
                if (ctx.value.session.role === 0 || ctx.value.session.role === 1 ) {
                    return (
                        <div className={classes.root}>
                            <AppBar position="static" style={{ backgroundColor: "#ffa726" }}>
                                <Toolbar>

                                    <Typography variant="h6" color="inherit" className={classes.grow}>
                                        <img id='logoHomeimg' src={require('../assets/logo.png')} alt='img' />
                                    </Typography>
                                    <div style={ctx.value.auth === "login" ? { display: "none" } : {}}>
                                        <Link id='BtNHome' to='/Login'>
                                            <Button id='BtNHome' color="inherit">تسجيل الدخول</Button>
                                        </Link>
                                    </div>
                                    <div style={ctx.value.auth === "login" ? {} : { display: "none" }}>
                                        <Avatir />
                                    </div>
                                </Toolbar>
                            </AppBar>
                            <div id='ContinerComponentHome'>
                                <Link to='/admin'>
                                    <div id='Component1Home'><img id='Component1Homeimg' src={require('../assets/fact.png')} alt='img' /></div>
                                </Link>
                                <div id='Component2Home'><img id='Component2Homeimg' src={require('../assets/custmer.png')} alt='img' /></div>
                            </div>
                        </div>
                    );
                }
                else if (ctx.value.spinner) {
                   
                    return (
                        <div id="loading"></div>
                    )
                }
                else{
                    return (
                        <Login/>
                          )
                }
           
            }}
        </Context.Consumer>
    )

}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);