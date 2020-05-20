import React from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Grid } from '@material-ui/core/';
import ModifyModal from './ModifyModal';
import { Link } from 'react-router-dom';
import AddModal from './AddModal';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import moment from 'moment'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        width: '40vh',
        height: '65vh',
        marginTop: '4em',
        marginBottom: '4em',
        marginLeft: '4em',
        marginRight: '4em',
        borderRadius: 30,
        background: 'rgba(19, 60, 85, 0.7);',
        color: 'white'
    },
    media: {
        height: '50vh',
    },
    img: {
        width: '100%',
        height: '10vh'

    },
    card: {
        height: '40vh'
    },
    
})


function AdminDashboard(props) {
    const classes = useStyles();
    const vacations = props.vacations
    console.log(props.vacations)
    const token = sessionStorage.getItem('token')

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)
    
    

    const del = async (event) => {
    const eventTargetId = event.target.parentElement.parentElement.parentElement.id
    await fetch(`http://localhost:3001/api/vacations/${eventTargetId}`,
        {
            method: "delete",
            headers: myHeaders
        })
        .then(data => data.json())
        .then(res => {
            props.history.push('/login')
            
        })
        .catch(err => {
            console.log(err);
        })
}
    return (
        <div>
        <div className="vacations-container">
            {vacations.map(v => (
                <Card className={classes.root} key={Math.random()}>
                     <CardMedia
                        className={classes.media}
                        image={v.img_url}
                    />
                    <CardContent className={classes.card}> 
                        <Typography gutterBottom variant="h5" component="h2">
                            {v.destination}
                        </Typography>

                        <Typography variant="body2" color="white" component="p">
                            {v.description}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            {moment(v.from_date).format('DD/MM/YYYY')} - {moment(v.until_date).format('DD/MM/YYYY')}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            {v.price}$
                        </Typography>
                        <div className="like-icon">
                        <IconButton onClick={del} id={v.id}>
                        <DeleteIcon />
                        </IconButton>
                        <ModifyModal vacation= {v} component={Link}/>
                        </div>
                    </CardContent>


                </Card>
            ))}
        </div>
        <Grid item container xs={6} alignItems="flex-end" direction="column">
                <Grid item>
                    <AddModal />
                </Grid>
        </Grid>
       {/* <Chart /> */}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
        vacations: state.getAllVacations.vacations
    }
}

export default connect(mapStateToProps)(AdminDashboard)
