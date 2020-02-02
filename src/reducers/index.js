import {combineReducers} from 'redux'
import game from './game'
import main from './main'
import user from './user'

export default combineReducers({
    game,
    main,
    user
})