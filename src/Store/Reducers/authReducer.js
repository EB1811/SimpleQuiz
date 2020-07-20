const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log("Login Success")
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_FAILED':
            console.log("Error ")
            return {
                ...state,
                authError: 'Login Failed'
            }
        case 'LOGOUT_SUCCESS':
            console.log("Logout Success")
            return state;
        default:
            return state;
    }
}

export default authReducer;