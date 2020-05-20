import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CreateIcon from '@material-ui/icons/Create';
import { IconButton } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparant'
    },
    paper: {
        backgroundColor: 'transparant',
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
    },
}));




function ModifyModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    


    const [destination, setDestination] = useState(props.vacation.destination)
    const [description, setDescription] = useState(props.vacation.description)
    const [img_url, setImg_url] = useState(props.vacation.img_url)
    const [from_date, setFrom_date] = useState(props.vacation.from_date.split('T')[0])
    const [until_date, setUntil_date] = useState(props.vacation.until_date.split('T')[0])
    const [price, setPrice] = useState(props.vacation.price)

    const token = sessionStorage.getItem('token')

    // const from_date = fromDate.split('T')[0]
    // const until_date = untilDate.split('T')[0]
  

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)


    const handleOpen = () => {
        console.log(props.vacation.id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const formated = formatDate(props.vacation.from_date)
  
    const modifyHandleClick = async (e) => {
        console.log(from_date)
        console.log(until_date)
        e.preventDefault()
        const id = props.vacation.id
        const data = await fetch('http://localhost:3001/api/vacations', {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({ id, destination, description, img_url, from_date, until_date, price })
        })
        if (data.ok) {
            alert('Vacation has been successfully modified')
            const res = await data.json()
            console.log(res);
        }
        else {
            console.log('err')
        }
        props.history.push('/')
    }
    return (
        <div>
        <IconButton onClick={handleOpen}>
            <CreateIcon></CreateIcon>
        </IconButton>
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
                <div className={classes.paper}>
                    <div className="modal-page">
                        <form className="register-payload" onSubmit={modifyHandleClick}>
                            <label htmlFor="destination">Destination:</label>
                            <input type="text" defaultValue={props.vacation.destination} onChange={e => { setDestination(e.target.value) }} />
                            <label htmlFor="description">Description:</label>
                            <input type="text" defaultValue={props.vacation.description} onChange={e => { setDescription(e.target.value) }} />
                            <label htmlFor="img_url">image Url:</label>
                            <input type="text" defaultValue={props.vacation.img_url} onChange={e => { setImg_url(e.target.value) }} />
                            <label htmlFor="from_date">From: </label>
                            <input type="date" defaultValue={props.vacation.from_date.split('T')[0]} onChange={e => { setFrom_date(e.target.value.split('T')[0]) }}  />
                            <label htmlFor="until_date">To: </label>
                            <input type="date" defaultValue={props.vacation.until_date.split('T')[0]} onChange={e => { setUntil_date(e.target.value.split('T')[0]) }}  />
                            <label htmlFor="price">Price:</label>
                            <input type="number" defaultValue={props.vacation.price} onChange={e => { setPrice(e.target.value) }} />
                            <Button type="submit" variant="outlined" color="default">
                                Apply Changes
                            </Button>
                        </form>
                    </div>
                </div>
            </Fade>
        </Modal>
    </div>
    )
}

export default withRouter(ModifyModal)
