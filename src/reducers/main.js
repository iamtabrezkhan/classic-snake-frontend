import {
    MAIN_LOADING_START,
    MAIN_LOADING_STOP
} from '../actions/types'

const initialState = {
    loading: true
}

export default function (state=initialState, action) {
    switch(action.type) {
        case MAIN_LOADING_START: {
            return {
                ...state,
                loading: true
            }
        }
        case MAIN_LOADING_STOP: {
            return {
                ...state,
                loading: false
            }
        }
        default: {
            return state
        }
    }
}