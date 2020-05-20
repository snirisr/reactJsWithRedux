const REGISTER = (f_name, l_name, u_name, password) => {
    return { // form | action
        type: "REGISTER",
        payload: {
            f_name,
            l_name,
            u_name,
            password
        }
    }
}
const login = (u_name, password) => {
    return { // form | action
        type: "LOGIN",
        payload: {
            u_name,
            password
        }
    }
}
// const GET_ALL_VATACTIONS = (destination, description, img_url, from_date, until_date , price) =>{
//     return { // form | action
//         type: "GET_ALL_VATACTIONS",
//         payload: {
//             destination,
//             description,
//             img_url,
//             from_date, 
//             until_date,
//             price
//         }
//     }
// }

const getAllVacationsRequest = (loading) => {
    return {
        type: "GET_ALL_VACATIONS_REQUEST",
        payload: {
            loading
        }
    }
}

const getAllVacationsSuccess = (vacations, loading, error) => {
    return { // form | action
        type: "GET_ALL_VACATIONS_SUCCESS",
        payload: {
            vacations,
            loading
        }
    }
}

const getAllVacationsfailure = error => {
    return {
        type: "GET_ALL_VACATIONS_failure",
        payload: error
    }
}


const getAllFollowedVacationsRequest = (loading) => {
    return {
        type: "GET_ALL_FOLLOWED_VACATIONS_REQUEST",
        payload: {
            loading
        }
    }
}

const getAllFollowedVacationsSuccess = (followedVacations, loading) => {
    return { // form | action
        type: "GET_ALL_FOLLOWED_VACATIONS_SUCCESS",
        payload: {
            followedVacations,
            loading
        }
    }
}

const getAllFollowedVacationsfailure = error => {
    return {
        type: "GET_ALL_FOLLOWED_VACATIONS_failure",
        payload: error
    }
}
// const fetchVacations = () => {
//     return function(dispatch) {
//         dispatch(getAllVacationsRequest())
//         const token = sessionStorage.getItem('token')
//         const myHeaders = new Headers();
//         myHeaders.append('Content-Type','application/json');
//         myHeaders.append('Authorization',token)
//         fetch('http://localhost:3001/api/vacations',{
//             method: 'GET',
//             headers: myHeaders})
//             .then(data => data.json())
//             .then(res=> {
//                 const vacations = res
//                 dispatch(getAllVacationsSuccess(vacations))
//             })
//             .catch (error =>{
//                 dispatch(getAllVacationsfailure(error.message))
//             })
//     }
// }

const DELETE_VACATION = (id) => {
    return {
        type: "CREATE_DELETE_CLAIM",
        payload: {
            id
        }
    }
}



const EDIT_VACATION = (destination, description, img_url, from_date, until_date, price) => {
    return {
        type: "EDIT_VACATION",
        payload: {
            destination,
            description,
            img_url,
            from_date,
            until_date,
            price
        }
    }
}

const FOLLOW = (u_id, v_id) => {
    return {
        type: "FOLLOW",
        payload: {
            u_id,
            v_id
        }
    }
}

const UNFOLLOW = (id) => {
    return {
        type: "UNFOLLOW",
        payload: {
            id
        }
    }
}





export {
    REGISTER,
    login,
    DELETE_VACATION,
    EDIT_VACATION,
    FOLLOW,
    UNFOLLOW,
    getAllVacationsSuccess,
    getAllVacationsfailure,
    getAllVacationsRequest,
    getAllFollowedVacationsRequest,
    getAllFollowedVacationsSuccess,
    getAllFollowedVacationsfailure
}