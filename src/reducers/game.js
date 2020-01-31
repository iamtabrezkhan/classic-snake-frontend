import {
    CHANGE_DIRECTION,
    GAME_START,
    GAME_OVER,
    REMOVE_TAIL,
    ADD_HEAD,
    CHANGE_FOOD
} from '../actions/types'
import {getRandomBetween} from '../utils/helper'

const someDefaults = {
    unit: 20,
    boxPerUnit: 25
}

const initialState = {
    unit: someDefaults.unit,
    snake: [
        {
            x: 5*someDefaults.unit,
            y: 0*someDefaults.unit
        },
        {
            x: 5*someDefaults.unit,
            y: 1*someDefaults.unit
        },
        {
            x: 5*someDefaults.unit,
            y: 2*someDefaults.unit
        }
    ],
    playground: {
        width: someDefaults.unit*someDefaults.boxPerUnit,
        height: someDefaults.unit*someDefaults.boxPerUnit
    },
    isGameOver: false,
    isGameStart: false,
    direction: 'DOWN',
    food: {
        x: Math.floor(Math.random()*someDefaults.boxPerUnit)*someDefaults.unit,
        y: Math.floor(Math.random()*someDefaults.boxPerUnit)*someDefaults.unit
    },
    score: 0,
    foodIndex: getRandomBetween(1, 4),
    maxScore: JSON.parse(localStorage.getItem('maxScore')) || 0
}

export function game(state=initialState, action) {
    switch(action.type) {
        case CHANGE_DIRECTION: {
            return {
                ...state,
                direction: action.direction
            }
        }
        case GAME_START: {
            return {
                ...state,
                ...initialState,
                isGameStart: true,
                food: {
                    x: Math.floor(Math.random()*someDefaults.boxPerUnit)*someDefaults.unit,
                    y: Math.floor(Math.random()*someDefaults.boxPerUnit)*someDefaults.unit
                },
                foodIndex: getRandomBetween(1, 4),
                maxScore: JSON.parse(localStorage.getItem('maxScore')) || 0
            }
        }
        case GAME_OVER: {
            return {
                ...state,
                isGameOver: true,
                isGameStart: false,
                maxScore: state.score > state.maxScore ? state.score : state.maxScore
            }
        }
        case REMOVE_TAIL: {
            return {
                ...state,
                snake: state.snake.slice(1)
            }
        }
        case ADD_HEAD: {
            let newHead = {
                x: action.x,
                y: action.y
            }
            return {
                ...state,
                snake: [...state.snake, newHead]
            }
        }
        case CHANGE_FOOD: {
            let food = {
                x: Math.floor(Math.random()*someDefaults.boxPerUnit)*someDefaults.unit,
                y: Math.floor(Math.random()*someDefaults.boxPerUnit)*someDefaults.unit
            }
            if((state.score+5) > state.maxScore) localStorage.setItem('maxScore', JSON.stringify(state.score+5))
            return {
                ...state,
                food: food,
                score: state.score + 5,
                foodIndex: getRandomBetween(1, 4)
            }
        }
        default: {
            return state
        }
    }
}