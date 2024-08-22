import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import {RulesContainer, ImgThumb, Score} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class GameRPS extends Component {
  state = {
    renderResultView: false,
    score: 0,
    status: '',
  }

  onClickButton = event => {
    const userOption = event.target.id
    const randomIndex = Math.floor(Math.random() * 3)
    const opponentOption = choicesList[randomIndex].id
    this.evaluateResults(userOption, opponentOption)
  }

  renderGameView = () => {
    const {renderResultView} = this.state
    return (
      <div>
        <ul>
          {choicesList.map(choice => {
            const {id, imageUrl} = choice
            const dataTestId = `${choice.id.toLowerCase()}Button`
            console.log(dataTestId)
            return (
              <li key={id}>
                <button
                  aria-label="option"
                  type="button"
                  data-testid={dataTestId}
                  onClick={this.onClickButton}
                >
                  <ImgThumb id={id} src={imageUrl} alt={id} />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  evaluateResults = (userOption, opponentOption) => {
    this.setState({
      userButton: userOption,
      opponentButton: opponentOption,
      renderResultView: true,
    })
    if (userOption === 'ROCK') {
      if (opponentOption === 'ROCK') {
        this.setState({
          status: 'IT IS DRAW',
        })
      }
      if (opponentOption === 'PAPER') {
        this.setState(prevState => ({
          score: prevState.score - 1,
          status: 'YOU LOSE',
        }))
      }
      if (opponentOption === 'SCISSORS') {
        this.setState(prevState => ({
          score: prevState.score + 1,
          status: 'YOU WON',
        }))
      }
    }
    if (userOption === 'PAPER') {
      if (opponentOption === 'PAPER') {
        this.setState({
          status: 'IT IS DRAW',
        })
      }
      if (opponentOption === 'SCISSORS') {
        this.setState(prevState => ({
          score: prevState.score - 1,
          status: 'YOU LOSE',
        }))
      }
      if (opponentOption === 'ROCK') {
        this.setState(prevState => ({
          score: prevState.score + 1,
          status: 'YOU WON',
        }))
      }
    }
    if (userOption === 'SCISSORS') {
      if (opponentOption === 'SCISSORS') {
        console.log('draw')
        this.setState({
          status: 'IT IS DRAW',
        })
      }
      if (opponentOption === 'ROCK') {
        console.log('lose')
        this.setState(prevState => ({
          score: prevState.score - 1,
          status: 'YOU LOSE',
        }))
      }
      if (opponentOption === 'PAPER') {
        console.log('win')
        this.setState(prevState => ({
          score: prevState.score + 1,
          status: 'YOU WON',
        }))
      }
    }
  }

  renderResults = () => {
    const {userButton, opponentButton, status} = this.state
    const [userSelection] = choicesList.filter(
      choice => choice.id === userButton,
    )
    const [opponentSelection] = choicesList.filter(
      choice => choice.id === opponentButton,
    )
    return (
      <div>
        <div>
          <h1>{userButton}</h1>
          <ImgThumb src={userSelection.imageUrl} alt="your choice" />
        </div>
        <div>
          <h1>{opponentButton}</h1>
          <ImgThumb src={opponentSelection.imageUrl} alt="opponent choice" />
        </div>

        <p>{status}</p>
        <button onClick={this.onPlayAgain} type="submit">
          PLAY AGAIN
        </button>
      </div>
    )
  }

  onPlayAgain = event => {
    event.preventDefault()
    this.setState({renderResultView: false})
  }

  render() {
    const {score, renderResultView} = this.state
    return (
      <div>
        <div>
          <h1>Rock Paper Scissors</h1>
          <div>
            <p>Score</p>
            <Score>{score}</Score>
          </div>
        </div>
        {renderResultView ? this.renderResults() : this.renderGameView()}
        <div className="popup-container">
          <div className="popup-container">
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button">
                  Rules
                </button>
              }
            >
              {close => (
                <>
                  <RulesContainer>
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      <RiCloseLine />
                    </button>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                      alt="rules"
                    />
                  </RulesContainer>
                </>
              )}
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

export default GameRPS
