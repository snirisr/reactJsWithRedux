
const initialState = {
    loading: false,
    vacations: [],
    followedVacations: [],
    error: ''
}

export const auth = (loggedUser = {}, form) => {
    switch (form.type) {
        case "LOGIN":
            return {
                ...loggedUser,
                loggedUser: form.payload.u_name,
            }

        default:
            return loggedUser
    }
}

export const getAllVacations = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_VACATIONS_REQUEST":
            return {
                ...state,
                loadding: true
            }

        case "GET_ALL_VACATIONS_SUCCESS":
            return {
                ...state,
                loadding: false,
                vacations: [...action.payload.vacations]
            }

        case "GET_ALL_VACATIONS_failure":
            return {
                ...state,
                loadding: false,
                error: action.payload.error
            }

        case "GET_ALL_FOLLOWED_VACATIONS_REQUEST":
            return {
                ...state,
                loadding: true
            }

        case "GET_ALL_FOLLOWED_VACATIONS_SUCCESS":
            return {
                ...state,
                loadding: false,
                followedVacations: [...action.payload.followedVacations]
            }

        case "GET_ALL_FOLLOWED_VACATIONS_failure":
            return {
                ...state,
                loadding: false,
                error: action.payload.error
            }

        default:
            return state
    }




}


// export const claims =(claimsHistory =[], form) =>{
//     switch (form.type) {
//         case "CREATE_CLAIM":
//             return [...claimsHistory, form.payload]
//         case "CREATE_DELETE_CLAIM":
//                 return claimsHistory.filter(p => p.name !== form.payload.name)
//         default:
//            return claimsHistory;
//     }
// }
// export const policies =(policiesFolder=[], form) =>{
//     switch (form.type) {
//         case "CREATE_POLICY":
//             return [...policiesFolder, form.payload.name]
//         case "CREATE_DELETE_POLICY":
//             return policiesFolder.filter(p => p !== form.payload.name)
//         default:
//             return policiesFolder;
//     }
// }

