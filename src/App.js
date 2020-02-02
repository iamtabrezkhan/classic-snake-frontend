import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Game from './components/Game/Game';
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navbar from './components/Navbar/Navbar'
import {mainLoadingStart, mainLoadingStop} from './actions/main'
import {userFetched, logout} from './actions/user'
import {getMe} from './http/user';

class App extends React.Component {

  render() {
    return (
      <div className="main">
        {
          this.props.mainLoading ? <div className="loadingOverlay">Loading...</div> : null
        }
        <Router>
          <div className="navbar">
            <Navbar />
          </div>
          <div className="content">
            <Route exact path="/" component={Game} />
            <Route exact path="/leaderboard" component={LeaderBoard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
        </Router>
      </div>
    );
  }

  async componentDidMount() {
    const {success, user} = await getMe();
    if(success) {
      this.props.dispatch(userFetched(user));
    } else {
      this.props.dispatch(logout());
    }
    this.props.dispatch(mainLoadingStop())
  }

}

const mapStateToProps = state => {
  return {
    mainLoading: state.main.loading,
    isLoggedIn: state.user.isLoggedIn
  }
}

export default connect(mapStateToProps)(App);
