import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_START,
    LOGIN_STOP,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_START,
    REGISTER_STOP,
    LOGOUT,
    USER_FETCHING,
    USER_FETCHED,
    CLEAR_ERROR,
    CLEAR_SUCCESS,
    LEADERBOARD_FETCHED
} from './types'

export function loginStart() {
    return {
        type: LOGIN_START
    }
}

export function loginStop() {
    return {
        type: LOGIN_STOP
    }
}

export function registerStart() {
    return {
        type: REGISTER_START
    }
}

export function registerStop() {
    return {
        type: REGISTER_STOP
    }
}

export function loginSuccess(user, token, message) {
    return {
        type: LOGIN_SUCCESS,
        token,
        user,
        message
    }
}

export function loginFail(error) {
    return {
        type: LOGIN_FAIL,
        error
    }
}

export function registerSuccess(message) {
    return {
        type: REGISTER_SUCCESS,
        message
    }
}

export function registerFail(error) {
    return {
        type: REGISTER_FAIL,
        error
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function userFetching() {
    return {
        type: USER_FETCHING
    }
}

export function userFetched(user) {
    return {
        type: USER_FETCHED,
        user
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR,
    }
}

export function clearSuccess() {
    return {
        type: CLEAR_SUCCESS,
    }
}

export function leaderBoardFetched(results) {
    return {
        type: LEADERBOARD_FETCHED,
        results
    }
}