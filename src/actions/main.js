import {
    MAIN_LOADING_START,
    MAIN_LOADING_STOP
} from './types'

export function mainLoadingStart() {
    return {
        type: MAIN_LOADING_START
    }
}

export function mainLoadingStop() {
    return {
        type: MAIN_LOADING_STOP
    }
}