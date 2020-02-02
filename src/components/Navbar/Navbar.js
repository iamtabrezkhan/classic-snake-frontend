import React, { Component } from 'react'
import Classes from './Navbar.module.css'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.png'
import {connect} from 'react-redux'
import { logout } from '../../actions/user'

export class Navbar extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className={Classes.main}>
                <div className={Classes.logo}>
                    <Link to="/"><img src={logo} alt="LOGO"/></Link>
                </div>
                <div className={Classes.menu}>
                    <ul>
                        {
                            this.props.isLoggedIn ?
                            <>
                            <li><Link to="leaderboard">Leaderboard</Link></li>
                            <li><button onClick={() => this.props.dispatch(logout())}>Logout</button></li>
                            </>
                            : null
                        }
                        {
                            !this.props.isLoggedIn ? (
                                <>
                                <li><Link to="login">Login</Link></li>
                                <li><Link to="register">Register</Link></li>
                                </>
                            ) : null
                        }
                    </ul>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps)(Navbar)