import {
    CHANGE_DIRECTION,
    GAME_OVER,
    GAME_START,
    REMOVE_TAIL,
    ADD_HEAD,
    CHANGE_FOOD,
    INIT_GAME
} from './types'

export function startGame() {
    return {
        type: GAME_START
    }
}

export function gameOver(score) {
    return {
        type: GAME_OVER,
        score
    }
}

export function removeTail() {
    return {
        type: REMOVE_TAIL
    }
}

export function addHead(x, y) {
    return {
        type: ADD_HEAD,
        x,
        y
    }
}

export function changeDirection(direction) {
    return {
        type: CHANGE_DIRECTION,
        direction
    }
}

export function changeFood() {
    return {
        type: CHANGE_FOOD
    }
}

export function initGame() {
    return {
        type: INIT_GAME
    }
}