import React, { Component } from 'react'
import Classes from './Food.module.css'
import {connect} from 'react-redux'
import Food1 from '../../assets/food/food-1.png'
import Food2 from '../../assets/food/food-2.png'
import Food3 from '../../assets/food/food-3.png'
import Food4 from '../../assets/food/food-4.png'

export class Food extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className={Classes.main}>
                <img src={
                    this.props.foodIndex === 1 ? Food1 :
                    this.props.foodIndex === 2 ? Food2 :
                    this.props.foodIndex === 3 ? Food3 :
                    this.props.foodIndex === 4 ? Food4 :
                    null
                } alt="F"/>
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