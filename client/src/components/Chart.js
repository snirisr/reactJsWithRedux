import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { getAllFollowedVacationsfailure, getAllFollowedVacationsSuccess, getAllFollowedVacationsRequest } from "../redux/Actions"
import NavBar from './NavBar';





function Chart(props) {

    const token = sessionStorage.getItem('token')

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)

    const fetchFollowedVacations = () => {
        props.dispatch(getAllFollowedVacationsRequest())
        fetch('http://localhost:3001/api/all-followed', {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => {
                props.dispatch(getAllFollowedVacationsSuccess(res, false))
            })
            .catch(error => {
                props.dispatch(getAllFollowedVacationsfailure(error.message))
            })
    }



    const allFollowedDestination = props.followedVacations.map(v => v.destination)
    const numOfFollowers = props.followedVacations.map(v => v.amount)
    const state = {
        labels: allFollowedDestination,
        datasets: [
            {
                label: 'Number Of Followers',
                backgroundColor:'rgba(54, 162, 235, 0.6)',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,1)',
                hoverBorderWidth:3,
                hoverBorderColor:'#000',
                data: numOfFollowers
            }
        ]
    }


    useEffect(() => {
        fetchFollowedVacations()
    }, [])
    return (
        <div className="chart">
            <header>< NavBar/></header>
            <section className="reports">
                <Bar
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Followed Vacations Reports',
                            fontSize: 40,
                            fontColor: 'white',
                            fontFamily: 'Bebas Neue, cursive' ,
                            padding: 50
                        },
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                fontColor: 'white'
                            }
                        },
                        layout:{
                            padding:{
                                left: 50,
                                right:0,
                                bottom:0,
                                top:100
                            },
                        },

                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    fontColor: 'white',
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    fontColor: 'white'
                                }
                            }]
                        }
                    }}
                />
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        vacations: state.getAllVacations.vacations,
        followedVacations: state.getAllVacations.followedVacations
    }
}

export default connect(mapStateToProps)(Chart)
