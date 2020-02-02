import React, { Component } from 'react'
import Classes from './Login.module.css'
import Input from '../../components/Input/Input'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    loginFail,
    loginSuccess,
    clearError,
    clearSuccess
} from '../../actions/user'
import {login} from '../../http/user'
import { mainLoadingStart, mainLoadingStop } from '../../actions/main'

export class Login extends Component {

    constructor(props) {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.login = this.login.bind(this)
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
                    <h3>Login to keep track of your score</h3>
                    <div className={Classes.input}><Input onChange={(v) => this.handleEmail(v)} type="email"  placeholder="Email Address"/></div>
                    <div className={Classes.input}><Input onChange={(v) => this.handlePassword(v)} type="password"   placeholder="Password"/></div>
                    <button onClick={this.login} className={`${Classes.loginBtn} font-lucky`}>Login</button>
                    <div className={Classes.footer}>Not a member yet? <Link to="register">Register</Link></div>
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

    async login() {
        this.props.dispatch(clearError())
        this.props.dispatch(clearSuccess())
        if(!this.state.email) {
            this.props.dispatch(loginFail('Email address cannot be empty'))
            return
        }
        if(!this.state.password) {
            this.props.dispatch(loginFail('Password cannot be empty'))
            return
        }
        this.props.dispatch(mainLoadingStart())
        const { success, error, message, user, token} = await login(this.state.email.trim().toLocaleLowerCase(), this.state.password.trim().toLocaleLowerCase())
        if(success) {
            this.props.dispatch(loginSuccess(user, token, message));
        } else {
            this.props.dispatch(loginFail(error))
        }
        this.props.dispatch(mainLoadingStop())
    }

}

const mapStateToProps = state => {
    return {
        error: state.user.error,
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps)(Login)