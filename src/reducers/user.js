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
    CLEAR_SUCCESS,
    CLEAR_ERROR,
    LEADERBOARD_FETCHED,
    GAME_OVER
} from '../actions/types'

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('token')) !== null,
    loading: false,
    error: null,
    message: null,
    user: null,
    results: []
}

export default function (state=initialState, action) {
    switch(action.type) {
        case LOGIN_START: {
            return {
                ...state,
                loading: true
            }
        }
        case LOGIN_STOP: {
            return {
                ...state,
                loading: false
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', JSON.stringify(action.token));
            return {
                ...state,
                loading: false,
                user: action.user,
                isLoggedIn: true,
                error: null,
                message: null
            }
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.error,
                message: null
            }
        }
        case REGISTER_START: {
            return {
                ...state,
                loading: true
            }
        }
        case REGISTER_STOP: {
            return {
                ...state,
                loading: false
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                loading: false,
                message: action.message,
                error: null
            }
        }
        case REGISTER_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.error,
                message: null
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                isLoggedIn: false
            }
        }
        case USER_FETCHED: {
            return {
                ...state,
                user: action.user
            }
        }
        case CLEAR_SUCCESS: {
            return {
                ...state,
                message: null
            }
        }
        case CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        case LEADERBOARD_FETCHED: {
            return {
                ...state,
                results: action.results
            }
        }
        case GAME_OVER: {
            return {
                ...state,
                user: state.isLoggedIn ? {
                    ...state.user,
                    score: Math.max(state.user.score, action.score)
                } : null
            }
        }
        default: {
            return state
        }
    }
}