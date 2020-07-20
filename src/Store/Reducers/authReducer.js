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
        case 'SIGNUP_SUCCESS':
            console.log("Signup Success")
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_FAILED':
            console.log("Signup Failed", action.err.message)
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer;