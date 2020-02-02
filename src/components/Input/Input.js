import React, { Component } from 'react'
import Classes from './Input.module.css'

export class Input extends Component {
    render() {
        return (
            <input onChange={(e) => this.props.onChange(e.target.value)} type={this.props.type} placeholder={this.props.placeholder} />
        )
    }
}

export default Input