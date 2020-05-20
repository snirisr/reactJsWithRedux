import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { Redirect, NavLink } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, makeStyles, fade, InputBase, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getAllVacationsfailure, getAllVacationsSuccess, getAllVacationsRequest, getAllFollowedVacationsSuccess } from "../redux/Actions"




const useStyles = makeStyles(theme => ({
    all:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
    },
    root: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: 'rgb(0,0,0,0.0)',
    },
    link: {
        paddingTop: '0.4em',
        paddingBottom: '0.4em',
        paddingRight: '1.5em',
        paddingLeft: '1.5em',
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
    },
    search: {
        display: 'flex',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: '1em',
        width: '20.4em',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '60em',
            marginRight:  '0 auto',
            width: 'auto',

        },
    },
    searchIcon: {
        display: 'flex',
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        display: 'flex',
        color: 'inherit',
    },
    inputInput: {
        display: 'flex',
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '10%',
        [theme.breakpoints.up('sm')]: {
            width: '120%',
            '&:focus': {
                width: 180,
            },
        },
    },
    btn: {
        backgroundColor: '#FD9526'

    }
}));
const NavBar = (props) => {

    const classes = useStyles();
    const [navigate, setNavigate] = useState(false)

    const logout = (e) => {

        sessionStorage.removeItem('token')
        sessionStorage.removeItem('isAdmin')
        sessionStorage.removeItem('uId')
        setNavigate(true)

    }


    if (navigate) {
        return (<Redirect to="/login" push={true} />)
    }

    const search = async event => {
        console.log(event.target.value)
        const searchVal = event.target.value
        const token = sessionStorage.getItem('token')
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token)
        props.dispatch(getAllVacationsRequest())
        console.log(searchVal)
        await fetch('http://localhost:3001/api/searchedvacations/' + searchVal, {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => {
                console.log(res);
                console.log('suc');
                props.dispatch(getAllVacationsSuccess(res, false))
                props.dispatch(getAllFollowedVacationsSuccess([], false))

            })
            .catch(err => {
                props.dispatch(getAllVacationsfailure(err.message))
                console.log('err');
            })
    }
    return (
        <div className={classes.all}>
            <AppBar position="fixed"
                textColor="primary" style={{ backgroundColor: ' rgba(0, 0, 0, 0.35)' }}>
                <Toolbar  >
                    <div className={classes.tabs} >
                        <NavLink to="/vacations" className={classes.link} activeClassName="active">Vacations</NavLink>
                        {+sessionStorage.getItem('isAdmin') ? <NavLink to="/reports" className={classes.link} activeClassName="active">Reports</NavLink> : null}
                    </div>
                    <div className={classes.search} >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={search}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <Button variant="contained" onClick={logout} className={classes.btn}>
                            Logout
                     </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vacations: state.getAllVacations.vacations,
        followedVacations: state.getAllVacations.followedVacation
    }
}


export default connect(mapStateToProps)(NavBar)
