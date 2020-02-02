import React, { Component } from 'react'
import Classes from './LeaderBoard.module.css'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { getLeaderBoard } from '../../http/user'
import { leaderBoardFetched } from '../../actions/user'

export class LeaderBoard extends Component {

    constructor(props) {
        super();
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div className={Classes.main}>
                {
                    !this.props.isLoggedIn ? <Redirect to="/login" /> : null
                }
                <div className={Classes.wrapper}>
                    <h3>LeaderBoard</h3>
                    {
                        this.state.loading ?
                        <>
                        <div className={Classes.loading}></div>
                        <div className={Classes.loading}></div>
                        <div className={Classes.loading}></div>
                        </>
                        : null
                    }
                    <div className={Classes.body}>
                        {
                            this.props.results.length < 1 && !this.state.loading ?
                            <div className={Classes.noResults}>
                                Looks like there are no leaders! Play the game to be one.
                            </div> :
                            null
                        }
                        {
                            this.props.results.map((user, index) => {
                                return <div key={user.username} className={Classes.resultContainer}>
                                            <div className={Classes.username}>{user.username}</div>
                                            <div className={Classes.score}>{user.score}</div>
                                        </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    async componentDidMount() {
        const {success, results} = await getLeaderBoard();
        if(success) {
            this.props.dispatch(leaderBoardFetched(results));
        } else {
            this.props.dispatch(leaderBoardFetched([]));
        }
        this.setState(prevState => ({
            loading: false
        }))
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        results: state.user.results
    }
}

export default connect(mapStateToProps)(LeaderBoard)