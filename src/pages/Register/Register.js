import React, { Component } from 'react'
import Classes from './Register.module.css'
import Input from '../../components/Input/Input'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    registerFail,
    registerSuccess,
    clearError,
    clearSuccess
} from '../../actions/user'
import {register} from '../../http/user'
import { mainLoadingStart, mainLoadingStop } from '../../actions/main'

export class Register extends Component {

    constructor(props) {
        super()
        this.state = {
            email: '',
            password: '',
            username: ''
        }
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
        this.register = this.register.bind(this)
    }
    render() {
        return (
            <div className={Classes.main}>
                {
                    this.props.isLoggedIn ? <Redirect to="/" /> : null
                }
                <div className={Classes.form}>
                    {
                        this.props.error ? <div className={Classes.error}>{this.props.error}</div> : null
                    }
                    {
                        this.props.message ? <div className={Classes.message}>{this.props.message}</div> : null
                    }
                    <h3>Register to keep track of your score</h3>
                    <div className={Classes.input}><Input onChange={(v) => this.handleUsername(v)} type="text" placeholder="Username"/></div>
                    <div className={Classes.input}><Input onChange={(v) => this.handleEmail(v)} type="email" placeholder="Email Address"/></div>
                    <div className={Classes.input}><Input onChange={(v) => this.handlePassword(v)} type="password"  placeholder="Password"/></div>
                    <button onClick={this.register} className={`${Classes.loginBtn} font-lucky`}>Register</button>
                    <div className={Classes.footer}>Already a member? <Link to="login">Login</Link></div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.dispatch(clearError())
        this.props.dispatch(clearSuccess())
    }

    handleEmail(v) {
        this.setState(prevState => ({
            email: v
        }))
    }

    handlePassword(v) {
        this.setState(prevState => ({
            password: v
        }))
    }

    handleUsername(v) {
        this.setState(prevState => ({
            username: v
        }))
    }

    async register() {
        this.props.dispatch(clearError())
        this.props.dispatch(clearSuccess())
        if(!this.state.username) {
            this.props.dispatch(registerFail('Username cannot be empty'))
            return
        }
        if(!this.state.email) {
            this.props.dispatch(registerFail('Email address cannot be empty'))
            return
        }
        if(!this.state.password) {
            this.props.dispatch(registerFail('Password cannot be empty'))
            return
        }
        this.props.dispatch(mainLoadingStart())
        const { success, error, message } = await register(this.state.email.trim().toLocaleLowerCase(), this.state.password.trim().toLocaleLowerCase(), this.state.username.trim().toLocaleLowerCase())
        if(success) {
            this.props.dispatch(registerSuccess(message));
        } else {
            this.props.dispatch(registerFail(error))
        }
        this.props.dispatch(mainLoadingStop())
    }
}

const mapStateToProps = state => {
    return {
        error: state.user.error,
        message: state.user.message,
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps)(Register)