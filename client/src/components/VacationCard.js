import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import FavoriteBorder from '@material-ui/icons/FavoriteBorderOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import moment from 'moment'

// const useStyles = makeStyles(theme => ({
//     margin: {
//       margin: theme.spacing(1),
//     },
//     extendedIcon: {
//       marginRight: theme.spacing(1),
//     },
//   }));



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
    unchecked:{
        color: 'white'
    }

})

const VacationCard = (props) => {
    const classes = useStyles();
    const followedVacations = props.followedVacations
    const vacations = props.vacations

    const token = sessionStorage.getItem('token')
    const u_id = sessionStorage.getItem('uId')

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)




    const likeVacation = async (v_id) => {
        const data = await fetch('http://localhost:3001/api/followers', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ u_id, v_id })
        })
        if (data.ok) {
            const res = await data.json()
            console.log(res);
            props.history.push('/')
        }
        else {
            console.log('err')
        }
    }

    const unlikeVacation = async (v_id) => {
        await fetch(`http://localhost:3001/api/delete-followers`, {
            method: "DELETE",
            headers: myHeaders,
            body: JSON.stringify({ u_id, v_id })
        })
            .then(data => data.json())
            .then(res => {
                props.history.push('/')
            })
            .catch(err => {
                console.log(err);
            })
    }


    const handleChange = (v_id) => event => {

        if (event.target.checked) {
            likeVacation(v_id)
        }
        else {
            unlikeVacation(v_id)
        }
    }





    const isChecked = vacationID => {
        let check = false;
        if (followedVacations) {
            followedVacations.forEach(f => {
                if (f.id === vacationID) {
                    check = true;
                    return true;
                }
            })
        }
        return check;
    }





    useEffect(() => {

    },
        [])

    return (
        <div className="vacations-container">
            {followedVacations.map(v => (
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

                       
                            <FormControlLabel
                                control={<Checkbox defaultChecked={isChecked(v.id)} id={v.id} onClick={handleChange(v.id)}
                                    icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                            />
                    </CardContent>


                </Card>
            ))}
            {vacations.map(v => (
                <Card className={classes.root} key={Math.random()} style={{ display: isChecked(v.id) === true ? "none" : "" }}>
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

                        <FormControlLabel
                            control={<Checkbox className={classes.like} defaultChecked={isChecked(v.id)} id={v.id} onClick={handleChange(v.id)}
                                icon={<FavoriteBorder className={classes.unchecked}/>} checkedIcon={<Favorite />} />}
                        />
                    </CardContent>

                </Card>
            ))}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        vacations: state.getAllVacations.vacations,
        followedVacations: state.getAllVacations.followedVacations
    }
}

const routedCard = withRouter(VacationCard)

export default connect(mapStateToProps)(routedCard)


