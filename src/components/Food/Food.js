import React, { Component } from 'react'
import Classes from './Food.module.css'
import {connect} from 'react-redux'

export class Food extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className={Classes.main}>
                <img src={`/assets/food/food-${this.props.foodIndex}.png`} alt="F"/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        foodIndex: state.game.foodIndex
    }
}

export default connect(mapStateToProps)(Food)