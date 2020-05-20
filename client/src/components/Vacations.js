import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { connect } from 'react-redux'
import { getAllVacationsfailure, getAllVacationsSuccess, getAllVacationsRequest, getAllFollowedVacationsSuccess, getAllFollowedVacationsRequest, getAllFollowedVacationsfailure } from "../redux/Actions"
import AdminDashboard from './AdminDashboard'
import VacationCard from './VacationCard'


function Vacations(props) {
    const userLoggedIn = sessionStorage.getItem('token')


    const token = sessionStorage.getItem('token')
    const uId = JSON.parse(sessionStorage.getItem('uId'));


    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)
    const id = uId

    const getFollowedVacations = () => {
        props.dispatch(getAllFollowedVacationsRequest())
        fetch('http://localhost:3001/api/followers/' + id, {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => {
                console.log(res)
                props.dispatch(getAllFollowedVacationsSuccess(res, false))
            })
            .catch(err => {
                props.dispatch(getAllFollowedVacationsfailure(err.message))
            })
    }



    const fetchVacations = () => {
        props.dispatch(getAllVacationsRequest())
        fetch('http://localhost:3001/api/vacations', {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => {
                const vacations = res
                console.log(vacations)
                props.dispatch(getAllVacationsSuccess(vacations, false))
            })
            .catch(error => {
                props.dispatch(getAllVacationsfailure(error.message))
            })
    }

    useEffect(() => {
        if (userLoggedIn) {
            getFollowedVacations()
            fetchVacations()
        }
        else {
            props.history.push('/login')
        }
    }, [])

    return (
        <div className="vacations-div">
            <NavBar />
            <section>{+sessionStorage.getItem('isAdmin') ? < AdminDashboard /> : <VacationCard />}</section>
        </div>
    )

}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Vacations)
