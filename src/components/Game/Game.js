import React, { Component } from 'react'
import Classes from './Game.module.css'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {Prompt} from 'react-router-dom'
import {
  changeDirection,
  startGame,
  gameOver,
  removeTail,
  addHead,
  changeFood,
  initGame
} from '../../actions/game'
import Food from '../Food/Food'
import snakeHeadU from '../../assets/snake/snake-head-u.png'
import snakeHeadD from '../../assets/snake/snake-head-d.png'
import snakeHeadR from '../../assets/snake/snake-head-r.png'
import snakeHeadL from '../../assets/snake/snake-head-l.png'
import {updateScore} from '../../http/user'

export class Game extends Component {

    constructor(props) {
      super();
      this.gameLoop = this.gameLoop.bind(this);
      this.gameId = null;
      this.handleKeyStrokes = this.handleKeyStrokes.bind(this);
      this.getSnakeHead = this.getSnakeHead.bind(this);
      this.checkForBoundaryCollision = this.checkForBoundaryCollision.bind(this);
      this.checkForSelfCollision = this.checkForSelfCollision.bind(this);
      this.updateSnakeHead = this.updateSnakeHead.bind(this);
      this.startGame = this.startGame.bind(this);
      this.gameOverAudio = new Audio('/assets/gameover.mp3');
      this.eatAudio = new Audio('/assets/eat.mp3');
      this.now = null;
      this.elapsed = null;
      this.then = null;
      this.fpsInterval = null;
    }

    render() {
        return (
            <div className={Classes.playgroundContainer}
              style={{
                width: this.props.game.playground.width
              }}  
            >
                <Prompt 
                  when={this.props.game.isGameStart}
                  message="Game in progress! Are you sure you want to leave?"
                />
                <div className={Classes.topMenu}>
                    {
                      this.props.user ?
                      <div className={`${Classes.scoreContainer} font-lucky`}>
                        Score: {this.props.game.score} | Max: {this.props.user.score}
                      </div> :
                      <div className={`${Classes.scoreContainer} font-lucky`}>
                        Score: {this.props.game.score} | Max: {this.props.game.maxScore}
                      </div>
                    }
                    <div className={Classes.actions}>
                    <CSSTransition in={!this.props.game.isGameStart} timeout={150} classNames="start-node" unmountOnExit>
                        <button className="font-lucky" onClick={this.startGame}>Start Game</button>
                    </CSSTransition>
                    </div>
                </div>
                <div
                    style={{
                    width: this.props.game.playground.width,
                    height: this.props.game.playground.height
                    }}
                    className={Classes.playground}>
                    <CSSTransition in={this.props.game.isGameOver} timeout={200} classNames="my-node" unmountOnExit>
                        <div className={`${Classes.gameOverScreen} font-lucky`}>Game Over</div>
                    </CSSTransition>
                    {
                        this.props.game.isGameStart ?
                        <TransitionGroup>
                        <CSSTransition key={this.props.game.food.x*this.props.game.food.y} timeout={150} classNames="my-node" unmountOnExit>
                            <div
                            className={Classes.food}
                            style={{
                                width: this.props.game.unit,
                                height: this.props.game.unit,
                                left: this.props.game.food.x,
                                top: this.props.game.food.y,
                            }}
                            >
                            <Food />
                            </div>
                        </CSSTransition>
                        </TransitionGroup> : null
                    }
                    {
                        // active snake boxes
                        this.props.game.snake.map((s, i) => {
                        return (
                            <div
                            style={{
                                width: i === this.props.game.snake.length-1 ? this.props.game.unit : this.props.game.unit-2,
                                height: i === this.props.game.snake.length-1 ? this.props.game.unit : this.props.game.unit-2,
                                left: s.x,
                                top: s.y,
                                backgroundImage:
                                i === this.props.game.snake.length-1 ?
                                (
                                    this.props.game.direction === 'DOWN' ? `url(${snakeHeadD})` :
                                    this.props.game.direction === 'UP' ? `url(${snakeHeadU})` :
                                    this.props.game.direction === 'LEFT' ? `url(${snakeHeadL})` :
                                    `url(${snakeHeadR})`
                                ) : null,
                                backgroundColor: i === this.props.game.snake.length-1 ? '' : '#249b46',
                                border: i === this.props.game.snake.length-1 ? `none` : `1px solid #19642e`
                            }}
                            className={Classes.snakeBox}
                            key={i}
                            ></div>
                        )
                        })
                    }
                    {
                        // background tiles
                        [...Array((this.props.game.playground.width/this.props.game.unit)*(this.props.game.playground.height/this.props.game.unit))].map((v, i) => {
                        return <div
                            key={i}
                            className="unit"
                            style={{
                            width: this.props.game.unit,
                            height: this.props.game.unit,
                            backgroundColor: i%2 === 0 ? '#d5d5d5' : '#d1d1d1'
                            }}
                        ></div>
                        })
                    }
                </div>
                </div>
        )
    }

    componentDidMount() {
      document.addEventListener('keyup', this.handleKeyStrokes);
      this.props.dispatch(initGame())
    }
  
    componentDidUpdate() {
    }
  
    componentWillUnmount() {
      window.cancelAnimationFrame(this.gameId)
      document.removeEventListener('keyup', this.handleKeyStrokes);
    }
  
    startGame() {
      this.props.dispatch(startGame());
      this.then = Date.now();
      this.fpsInterval = 1000/8;
      this.gameId = window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp))
    }
  
    gameLoop(timeStamp) {
      this.gameId = window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp))
      this.now = Date.now();
      this.elapsed = this.now - this.then;
      if(this.elapsed > this.fpsInterval) {
        this.then = this.now - (this.elapsed % this.fpsInterval)
        if(!this.props.game.isGameOver && this.props.game.isGameStart) {
          let snakeX = this.getSnakeHead().x;
          let snakeY = this.getSnakeHead().y;
          if(snakeX === this.props.game.food.x && snakeY === this.props.game.food.y) {
            // if snake eats food
            this.eatAudio.play()
            this.props.dispatch(changeFood())
          } else {
            this.props.dispatch(removeTail());
          }
          let newHead = this.updateSnakeHead(snakeX, snakeY)
          this.checkForBoundaryCollision(newHead.x, newHead.y);
          this.checkForSelfCollision(newHead.x, newHead.y);
          this.props.dispatch(addHead(newHead.x, newHead.y));
        }
      }
    }
  
    handleKeyStrokes(e) {
      let KEY = e.keyCode || e.which;
      if(this.props.game.isGameStart) {
        // LEFT_KEY
        if(KEY === 37 && this.props.game.direction !== 'RIGHT') {
          this.props.dispatch(changeDirection('LEFT'))
        }
        // RIGHT_KEY
        if(KEY === 39 && this.props.game.direction !== 'LEFT') {
          this.props.dispatch(changeDirection('RIGHT'))
        }
        // UP_KEY
        if(KEY === 38 && this.props.game.direction !== 'DOWN') {
          this.props.dispatch(changeDirection('UP'))
        }
        // DOWN_KEY
        if(KEY === 40 && this.props.game.direction !== 'UP') {
          this.props.dispatch(changeDirection('DOWN'))
        }
      }
    }
  
    getSnakeHead() {
      return this.props.game.snake[this.props.game.snake.length-1];
    }
  
    checkForBoundaryCollision(snakeX, snakeY) {
      if(
        snakeX < 0 ||
        snakeX >= this.props.game.playground.width ||
        snakeY < 0 ||
        snakeY >= this.props.game.playground.height
      ) {
        this.props.dispatch(gameOver(this.props.game.score))
        this.gameOverAudio.play();
        updateScore(this.props.game.score);
      }
    }
  
    checkForSelfCollision(snakeX, snakeY) {
      for(let s of this.props.game.snake) {
        if(s.x === snakeX && s.y === snakeY) {
          this.props.dispatch(gameOver())
          this.gameOverAudio.play(this.props.game.score);
          updateScore(this.props.game.score);
          return false;
        }
      }
    }
  
    updateSnakeHead(snakeX, snakeY) {
      if(this.props.game.direction === 'LEFT') snakeX -= this.props.game.unit;
      if(this.props.game.direction === 'RIGHT') snakeX += this.props.game.unit;
      if(this.props.game.direction === 'UP') snakeY -= this.props.game.unit;
      if(this.props.game.direction === 'DOWN') snakeY += this.props.game.unit;
      return {
        x: snakeX,
        y: snakeY
      }
    }
}

const mapStateToProps = state => {
  return {
    game: state.game,
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Game)