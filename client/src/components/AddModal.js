import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles(theme => ({

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1000px',
        margin: '0 auto',

    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            
        }
    }
    ,
    paper: {
        backgroundColor: 'rgba(0, 0, 0, 0.35);',
        outline: 'none',
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
        width: '100%'

    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export default function AddModal() {

    const [navigate, setNavigate] = useState(false)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [destination, setDestination] = useState('')
    const [description, setDescription] = useState('')
    const [img_url, setImg_url] = useState('')
    const [from_date, setFrom_date] = useState()
    const [until_date, setUntil_date] = useState()
    const [price, setPrice] = useState()

    const token = sessionStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)

    const add = async (e) => {
        e.preventDefault()
        const data = await fetch('http://localhost:3001/api/vacations', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ destination, description, img_url, from_date, until_date, price })
        })
        if (data.ok) {
            alert('Add has been completed')
            const res = await data.json()
            console.log(res);
            setNavigate(true)
        }
        else {
            console.log('err')
        }

    }

    if (navigate) {
        return (<Redirect to="/" push={true} />)
    }
    return (
        <div>
            <Tooltip title="Add" aria-label="add" placement="right-end">
                <Fab color="primary" style={{ position: 'fixed', bottom: '5px', right: '5px' }}>
                    <AddIcon onClick={handleOpen} />
                </Fab>
            </Tooltip>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="{classes.paper}">
                        <div className="modal-page">
                            <form className="register-payload" onSubmit={add}>
                                <label htmlFor="destination">Destination:</label>
                                <input type="text" placeholder="Enter Destination" onChange={e => setDestination(e.target.value)} />
                                <label htmlFor="description">Description:</label>
                                <input type="text" placeholder="Enter Description" onChange={e => setDescription(e.target.value)} />
                                <label htmlFor="img_url">image Url:</label>
                                <input type="text" placeholder="Put Image's URL" onChange={e => setImg_url(e.target.value)} />
                                <label htmlFor="from_date">From: </label>
                                <input type="date" onChange={e => setFrom_date(e.target.value.split('T')[0])} />
                                <label htmlFor="until_date">To: </label>
                                <input type="date" onChange={e => setUntil_date(e.target.value.split('T')[0])} />
                                <label htmlFor="price">Price:</label>
                                <input type="number" placeholder="Enter Price" onChange={e => setPrice(e.target.value)} />
                                <div className={classes.root}>
                                </div>
                                <Button type="submit" variant="outlined" color="primary" style={{ backgroundColor: 'primary' }}>
                                    Add Vacation
                            </Button>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}