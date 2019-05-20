import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Avatir from './avatar';

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
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#ffa726" }}>
                <Toolbar>

                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        <img id='logoHomeimg' src={require('../assets/logo.png')} alt='img' />
                    </Typography>
                    <Link id='BtNHome' to='/Login'>
                        <Button id='BtNHome' color="inherit">تسجيل الدخول</Button>
                    </Link>
                    <Avatir/>
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

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);